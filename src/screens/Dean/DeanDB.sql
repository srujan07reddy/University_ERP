-- Dean Database Schema Blueprint
-- School administration, budgets, departments, and faculty workload audits

CREATE TABLE school_departments (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dean_id VARCHAR(50) NOT NULL
);

CREATE TABLE department_budgets (
    id SERIAL PRIMARY KEY,
    department_code VARCHAR(10) REFERENCES school_departments(code),
    allocated_amount NUMERIC(12,2) NOT NULL,
    utilized_amount NUMERIC(12,2) DEFAULT 0.0
);
