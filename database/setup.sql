-- ============================================================
-- Synergy Pharma – PostgreSQL Database Bootstrap Script
-- Run this ONCE as a PostgreSQL superuser (e.g. postgres)
-- before starting the Spring Boot application.
--
-- Usage:
--   psql -U postgres -f database/setup.sql
-- ============================================================

-- 1. Create the application database
CREATE DATABASE synergypharma
    WITH
    OWNER       = postgres
    ENCODING    = 'UTF8'
    LC_COLLATE  = 'en_US.UTF-8'
    LC_CTYPE    = 'en_US.UTF-8'
    TEMPLATE    = template0
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE synergypharma IS 'Synergy Pharma B2B Corporate Portal – Phase 1';

-- 2. Create a dedicated application user (least-privilege principle)
--    Change the password before use!
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'synergy_app') THEN
        CREATE ROLE synergy_app WITH LOGIN PASSWORD 'ChangeMe_SecurePassword123!';
    END IF;
END
$$;

-- 3. Grant privileges
GRANT CONNECT ON DATABASE synergypharma TO synergy_app;

-- Connect to the new database to set up schema privileges
\connect synergypharma

GRANT USAGE  ON SCHEMA public TO synergy_app;
GRANT CREATE ON SCHEMA public TO synergy_app;
GRANT ALL PRIVILEGES ON ALL TABLES    IN SCHEMA public TO synergy_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO synergy_app;

-- Ensure future tables and sequences also get the right grants
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON TABLES    TO synergy_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON SEQUENCES TO synergy_app;

-- 4. Enable the pg_trgm extension for improved LIKE/ILIKE performance
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 5. Verify
SELECT current_database(), current_user, version();
