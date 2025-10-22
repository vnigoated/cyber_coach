-- Run this in your Supabase SQL Editor to fix RLS policy issues
-- This allows your custom authentication system to work with Supabase

-- Fix courses table policies
DROP POLICY IF EXISTS "courses_insert_demo" ON courses;
DROP POLICY IF EXISTS "courses_update_demo" ON courses;
DROP POLICY IF EXISTS "courses_delete_demo" ON courses;

CREATE POLICY "courses_insert_permissive"
  ON courses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "courses_update_permissive"
  ON courses FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "courses_delete_permissive"
  ON courses FOR DELETE
  TO anon, authenticated
  USING (true);

-- Fix course_modules table
DROP POLICY IF EXISTS "course_modules_cud_demo" ON course_modules;

CREATE POLICY "course_modules_cud_permissive"
  ON course_modules FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Fix user_progress table
DROP POLICY IF EXISTS "user_progress_upsert_demo" ON user_progress;

CREATE POLICY "user_progress_upsert_permissive"
  ON user_progress FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Fix notes table
DROP POLICY IF EXISTS "notes_cud_demo" ON notes;

CREATE POLICY "notes_cud_permissive"
  ON notes FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Fix course_enrollments
DROP POLICY IF EXISTS "course_enrollments_insert_demo" ON course_enrollments;
DROP POLICY IF EXISTS "course_enrollments_update_demo" ON course_enrollments;
DROP POLICY IF EXISTS "course_enrollments_delete_demo" ON course_enrollments;

CREATE POLICY "course_enrollments_insert_permissive"
  ON course_enrollments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "course_enrollments_update_permissive"
  ON course_enrollments FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "course_enrollments_delete_permissive"
  ON course_enrollments FOR DELETE
  TO anon, authenticated
  USING (true);

-- Fix users table policies
DROP POLICY IF EXISTS "users_update_self_demo" ON users;
DROP POLICY IF EXISTS "users_delete_demo" ON users;

CREATE POLICY "users_update_permissive"
  ON users FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "users_delete_permissive"
  ON users FOR DELETE
  TO anon, authenticated
  USING (true);