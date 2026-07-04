-- ===========================================================================
-- DATABASE SCHEMA: Jeppiaar University ERP
-- PART 2: Academics, Courses, and Timetables
-- ===========================================================================

-- 1. DEPARTMENTS
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    head_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL
);

-- 2. COURSES
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    credits INT NOT NULL CHECK (credits > 0),
    department_id INT REFERENCES departments(id) ON DELETE CASCADE
);

-- 3. CLASSROOM SECTIONS AND ENROLLMENT (STUDENTS IN COURSES)
CREATE TABLE course_offerings (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    faculty_id VARCHAR(50) REFERENCES faculty_profiles(faculty_id) ON DELETE SET NULL,
    semester VARCHAR(20) NOT NULL,
    section VARCHAR(10) NOT NULL,
    academic_year VARCHAR(10) NOT NULL
);

CREATE TABLE student_enrollments (
    student_id VARCHAR(50) REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    offering_id INT REFERENCES course_offerings(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, offering_id)
);

-- 4. TIMETABLES AND CLASS SLOTS
CREATE TABLE timetable_slots (
    id SERIAL PRIMARY KEY,
    offering_id INT REFERENCES course_offerings(id) ON DELETE CASCADE,
    day_of_week VARCHAR(15) NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_no VARCHAR(20) NOT NULL
);

-- 5. FACULTY SUBSTITUTIONS (DYNAMIC TIMETABLE REASSIGNMENTS)
CREATE TABLE faculty_substitutions (
    id SERIAL PRIMARY KEY,
    absent_faculty_id VARCHAR(50) REFERENCES faculty_profiles(faculty_id) ON DELETE CASCADE,
    substitute_faculty_id VARCHAR(50) REFERENCES faculty_profiles(faculty_id) ON DELETE CASCADE,
    slot_id INT REFERENCES timetable_slots(id) ON DELETE CASCADE,
    substitution_date DATE NOT NULL,
    is_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_offerings_semester ON course_offerings(semester);
CREATE INDEX idx_timetable_day ON timetable_slots(day_of_week);
