-- ===========================================================================
-- DATABASE SCHEMA: Jeppiaar University ERP
-- PART 1: Roles, Authentication, and User Profiles
-- ===========================================================================

-- 1. ENUM DEFINITIONS FOR ROLES AND STATUS
CREATE TYPE user_role AS ENUM (
    'Admin', 'Student', 'Faculty', 'Parent', 'Accountant', 
    'Chancellor', 'ViceChancellor', 'ProViceChancellor', 'Dean', 
    'Registrar', 'PlacementOfficer', 'CoE', 'HoD', 'AdmissionsOfficer'
);

CREATE TYPE approval_status AS ENUM (
    'Pending', 'Approved', 'Rejected', 'Escalated'
);

CREATE TYPE severity_level AS ENUM (
    'Low', 'Medium', 'High', 'Critical'
);

-- 2. CORE USERS SYSTEM TABLE
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SPECIFIC PROFILE EXTENSIONS (ROLE-BASED RELATIONSHIPS)
CREATE TABLE student_profiles (
    student_id VARCHAR(50) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    batch VARCHAR(20) NOT NULL,
    year_of_study INT NOT NULL CHECK (year_of_study BETWEEN 1 AND 4),
    section VARCHAR(10) NOT NULL,
    cgpa NUMERIC(4, 2) DEFAULT 0.0 CHECK (cgpa BETWEEN 0.0 AND 10.0),
    attendance_percentage NUMERIC(5, 2) DEFAULT 0.0 CHECK (attendance_percentage BETWEEN 0.0 AND 100.0),
    placement_eligible BOOLEAN DEFAULT TRUE,
    hall_ticket_downloaded BOOLEAN DEFAULT FALSE
);

CREATE TABLE faculty_profiles (
    faculty_id VARCHAR(50) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    publications_count INT DEFAULT 0 CHECK (publications_count >= 0),
    workload_hours_per_week INT DEFAULT 18 CHECK (workload_hours_per_week >= 0)
);

CREATE TABLE parent_profiles (
    parent_id VARCHAR(50) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    student_id VARCHAR(50) REFERENCES student_profiles(student_id) ON DELETE SET NULL,
    emergency_contact VARCHAR(20) NOT NULL
);

-- Indexes for lightning fast lookups
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_dept_section ON student_profiles(department, section);
CREATE INDEX idx_faculty_dept ON faculty_profiles(department);
