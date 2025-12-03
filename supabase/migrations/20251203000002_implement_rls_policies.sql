-- Migration: Implement comprehensive RLS policies
-- Date: 2025-12-03
-- Description:
--   1. Fix profiles.user_id constraint to support UUID (36 chars)
--   2. Add RLS policies for all tables
--   3. Add performance indexes for RLS

-- ============================================================================
-- Step 1: Fix profiles.user_id constraint
-- ============================================================================

-- Drop the old constraint that limits user_id to 4-20 characters
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_id_check;

-- Add new constraint that supports UUID (36 characters)
ALTER TABLE profiles ADD CONSTRAINT profiles_user_id_check
  CHECK (char_length(user_id) >= 4 AND char_length(user_id) <= 100);

-- Update comment to reflect that user_id stores Supabase Auth UUID
COMMENT ON COLUMN profiles.user_id IS 'Supabase AuthのユーザーID (UUID)';

-- ============================================================================
-- Step 2: Add performance indexes for RLS
-- ============================================================================

-- Index for profiles.user_id (used in RLS policies)
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Index for projects.profile_id already exists (idx_projects_profile_id)

-- ============================================================================
-- Step 3: RLS Policies for profiles table
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view profiles" ON profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;

-- SELECT: Everyone can view all profiles (public portfolio)
CREATE POLICY "Anyone can view profiles"
  ON profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- INSERT: Users can only create their own profile
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()::text) = user_id);

-- UPDATE: Users can only update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()::text) = user_id)
  WITH CHECK ((SELECT auth.uid()::text) = user_id);

-- DELETE: Users can only delete their own profile
CREATE POLICY "Users can delete their own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()::text) = user_id);

-- ============================================================================
-- Step 4: RLS Policies for projects table
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view projects" ON projects;
DROP POLICY IF EXISTS "Users can create their own projects" ON projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON projects;

-- SELECT: Everyone can view all projects (public portfolio)
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- INSERT: Users can create projects for their own profile
CREATE POLICY "Users can create their own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  );

-- UPDATE: Users can only update their own projects
CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  );

-- DELETE: Users can only delete their own projects
CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  );

-- ============================================================================
-- Step 5: RLS Policies for tags table
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view tags" ON tags;
DROP POLICY IF EXISTS "Authenticated users can create tags" ON tags;
DROP POLICY IF EXISTS "Authenticated users can update tags" ON tags;
DROP POLICY IF EXISTS "Authenticated users can delete tags" ON tags;

-- SELECT: Everyone can view all tags
CREATE POLICY "Anyone can view tags"
  ON tags
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- INSERT: Authenticated users can create tags
-- (In the future, this could be restricted to admins only)
CREATE POLICY "Authenticated users can create tags"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- UPDATE: Authenticated users can update tags
-- (In the future, this could be restricted to admins only)
CREATE POLICY "Authenticated users can update tags"
  ON tags
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE: Authenticated users can delete tags
-- (In the future, this could be restricted to admins only)
CREATE POLICY "Authenticated users can delete tags"
  ON tags
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- Step 6: RLS Policies for roles table
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view roles" ON roles;

-- SELECT: Everyone can view all roles (master data)
CREATE POLICY "Anyone can view roles"
  ON roles
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- INSERT/UPDATE/DELETE: No policies for now (master data, managed by admins)
-- These operations should be done via migrations or service role

-- ============================================================================
-- Step 7: RLS Policies for project_tags table
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view project_tags" ON project_tags;
DROP POLICY IF EXISTS "Users can create tags for their own projects" ON project_tags;
DROP POLICY IF EXISTS "Users can update tags for their own projects" ON project_tags;
DROP POLICY IF EXISTS "Users can delete tags from their own projects" ON project_tags;

-- SELECT: Everyone can view all project tags
CREATE POLICY "Anyone can view project_tags"
  ON project_tags
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- INSERT: Users can create tags for their own projects
CREATE POLICY "Users can create tags for their own projects"
  ON project_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (
    project_id IN (
      SELECT p.id
      FROM projects p
      JOIN profiles pr ON p.profile_id = pr.id
      WHERE pr.user_id = (SELECT auth.uid()::text)
    )
  );

-- UPDATE: Users can update tags for their own projects
CREATE POLICY "Users can update tags for their own projects"
  ON project_tags
  FOR UPDATE
  TO authenticated
  USING (
    project_id IN (
      SELECT p.id
      FROM projects p
      JOIN profiles pr ON p.profile_id = pr.id
      WHERE pr.user_id = (SELECT auth.uid()::text)
    )
  )
  WITH CHECK (
    project_id IN (
      SELECT p.id
      FROM projects p
      JOIN profiles pr ON p.profile_id = pr.id
      WHERE pr.user_id = (SELECT auth.uid()::text)
    )
  );

-- DELETE: Users can delete tags from their own projects
CREATE POLICY "Users can delete tags from their own projects"
  ON project_tags
  FOR DELETE
  TO authenticated
  USING (
    project_id IN (
      SELECT p.id
      FROM projects p
      JOIN profiles pr ON p.profile_id = pr.id
      WHERE pr.user_id = (SELECT auth.uid()::text)
    )
  );

-- ============================================================================
-- Step 8: RLS Policies for auth_providers table
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own auth providers" ON auth_providers;
DROP POLICY IF EXISTS "Users can create their own auth providers" ON auth_providers;
DROP POLICY IF EXISTS "Users can update their own auth providers" ON auth_providers;
DROP POLICY IF EXISTS "Users can delete their own auth providers" ON auth_providers;

-- SELECT: Users can only view their own auth providers
CREATE POLICY "Users can view their own auth providers"
  ON auth_providers
  FOR SELECT
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  );

-- INSERT: Users can only create auth providers for themselves
CREATE POLICY "Users can create their own auth providers"
  ON auth_providers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  );

-- UPDATE: Users can only update their own auth providers
CREATE POLICY "Users can update their own auth providers"
  ON auth_providers
  FOR UPDATE
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  );

-- DELETE: Users can only delete their own auth providers
CREATE POLICY "Users can delete their own auth providers"
  ON auth_providers
  FOR DELETE
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()::text)
    )
  );

-- ============================================================================
-- Migration complete
-- ============================================================================
-- All tables now have comprehensive RLS policies
-- Performance optimizations applied (wrapped auth.uid() in subqueries, added indexes)
