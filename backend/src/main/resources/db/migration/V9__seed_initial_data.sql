-- ============================================================
-- V9: Seed initial data
--
-- Admin password is BCrypt of "Admin@123" (cost=10).
-- Change it immediately after the first login via the admin panel.
--
-- Categories, manufacturers, and sample products are seeded
-- so the application has meaningful data to display from day one.
-- ============================================================

-- ── Admin user ────────────────────────────────────────────────
INSERT INTO users (email, password, full_name, role, enabled, created_at, updated_at)
VALUES (
    'admin@synergypharma.com',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE36mggkR/lWTeOCG',  -- Admin@123
    'Synergy Admin',
    'ADMIN',
    TRUE,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO NOTHING;

-- ── Product categories ────────────────────────────────────────
INSERT INTO categories (name, description, icon_class, active, created_at) VALUES
    ('Antibiotics',           'Antibacterial agents for treating bacterial infections',                     'fa-capsules',       TRUE, NOW()),
    ('Cardiovascular',        'Medicines for heart and circulatory system conditions',                      'fa-heart-pulse',    TRUE, NOW()),
    ('Analgesics',            'Pain relief and anti-inflammatory medications',                              'fa-pills',          TRUE, NOW()),
    ('Gastrointestinal',      'Medicines for digestive system disorders',                                   'fa-stomach',        TRUE, NOW()),
    ('Vitamins & Supplements','Nutritional supplements, vitamins, and minerals',                            'fa-leaf',           TRUE, NOW()),
    ('Oncology',              'Cancer treatment and supportive care medications',                           'fa-dna',            TRUE, NOW()),
    ('Respiratory',           'Medicines for respiratory and pulmonary conditions',                         'fa-lungs',          TRUE, NOW()),
    ('Dermatology',           'Topical and systemic medicines for skin conditions',                         'fa-hand-dots',      TRUE, NOW()),
    ('Neurology',             'Medicines for neurological and psychiatric conditions',                      'fa-brain',          TRUE, NOW()),
    ('Endocrinology',         'Hormonal and metabolic disorder medications including diabetes management',  'fa-syringe',        TRUE, NOW())
ON CONFLICT (name) DO NOTHING;

-- ── Manufacturers ─────────────────────────────────────────────
INSERT INTO manufacturers (name, country, description, logo_url, website, active, created_at) VALUES
    ('Pfizer Inc.',              'USA',     'Global pharmaceutical leader with over 170 years of experience in healthcare.', NULL, 'https://www.pfizer.com',        TRUE, NOW()),
    ('Novartis AG',              'Switzerland', 'Innovative medicine company committed to improving and extending human lives.', NULL, 'https://www.novartis.com',   TRUE, NOW()),
    ('Roche Holding AG',         'Switzerland', 'Pioneer in personalised healthcare and biotechnology solutions.',              NULL, 'https://www.roche.com',      TRUE, NOW()),
    ('Sanofi S.A.',              'France',  'Global biopharmaceutical company focused on human health.',                        NULL, 'https://www.sanofi.com',     TRUE, NOW()),
    ('AstraZeneca PLC',          'UK',      'Biopharmaceutical company that pushes scientific boundaries to deliver life-changing medicines.', NULL, 'https://www.astrazeneca.com', TRUE, NOW()),
    ('Johnson & Johnson',        'USA',     'Broadest healthcare company in the world with consumer, pharmaceutical and medical device businesses.', NULL, 'https://www.jnj.com', TRUE, NOW()),
    ('Abbott Laboratories',      'USA',     'Global healthcare leader that helps people live more fully at all stages of life.', NULL, 'https://www.abbott.com',   TRUE, NOW()),
    ('GlaxoSmithKline plc',      'UK',      'Science-led global healthcare company with a special purpose: to improve quality of human life.', NULL, 'https://www.gsk.com', TRUE, NOW()),
    ('Merck & Co.',              'USA',     'Leading healthcare company known as MSD outside the US and Canada.',               NULL, 'https://www.merck.com',      TRUE, NOW()),
    ('Eli Lilly and Company',    'USA',     'Global healthcare leader that unites caring with discovery to create medicines that make life better.', NULL, 'https://www.lilly.com', TRUE, NOW())
ON CONFLICT DO NOTHING;

-- ── Sample products ───────────────────────────────────────────
-- Uses subqueries to resolve category/manufacturer IDs dynamically.

INSERT INTO products (name, generic_name, description, sku, strength, dosage_form, packaging_unit, category_id, manufacturer_id, active, created_at, updated_at)
SELECT
    'Amoxicillin 500mg Capsules',
    'Amoxicillin',
    'Broad‑spectrum penicillin‑type antibiotic used to treat a wide variety of bacterial infections including pneumonia, bronchitis, and infections of the ear, nose, throat, skin, and urinary tract.',
    'SKU-AMOX-500',
    '500mg',
    'Capsule',
    'Blister pack of 21',
    c.id,
    m.id,
    TRUE,
    NOW(),
    NOW()
FROM categories c, manufacturers m
WHERE c.name = 'Antibiotics' AND m.name = 'GlaxoSmithKline plc'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, generic_name, description, sku, strength, dosage_form, packaging_unit, category_id, manufacturer_id, active, created_at, updated_at)
SELECT
    'Atorvastatin 40mg Tablets',
    'Atorvastatin Calcium',
    'HMG-CoA reductase inhibitor (statin) used to lower blood cholesterol and reduce the risk of cardiovascular disease events such as heart attack and stroke.',
    'SKU-ATOR-40',
    '40mg',
    'Film-coated tablet',
    'Pack of 30',
    c.id,
    m.id,
    TRUE,
    NOW(),
    NOW()
FROM categories c, manufacturers m
WHERE c.name = 'Cardiovascular' AND m.name = 'Pfizer Inc.'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, generic_name, description, sku, strength, dosage_form, packaging_unit, category_id, manufacturer_id, active, created_at, updated_at)
SELECT
    'Ibuprofen 400mg Tablets',
    'Ibuprofen',
    'Non-steroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce fever, and decrease inflammation in conditions such as arthritis, menstrual cramps, and minor injuries.',
    'SKU-IBUP-400',
    '400mg',
    'Tablet',
    'Pack of 24',
    c.id,
    m.id,
    TRUE,
    NOW(),
    NOW()
FROM categories c, manufacturers m
WHERE c.name = 'Analgesics' AND m.name = 'Abbott Laboratories'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, generic_name, description, sku, strength, dosage_form, packaging_unit, category_id, manufacturer_id, active, created_at, updated_at)
SELECT
    'Metformin 1000mg Tablets',
    'Metformin Hydrochloride',
    'First-line medication for the treatment of type 2 diabetes mellitus. Works by decreasing glucose production in the liver and improving insulin sensitivity.',
    'SKU-METF-1000',
    '1000mg',
    'Extended-release tablet',
    'Pack of 60',
    c.id,
    m.id,
    TRUE,
    NOW(),
    NOW()
FROM categories c, manufacturers m
WHERE c.name = 'Endocrinology' AND m.name = 'Merck & Co.'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, generic_name, description, sku, strength, dosage_form, packaging_unit, category_id, manufacturer_id, active, created_at, updated_at)
SELECT
    'Omeprazole 20mg Capsules',
    'Omeprazole',
    'Proton pump inhibitor (PPI) that decreases the amount of acid the stomach makes. Used to treat gastroesophageal reflux disease (GERD), stomach ulcers, and Zollinger-Ellison syndrome.',
    'SKU-OMEP-20',
    '20mg',
    'Delayed-release capsule',
    'Pack of 28',
    c.id,
    m.id,
    TRUE,
    NOW(),
    NOW()
FROM categories c, manufacturers m
WHERE c.name = 'Gastrointestinal' AND m.name = 'AstraZeneca PLC'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, generic_name, description, sku, strength, dosage_form, packaging_unit, category_id, manufacturer_id, active, created_at, updated_at)
SELECT
    'Salbutamol 100mcg Inhaler',
    'Salbutamol Sulfate',
    'Short-acting beta2-adrenergic receptor agonist (SABA) used for relief of bronchospasm in conditions such as asthma and chronic obstructive pulmonary disease (COPD).',
    'SKU-SALB-100',
    '100mcg/actuation',
    'Pressurised metered-dose inhaler',
    '200 doses per inhaler',
    c.id,
    m.id,
    TRUE,
    NOW(),
    NOW()
FROM categories c, manufacturers m
WHERE c.name = 'Respiratory' AND m.name = 'GlaxoSmithKline plc'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, generic_name, description, sku, strength, dosage_form, packaging_unit, category_id, manufacturer_id, active, created_at, updated_at)
SELECT
    'Vitamin D3 5000 IU Softgels',
    'Cholecalciferol',
    'Fat-soluble vitamin essential for normal bone development and maintenance. Supports calcium absorption, immune function, and muscle strength.',
    'SKU-VITD3-5000',
    '5000 IU',
    'Softgel capsule',
    'Bottle of 90',
    c.id,
    m.id,
    TRUE,
    NOW(),
    NOW()
FROM categories c, manufacturers m
WHERE c.name = 'Vitamins & Supplements' AND m.name = 'Abbott Laboratories'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, generic_name, description, sku, strength, dosage_form, packaging_unit, category_id, manufacturer_id, active, created_at, updated_at)
SELECT
    'Amlodipine 10mg Tablets',
    'Amlodipine Besylate',
    'Long-acting calcium channel blocker used to treat hypertension (high blood pressure) and coronary artery disease including angina.',
    'SKU-AMLO-10',
    '10mg',
    'Tablet',
    'Pack of 30',
    c.id,
    m.id,
    TRUE,
    NOW(),
    NOW()
FROM categories c, manufacturers m
WHERE c.name = 'Cardiovascular' AND m.name = 'Pfizer Inc.'
ON CONFLICT DO NOTHING;

-- ── Sample news articles ───────────────────────────────────────
INSERT INTO news (title, slug, summary, content, category, published, published_date, author, created_at, updated_at)
VALUES
(
    'Synergy Pharma Expands Its Oncology Product Portfolio',
    'synergy-pharma-expands-oncology-portfolio-2024',
    'Synergy Pharma announces a major expansion of its oncology division with new partnerships with leading global manufacturers.',
    'Synergy Pharma is proud to announce the expansion of our oncology product portfolio, establishing new supplier agreements with three leading global manufacturers. This strategic move strengthens our ability to serve healthcare institutions across the region with cutting-edge cancer therapies. The new products include targeted therapies, immunotherapy agents, and supportive care medications. Our commitment to making innovative treatments accessible remains at the core of our mission.',
    'COMPANY_NEWS',
    TRUE,
    '2024-10-15',
    'Synergy Pharma Editorial Team',
    NOW(),
    NOW()
),
(
    'New WHO Guidelines on Antibiotic Stewardship: What It Means for Healthcare Providers',
    'who-antibiotic-stewardship-guidelines-2024',
    'The World Health Organisation has released updated guidelines on antibiotic stewardship programmes. Here is what healthcare providers need to know.',
    'The World Health Organisation has published updated guidelines on antibiotic stewardship programmes, emphasising the importance of rational antibiotic use in the fight against antimicrobial resistance (AMR). Key recommendations include the establishment of hospital-based stewardship teams, mandatory reporting of antibiotic consumption data, and investment in rapid diagnostic tools. Synergy Pharma is committed to supporting healthcare institutions in implementing these guidelines.',
    'REGULATORY_UPDATE',
    TRUE,
    '2024-11-02',
    'Regulatory Affairs Team',
    NOW(),
    NOW()
),
(
    'New Product Arrivals: Cardiovascular Range Now in Stock',
    'cardiovascular-range-new-arrivals-q4-2024',
    'Synergy Pharma is pleased to announce the arrival of an expanded cardiovascular product range, including several first-to-market generics.',
    'We are excited to announce that our expanded cardiovascular product range is now available. The new additions include several first-to-market generic formulations of leading branded medications, offering healthcare institutions and distributors a cost-effective alternative without compromising on quality. All products are sourced from WHO-GMP and EU-GMP certified manufacturers. Contact our sales team to place your first order or to request product samples.',
    'PRODUCT_ARRIVAL',
    TRUE,
    '2024-11-20',
    'Product Management Team',
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;
