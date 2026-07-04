-- Chancellor Database Schema Blueprint
-- Governance analytics view over overall enrollments, revenue, and audits

CREATE TABLE governance_snapshots (
    id SERIAL PRIMARY KEY,
    total_students INT NOT NULL,
    total_revenue NUMERIC(15,2) NOT NULL,
    audit_compliance_status VARCHAR(50) NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
