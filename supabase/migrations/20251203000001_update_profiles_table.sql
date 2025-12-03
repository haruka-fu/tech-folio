-- Migration: Update profiles table
-- Date: 2025-12-03
-- Description:
--   1. Remove user_id_change_count column (no longer needed)
--   2. Add UNIQUE constraint to display_name column

-- Step 1: Drop user_id_change_count column
ALTER TABLE profiles DROP COLUMN IF EXISTS user_id_change_count;

-- Step 2: Add UNIQUE constraint to display_name
ALTER TABLE profiles ADD CONSTRAINT profiles_display_name_unique UNIQUE (display_name);

-- Note: This migration will fail if there are duplicate display_names in the database
-- Make sure to clean up duplicates before running this migration
