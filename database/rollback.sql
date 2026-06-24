-- ============================================================
-- Synergy Pharma – Manual Rollback Script
-- Use ONLY if you need to wipe the schema and start fresh.
-- THIS WILL DELETE ALL DATA – use with extreme caution!
--
-- Usage:
--   psql -U postgres -d synergypharma -f database/rollback.sql
-- ============================================================

-- Drop all application tables in dependency order (children first)
DROP TABLE IF EXISTS rfq_items         CASCADE;
DROP TABLE IF EXISTS rfqs              CASCADE;
DROP TABLE IF EXISTS contact_messages  CASCADE;
DROP TABLE IF EXISTS partner_inquiries CASCADE;
DROP TABLE IF EXISTS news              CASCADE;
DROP TABLE IF EXISTS products          CASCADE;
DROP TABLE IF EXISTS manufacturers     CASCADE;
DROP TABLE IF EXISTS categories        CASCADE;
DROP TABLE IF EXISTS users             CASCADE;

-- Remove Flyway tracking table so migrations run again cleanly
DROP TABLE IF EXISTS flyway_schema_history CASCADE;

-- Confirmation
SELECT 'All Synergy Pharma tables dropped. You may now re-run the application to re-apply migrations.' AS status;
