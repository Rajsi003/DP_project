CREATE DATABASE erpmodule;




CREATE TABLE courses (
    course_code  PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    instructor_name VARCHAR(255),
    instructor_id VARCHAR(255),
    avail VARCHAR(50),
    dcfor TEXT[],
    defor TEXT[],
    icornot VARCHAR(10),
    slot VARCHAR(10),
    credit INT,
    ltpc VARCHAR(50)
);

