-- Placement Database Schema Blueprint
-- Placement drives and student CV tracking

CREATE TABLE placement_drives (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    drive_date DATE NOT NULL,
    gpa_cutoff NUMERIC(4,2) DEFAULT 6.0
);

CREATE TABLE drive_registrations (
    drive_id INT REFERENCES placement_drives(id),
    student_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Registered',
    PRIMARY KEY (drive_id, student_id)
);
