import { supabase, testSupabaseConnection } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import type { User } from '../types';

type DBUser = {
  id: string;
  email: string;
  name?: string | null;
  role?: string;
  password_hash?: string | null;
  [key: string]: unknown;
};

function sanitizeUser(dbUser: DBUser): User {
  const copy: Record<string, unknown> = { ...dbUser };
  // remove password_hash if present
  if ('password_hash' in copy) {
    // remove password_hash property in a typed-safe way
     
    delete copy['password_hash'];
  }
  return copy as unknown as User;
}

class AuthService {
  async login(credentials: { email: string; password: string; role: string }): Promise<User | null> {
    try {
      // Proactively test connectivity for clearer errors (helps diagnose CORS/env issues)
      await testSupabaseConnection();
      // Primary auth: use Supabase Auth (creates client session so RLS works)
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (signInError) {
        // If supabase auth fails, fall back to legacy DB check (maintains compatibility)
        console.warn('Supabase auth failed, attempting legacy DB fallback:', signInError.message);

        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .eq('role', credentials.role)
          .maybeSingle();

        if (error) {
          console.error('Login error:', error);
          throw new Error(`Database error during login: ${error.message}`);
        }

        if (!user) throw new Error(`No ${credentials.role} account found with email: ${credentials.email}`);

  const isValidPassword = await bcrypt.compare(credentials.password, (user as DBUser).password_hash ?? '');
  if (!isValidPassword) throw new Error('Incorrect password. Please try again.');

  const userCopy = sanitizeUser(user as DBUser);
  localStorage.setItem('cyberSecUser', JSON.stringify(userCopy));
  return userCopy;
      }

      // Fetch profile row for signed-in user
      const sessionUser = signInData.user;
      if (!sessionUser) throw new Error('Signed in but no user returned from Supabase Auth');

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('email', sessionUser.email)
        .maybeSingle();

      if (profileError) {
        console.warn('Failed to fetch profile row after sign-in:', profileError.message);
      }

  const profileRow = profile ? (profile as DBUser) : undefined;
  let profileCopy: User;
  if (profileRow) {
    profileCopy = sanitizeUser(profileRow);
  } else {
    profileCopy = { id: sessionUser.id, email: sessionUser.email, name: sessionUser.user_metadata?.full_name } as User;
  }
  // store to localStorage without password_hash
  localStorage.setItem('cyberSecUser', JSON.stringify(profileCopy));
  return profileCopy;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData: { email: string; password: string; name?: string; role: string; bio?: string; specialization?: string }): Promise<User | null> {
    try {
      // Create account with Supabase Auth first (creates session client-side)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: { data: { full_name: userData.name } }
      });

      if (signUpError) {
        console.error('Supabase signUp error:', signUpError);
        throw signUpError;
      }

      const authUser = signUpData.user;
      // Insert profile row into users table if not exists
      const profileRow = {
        id: authUser?.id ?? undefined,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        level: 'beginner',
        completed_assessment: userData.role === 'admin',
        bio: userData.bio || '',
        specialization: userData.specialization || '',
        experience_years: userData.role === 'student' ? null : '0-1'
      } as Record<string, unknown>;

      const { data: newUser, error } = await supabase
        .from('users')
        .upsert([profileRow])
        .select()
        .maybeSingle();

      if (error) {
        console.error('Registration error while creating profile:', error);
        throw error;
      }

  const newUserCopy = { ...(newUser || profileRow) } as unknown as User;
  localStorage.setItem('cyberSecUser', JSON.stringify(newUserCopy));
  return newUserCopy;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout() {
    localStorage.removeItem('cyberSecUser');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('cyberSecUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isTeacher() {
    const user = this.getCurrentUser();
    return user?.role === 'teacher';
  }

  isStudent() {
    const user = this.getCurrentUser();
    return user?.role === 'student';
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}

export const authService = new AuthService();