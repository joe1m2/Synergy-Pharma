-- ============================================================
-- V7: Create partner_inquiries table
-- ============================================================

CREATE TABLE IF NOT EXISTS partner_inquiries (
    id            BIGSERIAL       PRIMARY KEY,
    company_name  VARCHAR(200)    NOT NULL,
    contact_name  VARCHAR(100)    NOT NULL,
    email         VARCHAR(100)    NOT NULL,
    phone         VARCHAR(30),
    country       VARCHAR(100),
    partner_type  VARCHAR(30)     NOT NULL,
    message       TEXT,
    status        VARCHAR(20)     NOT NULL DEFAULT 'NEW',
    submitted_at  TIMESTAMP       NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_partner_type
        CHECK (partner_type IN ('MANUFACTURER','HEALTHCARE_INSTITUTION','DISTRIBUTOR','OTHER')),
    CONSTRAINT chk_partner_status
        CHECK (status IN ('NEW','IN_REVIEW','APPROVED','REJECTED'))
);

CREATE INDEX IF NOT EXISTS idx_partner_inquiries_status       ON partner_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_partner_type ON partner_inquiries (partner_type);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_submitted_at ON partner_inquiries (submitted_at DESC);
