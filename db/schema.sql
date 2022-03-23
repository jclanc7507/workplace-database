drop table if exists employees;
drop table if exists departments;
drop table if exists roles;

create table employees (
    id int auto_increment primary key not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int
);

create table departments (
    id int auto_increment primary key not null,
    name varchar(30) not null
);

create table roles (
    id int auto_increment primary key not null,
    title varchar(30) not null,
    salary decimal not null,
    department_id int
);
