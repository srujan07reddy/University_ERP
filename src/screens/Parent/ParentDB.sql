-- Parent Database Schema Blueprint
-- Manages Parent Profiles and Links to Student Academic Performance

CREATE TABLE parent_profiles (
    parent_id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL, -- Links to Student Profile
    emergency_contact VARCHAR(20) NOT NULL
);
