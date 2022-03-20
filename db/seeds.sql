insert into departments (name, id)
values
    ('Human Resources', 1),
    ('Inbound', 2),
    ('Warehousing', 3),
    ('Outbound', 4);

insert into roles (title, salary, department_id)
values
    ('Warehouse Worker', '40k', 2),
    ('Forkflift Driver', '42k', 3),
    ('Recruiting', '55k', 1),
    ('Warehouse Assistant', '34k', 4),
    ('Lead Warehouse Worker', '44k', 2),
    ('Public Relations', '52k', 1);

insert into employees (first_name, last_name, role_id, manager_id)
values
    ('John', 'Smith', 1, 5),
    ('Jane', 'Doe', 2, 6),
    ('Nathaniel', 'Swift', 3, 7),
    ('Gabriel', 'Rameriaz', 4, 8),
    ('Roe', 'Daniels', 2, 6),
    ('David', 'Brown', 1, 5),
    ('Jacob', 'Hempstead', 2, 6);