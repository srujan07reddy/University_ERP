-- ===========================================================================
-- DATABASE SCHEMA: Jeppiaar University ERP
-- PART 4: Business Rules Engine, Workflows & Automated Escalations
-- ===========================================================================

-- 1. BUSINESS RULES ENGINE CONFIGURATION
CREATE TABLE business_rules (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed defaults corresponding to useStore.ts
INSERT INTO business_rules (id, name, category, value, is_enabled) VALUES
('rule_1', 'Minimum Attendance Requirement (%)', 'Attendance', 75.00, true),
('rule_2', 'Minimum GPA for Placements (CGPA)', 'Placement', 6.50, true),
('rule_3', 'Placement Offer Multiplier Requirement (x)', 'Placement', 2.00, true),
('rule_4', 'On-Duty Leave Maximum (Days)', 'Leave', 3.00, true),
('rule_5', 'Approval Timeout Escalation threshold (Hours)', 'System', 24.00, true)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- 2. APPROVAL WORKFLOW PORTAL
CREATE TABLE approval_requests (
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    sender_name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'Leave', 'On-Duty', 'MarksLocking', 'BudgetPurchase'
    details TEXT NOT NULL,
    status approval_status DEFAULT 'Pending',
    date_submitted DATE DEFAULT CURRENT_DATE,
    hours_elapsed INT DEFAULT 0 CHECK (hours_elapsed >= 0),
    is_escalated BOOLEAN DEFAULT FALSE,
    escalation_target_role user_role DEFAULT 'HoD',
    current_handler_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) DEFAULT NULL -- For Budget/Finance requests
);

-- 3. LEAVE APPLICATIONS (RELATION TO WORKFLOWS)
CREATE TABLE leave_applications (
    id SERIAL PRIMARY KEY,
    approval_request_id INT REFERENCES approval_requests(id) ON DELETE CASCADE,
    student_id VARCHAR(50) REFERENCES student_profiles(student_id),
    faculty_id VARCHAR(50) REFERENCES faculty_profiles(faculty_id),
    leave_type VARCHAR(50) NOT NULL, -- 'Casual', 'Medical', 'On-Duty'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INT NOT NULL,
    reason TEXT NOT NULL
);

-- ===========================================================================
-- DYNAMIC COMMUNICATION: TRIGGER FOR AUTOMATED WORKFLOW ESCALATIONS
-- ===========================================================================

-- Trigger function that simulates escalation logic when hours_elapsed is incremented
CREATE OR REPLACE FUNCTION check_workflow_escalations()
RETURNS TRIGGER AS $$
DECLARE
    timeout_hours INT;
BEGIN
    -- Read timeout limit from business rules table
    SELECT COALESCE(value, 24)::INT INTO timeout_hours 
    FROM business_rules 
    WHERE id = 'rule_5';

    -- If elapsed time exceeds rule_5 threshold and status is Pending
    IF NEW.hours_elapsed >= timeout_hours AND NEW.status = 'Pending' THEN
        NEW.is_escalated := TRUE;
        
        -- Escalate to next hierarchy tier
        IF NEW.escalation_target_role = 'HoD' THEN
            NEW.escalation_target_role := 'Dean';
        ELSIF NEW.escalation_target_role = 'Dean' THEN
            NEW.escalation_target_role := 'ProViceChancellor';
        ELSIF NEW.escalation_target_role = 'ProViceChancellor' THEN
            NEW.escalation_target_role := 'ViceChancellor';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_approval_escalation
BEFORE UPDATE OF hours_elapsed ON approval_requests
FOR EACH ROW
EXECUTE FUNCTION check_workflow_escalations();
