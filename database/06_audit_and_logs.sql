-- ===========================================================================
-- DATABASE SCHEMA: Jeppiaar University ERP
-- PART 6: System Audit Trails, Broadcasts, and Announcements
-- ===========================================================================

-- 1. SYSTEM AUDIT LOGS
CREATE TABLE system_audit_logs (
    id SERIAL PRIMARY KEY,
    actor_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    severity severity_level DEFAULT 'Low',
    ip_address VARCHAR(45) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. EMERGENCY BROADCASTS
CREATE TABLE emergency_broadcasts (
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    target_audience VARCHAR(50) DEFAULT 'All' CHECK (target_audience IN ('All', 'Students', 'Faculty', 'Staff')),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SAFECHAT DIRECT MESSAGING
CREATE TABLE safechat_messages (
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    receiver_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    message_content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast lookups
CREATE INDEX idx_audit_logs_severity ON system_audit_logs(severity);
CREATE INDEX idx_safechat_participants ON safechat_messages(sender_id, receiver_id);
