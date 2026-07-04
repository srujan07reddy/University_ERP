-- ===========================================================================
-- DATABASE SCHEMA: Jeppiaar University ERP
-- PART 5: Finance, Payroll, Assets, and Transport Operations
-- ===========================================================================

-- 1. STUDENT FEE TRANSACTION LEDGER
CREATE TABLE student_fee_ledgers (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    total_term_fees NUMERIC(10, 2) NOT NULL,
    paid_fees NUMERIC(10, 2) DEFAULT 0.0 CHECK (paid_fees >= 0),
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Unpaid' CHECK (status IN ('Paid', 'Partial', 'Unpaid'))
);

CREATE TABLE fee_payment_transactions (
    id SERIAL PRIMARY KEY,
    ledger_id INT REFERENCES student_fee_ledgers(id) ON DELETE CASCADE,
    amount_paid NUMERIC(10, 2) NOT NULL CHECK (amount_paid > 0),
    payment_method VARCHAR(50) NOT NULL, -- 'Card', 'NetBanking', 'UPI'
    transaction_reference VARCHAR(100) UNIQUE NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. STAFF PAYROLL SYSTEM
CREATE TABLE staff_payroll_ledgers (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    basic_salary NUMERIC(10, 2) NOT NULL CHECK (basic_salary > 0),
    allowances NUMERIC(10, 2) DEFAULT 0.0,
    deductions NUMERIC(10, 2) DEFAULT 0.0,
    net_salary NUMERIC(10, 2) GENERATED ALWAYS AS (basic_salary + allowances - deductions) STORED,
    disbursement_status VARCHAR(20) DEFAULT 'Pending' CHECK (disbursement_status IN ('Pending', 'Disbursed', 'OnHold')),
    disbursement_date DATE DEFAULT NULL
);

-- 3. PHYSICAL ASSET MANAGEMENT (INVENTORY)
CREATE TABLE inventory_assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Lab Equipment', 'IT Hardware', 'Furniture'
    total_quantity INT NOT NULL CHECK (total_quantity >= 0),
    available_quantity INT NOT NULL CHECK (available_quantity >= 0),
    department_id INT REFERENCES departments(id) ON DELETE SET NULL,
    last_audit_date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT chk_qty CHECK (available_quantity <= total_quantity)
);

-- 4. TRANSPORT AND VEHICLE GPS TRACKING
CREATE TABLE transport_buses (
    id SERIAL PRIMARY KEY,
    bus_no VARCHAR(20) UNIQUE NOT NULL,
    route_name VARCHAR(255) NOT NULL,
    driver_name VARCHAR(255) NOT NULL,
    driver_phone VARCHAR(20) NOT NULL,
    gps_lat NUMERIC(9, 6) DEFAULT NULL,
    gps_long NUMERIC(9, 6) DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'On Time' CHECK (status IN ('On Time', 'Delayed', 'Maintenance')),
    last_ping TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fee_ledger_student ON student_fee_ledgers(student_id);
CREATE INDEX idx_payroll_user ON staff_payroll_ledgers(user_id);
