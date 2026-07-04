-- Pro VC Database Schema Blueprint
-- Operations workflow escalations and budget thresholds

CREATE TABLE provc_budget_clearance (
    id SERIAL PRIMARY KEY,
    request_id INT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    justification TEXT,
    status VARCHAR(20) DEFAULT 'Pending'
);
