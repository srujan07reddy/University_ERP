-- Student Database Schema Blueprint
-- Manages Student Profiles, Enrollment, Attendance, and Service Allocations

-- 1. Student Master Profile
CREATE TABLE student_profiles (
    student_id VARCHAR(50) PRIMARY KEY,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    current_semester INT NOT NULL,
    cgpa NUMERIC(4,2) DEFAULT 0.0,
    attendance_percentage NUMERIC(5,2) DEFAULT 0.0
);

-- 2. Course Enrollments
CREATE TABLE student_enrollments (
    student_id VARCHAR(50) REFERENCES student_profiles(student_id),
    course_code VARCHAR(20) NOT NULL,
    enrolled_semester INT NOT NULL,
    PRIMARY KEY (student_id, course_code)
);

-- 3. Daily Attendance Logs
CREATE TABLE attendance_logs (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES student_profiles(student_id),
    course_code VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    is_present BOOLEAN DEFAULT TRUE
);

-- 4. Services (Hostel & Transport Links)
CREATE TABLE hostel_allotment (
    student_id VARCHAR(50) PRIMARY KEY REFERENCES student_profiles(student_id),
    room_no VARCHAR(20) NOT NULL,
    warden_name VARCHAR(100) NOT NULL
);

CREATE TABLE transport_allotment (
    student_id VARCHAR(50) PRIMARY KEY REFERENCES student_profiles(student_id),
    route_no VARCHAR(20) NOT NULL,
    boarding_point VARCHAR(255) NOT NULL
);
