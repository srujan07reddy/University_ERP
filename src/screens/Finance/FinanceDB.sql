-- Finance Database Schema Blueprint
-- Manages Fee Ledgers, Disbursements, Salaries, and Purchase Approvals

-- 1. Student Fee Ledger
CREATE TABLE student_fees (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    total_due NUMERIC(10,2) NOT NULL,
    amount_paid NUMERIC(10,2) DEFAULT 0.0,
    status VARCHAR(20) DEFAULT 'Unpaid'
);

-- 2. Staff Payroll Ledger
CREATE TABLE staff_payroll (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    basic_salary NUMERIC(10,2) NOT NULL,
    allowances NUMERIC(10,2) DEFAULT 0.0,
    deductions NUMERIC(10,2) DEFAULT 0.0,
    status VARCHAR(20) DEFAULT 'Pending'
);
