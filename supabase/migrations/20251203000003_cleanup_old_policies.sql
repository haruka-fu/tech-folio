-- Migration: Clean up old/duplicate RLS policies
-- Date: 2025-12-03
-- Description:
--   Remove old policies that are causing duplicate policy warnings

-- ============================================================================
-- Remove old policies from auth_providers table
-- ============================================================================
DROP POLICY IF EXISTS "Users can insert their own auth providers" ON auth_providers;

-- ============================================================================
-- Remove old policies from profiles table
-- ============================================================================
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view profiles for display name check" ON profiles;

-- ============================================================================
-- Remove old policies from project_tags table
-- ============================================================================
DROP POLICY IF EXISTS "Users can delete their own project tags" ON project_tags;
DROP POLICY IF EXISTS "Users can insert their own project tags" ON project_tags;
DROP POLICY IF EXISTS "Users can view their own project tags" ON project_tags;

-- ============================================================================
-- Remove old policies from projects table
-- ============================================================================
DROP POLICY IF EXISTS "Users can insert their own projects" ON projects;
DROP POLICY IF EXISTS "Users can view their own projects" ON projects;

-- ============================================================================
-- Remove old policies from roles table
-- ============================================================================
DROP POLICY IF EXISTS "Roles are viewable by all authenticated users" ON roles;

-- ============================================================================
-- Remove old policies from tags table
-- ============================================================================
DROP POLICY IF EXISTS "Tags are viewable by all authenticated users" ON tags;

-- ============================================================================
-- Migration complete
-- ============================================================================
-- All duplicate/old policies have been removed
