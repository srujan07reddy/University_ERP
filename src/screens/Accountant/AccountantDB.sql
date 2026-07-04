-- Accountant Database Schema Blueprint
-- Fee transactions and invoices

CREATE TABLE fee_invoices (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Unpaid'
);
