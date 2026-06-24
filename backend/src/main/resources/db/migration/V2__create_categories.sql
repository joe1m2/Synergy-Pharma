-- ============================================================
-- V2: Create categories table
-- ============================================================

CREATE TABLE IF NOT EXISTS categories (
    id          BIGSERIAL       PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL UNIQUE,
    description VARCHAR(500),
    icon_class  VARCHAR(100),
    active      BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_name   ON categories (name);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories (active);
