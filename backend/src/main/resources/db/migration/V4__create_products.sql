-- ============================================================
-- V4: Create products table
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
    id              BIGSERIAL       PRIMARY KEY,
    name            VARCHAR(200)    NOT NULL,
    generic_name    VARCHAR(100),
    description     TEXT,
    sku             VARCHAR(100),
    strength        VARCHAR(100),
    dosage_form     VARCHAR(100),
    packaging_unit  VARCHAR(100),
    image_url       VARCHAR(300),
    brochure_url    VARCHAR(500),
    category_id     BIGINT          REFERENCES categories(id) ON DELETE SET NULL,
    manufacturer_id BIGINT          REFERENCES manufacturers(id) ON DELETE SET NULL,
    active          BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_products_name            ON products (name);
CREATE INDEX IF NOT EXISTS idx_products_sku             ON products (sku);
CREATE INDEX IF NOT EXISTS idx_products_category_id     ON products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_manufacturer_id ON products (manufacturer_id);
CREATE INDEX IF NOT EXISTS idx_products_active          ON products (active);

-- Full‑text search index (name + generic_name)
CREATE INDEX IF NOT EXISTS idx_products_fts ON products
    USING GIN (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(generic_name,'')));
