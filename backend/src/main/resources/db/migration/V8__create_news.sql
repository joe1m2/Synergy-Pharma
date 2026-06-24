-- ============================================================
-- V8: Create news table
-- ============================================================

CREATE TABLE IF NOT EXISTS news (
    id             BIGSERIAL       PRIMARY KEY,
    title          VARCHAR(300)    NOT NULL,
    slug           VARCHAR(350)    NOT NULL UNIQUE,
    summary        TEXT,
    content        TEXT,
    image_url      VARCHAR(300),
    category       VARCHAR(30)     NOT NULL DEFAULT 'COMPANY_NEWS',
    published      BOOLEAN         NOT NULL DEFAULT FALSE,
    published_date DATE,
    author         VARCHAR(200),
    created_at     TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP       NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_news_category
        CHECK (category IN ('COMPANY_NEWS','REGULATORY_UPDATE','PRODUCT_ARRIVAL','INDUSTRY_NEWS'))
);

CREATE INDEX IF NOT EXISTS idx_news_slug           ON news (slug);
CREATE INDEX IF NOT EXISTS idx_news_published      ON news (published);
CREATE INDEX IF NOT EXISTS idx_news_category       ON news (category);
CREATE INDEX IF NOT EXISTS idx_news_published_date ON news (published_date DESC);

-- Full‑text search on title + summary
CREATE INDEX IF NOT EXISTS idx_news_fts ON news
    USING GIN (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(summary,'')));
