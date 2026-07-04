-- Admissions Database Schema Blueprint
-- Student admissions registrations

CREATE TABLE admissions_ledger (
    id SERIAL PRIMARY KEY,
    applicant_name VARCHAR(255) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending'
);
