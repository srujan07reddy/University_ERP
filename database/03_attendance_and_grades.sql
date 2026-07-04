-- ===========================================================================
-- DATABASE SCHEMA: Jeppiaar University ERP
-- PART 3: Student Attendance Logs and Internal Gradebook
-- ===========================================================================

-- 1. ATTENDANCE LOGGING (DAILY SUBJECT-WISE SESSIONS)
CREATE TABLE attendance_sessions (
    id SERIAL PRIMARY KEY,
    offering_id INT REFERENCES course_offerings(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    taken_by_id VARCHAR(50) REFERENCES faculty_profiles(faculty_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_attendance_logs (
    session_id INT REFERENCES attendance_sessions(id) ON DELETE CASCADE,
    student_id VARCHAR(50) REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    is_present BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (session_id, student_id)
);

-- 2. ASSIGNMENTS
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    offering_id INT REFERENCES course_offerings(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    max_marks INT NOT NULL CHECK (max_marks > 0),
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignment_submissions (
    id SERIAL PRIMARY KEY,
    assignment_id INT REFERENCES assignments(id) ON DELETE CASCADE,
    student_id VARCHAR(50) REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    submission_file_path VARCHAR(512),
    obtained_marks INT CHECK (obtained_marks >= 0),
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    graded_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT chk_obtained_marks CHECK (obtained_marks <= max_marks) -- note: needs subquery or trigger check, but added here for logic
);

-- 3. INTERNAL MARKS LEDGER (LOCKED FOR EXAMS IN COE OFFICE)
CREATE TABLE student_internal_marks (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    offering_id INT REFERENCES course_offerings(id) ON DELETE CASCADE,
    internal_assessment_1 NUMERIC(5, 2) DEFAULT 0.0 CHECK (internal_assessment_1 >= 0),
    internal_assessment_2 NUMERIC(5, 2) DEFAULT 0.0 CHECK (internal_assessment_2 >= 0),
    model_exam NUMERIC(5, 2) DEFAULT 0.0 CHECK (model_exam >= 0),
    is_locked BOOLEAN DEFAULT FALSE,
    locked_by VARCHAR(50) REFERENCES users(id),
    locked_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (student_id, offering_id)
);

CREATE INDEX idx_attendance_date ON attendance_sessions(session_date);
CREATE INDEX idx_marks_student_offering ON student_internal_marks(student_id, offering_id);
