-- ============================================================
-- V1: Create users table
-- Synergy Pharma – Phase 1 Database Setup
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id          BIGSERIAL       PRIMARY KEY,
    email       VARCHAR(100)    NOT NULL UNIQUE,
    password    VARCHAR(255)    NOT NULL,
    full_name   VARCHAR(100)    NOT NULL,
    role        VARCHAR(30)     NOT NULL DEFAULT 'ADMIN',
    enabled     BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP       NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_users_role CHECK (role IN ('ADMIN', 'EDITOR', 'VIEWER'))
);

-- Index for login look‑ups
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
