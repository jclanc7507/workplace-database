const inquirer = require('inquirer');
const mysql = require('mysql2');

connection.execute(
    'select * from department wher id = ?',
    function(err, results, fields) {
        if (err) throw (err);
    }
);

const message = {
    getDepartments: 'View All Departments',
    getRoles: 'View All Roles',
    getEmployees: 'View All Employees',
    createDepartment: 'Add Department',
    createRole: 'Add Role',
    createEmployee: 'Add Employee',
    updateEmployee: 'Update An Employee Role',
    deleteDepartment: 'Delete A Department',
    deleteRole: 'Delete A Role',
    deleteEmployee: 'Delete An Employee',
    exit: 'Finished'
};

const mainMenu = async () => {
    const answer = await inquirer.prompt([
        {
            name: 'selection',
            type: 'list',
            message: 'Please select an action.',
            choices: [
                message.getDepartments,
                message.getRoles,
                message.getEmployees,
                message.createDepartment,
                message.createRole,
                message.createEmployee,
                message.updateEmployee,
                message.deleteDepartment,
                message.deleteRole,
                message.deleteEmployee,
                message.exit
            ]
        }
    ]);
    switch (answer.selection) {
        case message.getDepartments:
            getDepartments();
            break;
    }
    switch (answer.selection) {
        case message.getRoles:
            getRoles();
            break;
    }
    switch (answer.selection) {
        case message.getEmployees:
            getEmployees();
            break;
    }
    switch (answer.selection) {
        case message.createDepartment:
            createDepartment();
            break;
    }
    switch (answer.selection) {
        case message.createRole:
            createRole();
            break;
    }
    switch (answer.selection) {
        case message.createEmployee:
            createEmployee();
            break;
    }
    switch (answer.selection) {
        case message.updateEmployee:
            updateEmployee();
            break;
    }
    switch (answer.selection) {
        case message.deleteDepartment:
            deleteDepartment();
            break;
    }
    switch (answer.selection) {
        case message.deleteRole:
            deleteRole();
            break;
    }
    switch (answer.selection) {
        case message.deleteEmployee:
            deleteEmployee();
            break;
    }
    switch (answer.selection) {
        case message.exit:
            exit();
            break;
    }
};

// functions for choices
function getDepartments() {
    const query = `select * from departments`;
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        mainMenu();
    })
};

function getEmployees() {
    const query = `select * from employees`;
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        mainMenu();
    })
};

function getRoles() {
    const query = `select * from roles`;
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data)
        mainMenu();
    })
};

function createDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: "Creating Department: What is the new department's name?"
        }
    ])
    .then((answer) => {
        const createDepartment = `insert into departments (name) values ('${answer.department}')`
        connection.query(createDepartment, (err) => {
            if (err) throw err;
            console.log("New Department created.");
            mainMenu();
        })
    })
};

function createRole() {
    let departmentSelection = []
    let createDepartment = `select * from departments`
    connection.query(createDepartment, (err, data) => {
        if (err) throw err;
        departmentSelection = data.map(({ id, department }) => (
            {
                name: department,
                value: id
            }
        ))
        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the role you want to create?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the new role? (REQUIRED: digits only, no symbols)'
            },
            {
                title: 'list',
                name: 'department',
                message: 'Which department will this new role be added into?',
                choices: departmentSelection
            }
        ])
        .then((answer) => {
            const createRole = `insert into roles (id, title, department, salary) values ('${answer.role}', '${answer.department}', '${answer.salary}')`
            connection.query(createRole, (err) => {
                if (err) throw err;
                console.log("New Role Created.");
                mainMenu();
            })
        })
    })
};

function createEmployee() {
    let roleChoices = [];
    let employeeQuery = `select * from role`;
    connection.query(employeeQuery, (err, data) => {
        if (err) throw err;
        roleChoices = data.map(({ id, title }) => (
            {
                name: title,
                value: id
            }
        ))
        inquirer.prompt([
            {
                type: 'input',
                name: 'first name',
                message: "What is the new employee's first name?"
            },
            {
                type: 'input',
                name: 'last name',
                message: "What is the new employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the new employee's role?",
                choices: roleChoices
            }
        ])
        .then((answer) => {
            const createEmployee = `insert into employees (first_name, last_name, role) values ('${answer.first_name}', '${answer.last_name}', '${answer.role})`
            connection.query(createEmployee, (err) => {
                if (err) throw err;
                console.log("Created new Employee.");
                mainMenu();
            })
        })
    })
};

function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Which employee would you like to update?'
        }
    ])
    .then((answer) => {
        connection.query(`select role.id, role.title from roles order by role.id;`, async (err, res) => {
            if (err) throw err;
            const { role } = await inquirer.prompt([
                {
                    title: 'list',
                    name: 'role',
                    message: "Which new role would you like this employee to be put into?",
                    choices: () => res.map(res => res.title)
                }
            ]);
            let role_id;
            for (const row of res) {
                if (row.title === role) {
                    role_id = row.id;
                    continue;
                }
            };
            connection.query(`update employee set role_id = '${role_id}' where employee.id = '${answer.id}'`, async (err, res) => {
                if (err) throw err;
                console.log("Employee updated.");
                mainMenu();
            })
        })
    })
};

function deleteDepartment() {
    let departmentSelection = []
    let deleteDepartment = `select * from departments`
    connection.query(deleteDepartment, (err, data) => {
        if (err) throw err;
        departmentSelection = data.map(({ id, department }) => (
            {
                name: department,
                value: id
            }
        ))
        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: "Which department would you like to delete?",
                choices: departmentSelection
            }
        ])
        .then((answer) => {
            const deleteDepartment = `delete from departments where = ('${answer.department.id}')`
            connection.query(deleteDepartment, (err) => {
                if (err) throw err;
                console.log("Department deleted.");
                mainMenu();
            })
        })
    })
};

function deleteEmployee() {
    let employeeSelection = []
    let deleteEmployee = `select * from employees`
    connection.query(deleteEmployee, (err, data) => {
        if (err) throw err;
        employeeSelection = data.map(({ id, employee }) => (
            {
                name: employee,
                value: id
            }
        ))
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: "Which employee would you like to delete?",
                choices: employeeSelection
            }
        ])
        .then((answer) => {
            const deleteEmployee = `delete from employees where = ('${answer.employee.id}')`
            connection.query(deleteEmployee, (err) => {
                if (err) throw err;
                console.log("Employee deleted.");
                mainMenu();
            })
        })
    })
};

function deleteRole() {
    let roleSelection = []
    let deleteRole = `select * from roles`
    connection.query(deleteRole, (err, data) => {
        if (err) throw err;
        roleSelection = data.map(({ id, role }) => (
            {
                name: role,
                value: id
            }
        ))
        inquirer.prompt([
            {
                type: 'list',
                name: 'role_id',
                message: "Which role would you like to delete?",
                choices: roleSelection
            }
        ])
        .then((answer) => {
            const deleteRole = `delete from role where = ('${answer.role.id}')`
            connection.query(deleteEmployee, (err) => {
                if (err) throw err;
                console.log("Role deleted.");
                mainMenu();
            })
        })
    })
};

function exit() {
    console.log("Goodbye!");
    connection.end()
};

mainMenu();