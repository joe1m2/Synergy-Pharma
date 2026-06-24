-- ============================================================
-- V6: Create contact_messages table
-- ============================================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id            BIGSERIAL       PRIMARY KEY,
    sender_name   VARCHAR(200)    NOT NULL,
    email         VARCHAR(100)    NOT NULL,
    phone         VARCHAR(30),
    subject       VARCHAR(100)    NOT NULL,
    message       TEXT            NOT NULL,
    inquiry_type  VARCHAR(30)     NOT NULL DEFAULT 'GENERAL',
    read          BOOLEAN         NOT NULL DEFAULT FALSE,
    received_at   TIMESTAMP       NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_contact_inquiry_type
        CHECK (inquiry_type IN ('PRODUCT_INQUIRY','VENDOR_PARTNERSHIP','GENERAL'))
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_read        ON contact_messages (read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_received_at ON contact_messages (received_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_inquiry_type ON contact_messages (inquiry_type);
