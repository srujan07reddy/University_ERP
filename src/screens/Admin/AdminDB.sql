-- Admin Database Schema Blueprint
-- Manages System Users, Business Rules, Substitutions, and System Audits

-- 1. Authentication & System Users
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Business Rules Configuration
CREATE TABLE business_rules (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    value NUMERIC(10,2) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE
);

-- 3. Faculty Substitutions
CREATE TABLE substitutions (
    id SERIAL PRIMARY KEY,
    absent_faculty_id VARCHAR(50) REFERENCES users(id),
    substitute_faculty_id VARCHAR(50) REFERENCES users(id),
    timetable_slot_id INT,
    substitution_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending'
);

-- 4. Audit Trail Logs
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    actor VARCHAR(100) NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    severity VARCHAR(20) DEFAULT 'Low',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
