-- HoD Database Schema Blueprint
-- Department courses, allocations, and timetable scheduler entries

CREATE TABLE course_allocations (
    id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    assigned_faculty VARCHAR(100) NOT NULL,
    class_section VARCHAR(50) NOT NULL
);
