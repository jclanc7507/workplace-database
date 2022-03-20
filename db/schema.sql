drop table if exists employees;
drop table if exists departments;
drop table if exists roles;

create table employees (
    id int auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int not null,
    created_at datetime default current_times
);

create table departments (
    id int auto_increment primary key,
    name varchar(30) not null
);

create table roles (
    id int auto_increment primary key,
    title varchar(30) not null,
    salary decimal not null,
    department_id int not null
);

-- add constraints