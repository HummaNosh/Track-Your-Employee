
DROP DATABASE IF EXISTS track_people_db;
CREATE DATABASE track_people_db;

USE track_people_db;

CREATE TABLE Department (
    id INT PRIMARY KEY,
    department_name VARCHAR (100)
);

CREATE TABLE Role (
    id INT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT,
    FOREIGN key (department_id)
    REFERENCES Department(id)
    
);


CREATE TABLE Employee (
    id INT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES Role(id),
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES Employee(id) 
    ON DELETE CASCADE
    
);

