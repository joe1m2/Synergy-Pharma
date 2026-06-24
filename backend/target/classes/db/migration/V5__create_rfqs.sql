-- ============================================================
-- V5: Create RFQs (Request for Quotation) tables
-- ============================================================

CREATE TABLE IF NOT EXISTS rfqs (
    id               BIGSERIAL       PRIMARY KEY,
    reference_number VARCHAR(50)     NOT NULL UNIQUE,
    contact_name     VARCHAR(200)    NOT NULL,
    email            VARCHAR(100)    NOT NULL,
    phone            VARCHAR(30),
    organization     VARCHAR(300)    NOT NULL,
    additional_notes TEXT,
    status           VARCHAR(20)     NOT NULL DEFAULT 'PENDING',
    submitted_at     TIMESTAMP       NOT NULL DEFAULT NOW(),
    processed_at     TIMESTAMP,

    CONSTRAINT chk_rfq_status CHECK (status IN ('PENDING','REVIEWED','QUOTED','CLOSED'))
);

CREATE TABLE IF NOT EXISTS rfq_items (
    id            BIGSERIAL       PRIMARY KEY,
    rfq_id        BIGINT          NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
    product_id    BIGINT          REFERENCES products(id) ON DELETE SET NULL,
    product_name  VARCHAR(200)    NOT NULL,
    quantity      INTEGER         NOT NULL CHECK (quantity > 0),
    unit          VARCHAR(100),
    specifications TEXT
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_rfqs_reference_number ON rfqs (reference_number);
CREATE INDEX IF NOT EXISTS idx_rfqs_email            ON rfqs (email);
CREATE INDEX IF NOT EXISTS idx_rfqs_status           ON rfqs (status);
CREATE INDEX IF NOT EXISTS idx_rfqs_submitted_at     ON rfqs (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_rfq_items_rfq_id      ON rfq_items (rfq_id);
