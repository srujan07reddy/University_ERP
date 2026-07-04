-- Vice Chancellor Database Schema Blueprint
-- High-level approvals, policies, and escalation queues

CREATE TABLE vc_approvals_ledger (
    id SERIAL PRIMARY KEY,
    request_id INT NOT NULL, -- Links to approval_requests
    escalated_from_role VARCHAR(50) NOT NULL,
    decision VARCHAR(20) DEFAULT 'Pending',
    reviewed_at TIMESTAMP
);
