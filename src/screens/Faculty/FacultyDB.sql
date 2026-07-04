-- Faculty Database Schema Blueprint
-- Manages Faculty Profiles, Timetables, Course Assignments, and Research Portfolios

-- 1. Faculty Master Profile
CREATE TABLE faculty_profiles (
    faculty_id VARCHAR(50) PRIMARY KEY,
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    workload_hours_per_week INT DEFAULT 18
);

-- 2. Assignments & Grading
CREATE TABLE coursework_assignments (
    id SERIAL PRIMARY KEY,
    faculty_id VARCHAR(50) REFERENCES faculty_profiles(faculty_id),
    title VARCHAR(255) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    max_marks INT DEFAULT 100,
    deadline DATE NOT NULL
);

-- 3. Research Portfolio
CREATE TABLE research_publications (
    id SERIAL PRIMARY KEY,
    faculty_id VARCHAR(50) REFERENCES faculty_profiles(faculty_id),
    type VARCHAR(50) NOT NULL, -- Journal, Conference, Patent
    title VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    publish_date DATE
);
