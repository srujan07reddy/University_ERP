-- Registrar Database Schema Blueprint
-- Student registrations and legal university records

CREATE TABLE student_registry (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    registration_status VARCHAR(50) DEFAULT 'Active',
    verified_at TIMESTAMP
);
