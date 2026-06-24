# Synergy Pharma – Database Layer (Phase 1)

## Overview

The database layer uses **PostgreSQL 15+** managed by **Flyway** (embedded in the Spring Boot backend). All schema changes are version-controlled SQL migration files; the application creates and updates the schema automatically on startup.

---

## Directory Structure

```
database/
├── setup.sql          ← Run ONCE as superuser to create the DB + role
├── rollback.sql       ← Emergency wipe (drops all tables + Flyway history)
├── migrations/        ← Placeholder (actual Flyway files live in the backend)
└── backups/           ← Store pg_dump backups here
```

Flyway migration files live at:

```
backend/src/main/resources/db/migration/
├── V1__create_users_and_roles.sql
├── V2__create_categories.sql
├── V3__create_manufacturers.sql
├── V4__create_products.sql
├── V5__create_rfqs.sql
├── V6__create_contact_messages.sql
├── V7__create_partner_inquiries.sql
├── V8__create_news.sql
└── V9__seed_initial_data.sql
```

---

## Quick Start (Development)

### Prerequisites
- PostgreSQL 15+ installed and running on `localhost:5432`

### 1 – Bootstrap the database (run once)
```bash
psql -U postgres -f database/setup.sql
```

This creates:
- Database: `synergypharma`
- Role: `synergy_app` (application user, limited permissions)
- Extension: `pg_trgm` (improved text search)

### 2 – Update `application.properties`
The default credentials match the `postgres` superuser for development. For a tighter setup, switch to `synergy_app`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/synergypharma
spring.datasource.username=synergy_app
spring.datasource.password=ChangeMe_SecurePassword123!
```

### 3 – Start the backend
```bash
cd backend
./mvnw spring-boot:run
```

Flyway will automatically apply all 9 migrations in order. On first boot, the database will be fully populated with:
- 1 admin user
- 10 product categories
- 10 manufacturers
- 8 sample products
- 3 news articles

---

## Default Admin Credentials

| Field    | Value                        |
|----------|------------------------------|
| Email    | `admin@synergypharma.com`    |
| Password | `Admin@123`                  |
| Role     | `ADMIN`                      |

> ⚠️ **Change the admin password immediately after the first login.**

---

## Schema Overview

| Table               | Description                                         |
|---------------------|-----------------------------------------------------|
| `users`             | Admin portal users with role-based access           |
| `categories`        | Product categories (e.g. Antibiotics, Cardiovascular)|
| `manufacturers`     | Pharmaceutical manufacturers and suppliers          |
| `products`          | Product catalogue with category/manufacturer FK     |
| `rfqs`              | Request for Quotation submissions from clients      |
| `rfq_items`         | Line items belonging to an RFQ                      |
| `contact_messages`  | General/product/vendor enquiries from the web form  |
| `partner_inquiries` | Partnership and vendor registration requests        |
| `news`              | Company news, regulatory updates, and product arrivals|

---

## Entity Relationships

```
categories ──< products >── manufacturers
                   |
rfqs ──────────< rfq_items
                   (optional product reference)

users              (standalone – admin portal access)
contact_messages   (standalone – inbound enquiries)
partner_inquiries  (standalone – partner requests)
news               (standalone – content management)
```

---

## Migration Naming Convention

All Flyway migrations follow:
```
V{version}__{description}.sql
```

Rules:
- Version numbers are **sequential integers** (V1, V2, …)
- Double underscore `__` separates version from description
- Never edit an already-applied migration; create a new version instead

---

## Backup & Restore

### Create a backup
```bash
pg_dump -U postgres -Fc synergypharma > database/backups/synergypharma_$(date +%Y%m%d).dump
```

### Restore from backup
```bash
pg_restore -U postgres -d synergypharma database/backups/synergypharma_20241201.dump
```

---

## Rollback (Development Only)

To wipe the schema and re-run all migrations cleanly:
```bash
psql -U postgres -d synergypharma -f database/rollback.sql
# Then restart the Spring Boot application
```

> ⚠️ Never run rollback.sql in production.
