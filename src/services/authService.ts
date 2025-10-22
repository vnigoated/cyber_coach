import { supabase, testSupabaseConnection } from '../lib/supabase';
import bcrypt from 'bcryptjs';

class AuthService {
  async login(credentials: { email: string; password: string; role: string }) {
    try {
      // Proactively test connectivity for clearer errors (helps diagnose CORS/env issues)
      await testSupabaseConnection();

      // Check if user exists with the specified role
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .eq('role', credentials.role)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Login error:', error);
        throw new Error(`Database error during login: ${error.message}`);
      }

      if (!user) {
        throw new Error(`No ${credentials.role} account found with email: ${credentials.email}`);
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash);
      
      if (!isValidPassword) {
        throw new Error('Incorrect password. Please try again.');
      }

    // Remove password from user object without creating unused locals
    const userObj = user as Record<string, unknown>;
    const userCopy: Record<string, unknown> = { ...userObj };
    delete userCopy['password_hash'];

    // Store user in localStorage
    localStorage.setItem('cyberSecUser', JSON.stringify(userCopy));
      
    return userCopy as unknown;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData: { email: string; password: string; name?: string; role: string; bio?: string; specialization?: string }) {
    try {
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', userData.email)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing user:', checkError);
        throw new Error(`Failed to check existing user: ${checkError.message}`);
      }

      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Hash password
  const passwordHash = await bcrypt.hash(userData.password, 10);

      // Generate a UUID for the new user
  type MinimalCrypto = { randomUUID?: () => string } | undefined;
  const globalCrypto = (typeof crypto !== 'undefined') ? (crypto as unknown as MinimalCrypto) : undefined;
  const userId = globalCrypto && typeof globalCrypto.randomUUID === 'function' ? globalCrypto.randomUUID() : 'uid-' + Date.now();

      // Create new user
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            password_hash: passwordHash,
            level: 'beginner',
            completed_assessment: userData.role === 'admin',
            bio: userData.bio || '',
            specialization: userData.specialization || '',
            experience_years: userData.role === 'student' ? null : '0-1'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Registration error:', error);
        throw new Error(`Failed to create user: ${error.message}`);
      }

    // Remove password from user object without creating unused locals
    const newUserObj = newUser as Record<string, unknown>;
    const newUserCopy: Record<string, unknown> = { ...newUserObj };
    delete newUserCopy['password_hash'];

    // Store user in localStorage
    localStorage.setItem('cyberSecUser', JSON.stringify(newUserCopy));
      
    return newUserCopy as unknown;
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