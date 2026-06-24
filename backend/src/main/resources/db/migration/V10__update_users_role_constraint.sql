-- ============================================================
-- V10: Update users role check constraint
-- Add STAFF and USER roles to the allowed roles
-- ============================================================

ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_users_role;
ALTER TABLE users ADD CONSTRAINT chk_users_role CHECK (role IN ('ADMIN', 'EDITOR', 'VIEWER', 'STAFF', 'USER'));
