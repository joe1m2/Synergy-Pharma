-- ============================================================
-- V3: Create manufacturers table
-- ============================================================

CREATE TABLE IF NOT EXISTS manufacturers (
    id          BIGSERIAL       PRIMARY KEY,
    name        VARCHAR(200)    NOT NULL,
    country     VARCHAR(100),
    description VARCHAR(500),
    logo_url    VARCHAR(300),
    website     VARCHAR(200),
    active      BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_manufacturers_name   ON manufacturers (name);
CREATE INDEX IF NOT EXISTS idx_manufacturers_active ON manufacturers (active);
