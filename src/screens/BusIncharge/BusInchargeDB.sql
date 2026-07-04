-- Bus Incharge Database Schema Blueprint
-- Manages Transport Fleet, Driver Rosters, Stops Coordinates, and Student Allocations

-- 1. Bus Master Fleet Registry
CREATE TABLE bus_fleet (
    id SERIAL PRIMARY KEY,
    bus_number VARCHAR(20) UNIQUE NOT NULL,
    model VARCHAR(50) NOT NULL,
    capacity INT DEFAULT 50,
    fuel_efficiency NUMERIC(4,2),
    status VARCHAR(20) DEFAULT 'Active'
);

-- 2. Drivers Database
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    license_expiry DATE NOT NULL
);

-- 3. Route Details and Active GPS Stops
CREATE TABLE transport_routes (
    id SERIAL PRIMARY KEY,
    route_name VARCHAR(255) NOT NULL,
    start_point VARCHAR(100) NOT NULL,
    end_point VARCHAR(100) NOT NULL,
    allocated_bus_id INT REFERENCES bus_fleet(id),
    allocated_driver_id INT REFERENCES drivers(id)
);

CREATE TABLE stop_coordinates (
    id SERIAL PRIMARY KEY,
    route_id INT REFERENCES transport_routes(id),
    stop_name VARCHAR(100) NOT NULL,
    stop_sequence INT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL
);

-- 4. Active Student Transport Subscriptions
CREATE TABLE student_bus_subscriptions (
    student_id VARCHAR(50) PRIMARY KEY, -- references student_profiles(student_id)
    route_id INT REFERENCES transport_routes(id),
    boarding_stop_id INT REFERENCES stop_coordinates(id),
    payment_status VARCHAR(20) DEFAULT 'Paid'
);
