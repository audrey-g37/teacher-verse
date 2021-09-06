DROP DATABASE IF EXISTS cohort_db;
CREATE DATABASE cohort_db;

USE cohort_db

CREATE TABLE assignment(
    id INT AUTOINCREMENT NOT NULL,
    assignment_name VARCHAR (30) NOT NULL,
    grade INT NOT NULL,
    status VARCHAR(30),
    PRIMARY KEY (id)
)

CREATE TABLE Details (
    id INT AUTOINCREMENT NOT NULL,
    parent_id VARCHAR(30) NOT NULL,
   email_address VARCHAR(40) INT NOT NULL,
      INT,
    PRIMARY KEY (id)
)

CREATE TABLE student (
    id INT AUTOINCREMENT NOT NULL,
    first_name VARCHAR (30) NOT NUll,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)