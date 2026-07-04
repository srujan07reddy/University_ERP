-- CoE Database Schema Blueprint
-- Internal marks, exam schedules, and hall tickets

CREATE TABLE internal_marks_lock (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,
    section VARCHAR(10) NOT NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    locked_by VARCHAR(50) NOT NULL,
    locked_at TIMESTAMP
);
