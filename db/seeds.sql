insert into departments (name, id)
values
    ('Human Resources', 1),
    ('Inbound', 2),
    ('Warehousing', 3),
    ('Outbound', 4); 

insert into roles (title, salary, department_id)
values
    ('Warehouse Worker', 40000, 2),
    ('Forkflift Driver', 42000, 3),
    ('Recruiting', 55000, 1),
    ('Warehouse Assistant', 34000, 4),
    ('Lead Warehouse Worker', 44000, 2),
    ('Public Relations', 52000, 1);

insert into employees (first_name, last_name, role_id, manager_id)
values
    ('John', 'Smith', 3, 5),
    ('Jane', 'Doe', 1, 6),
    ('Nathaniel', 'Swift', 2, 7),
    ('Gabriel', 'Rameriaz', 4, 8),
    ('Roe', 'Daniels', 5, 6),
    ('David', 'Brown', 6, 5),
    ('Jacob', 'Hempstead', 3, 6);