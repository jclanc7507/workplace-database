const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET for all employees via department ID
router.get('/employees', (req, res) => {
    const sql = `select employees.*, departments.name
                 as department_name
                 from employees
                 left join departments
                 on employees.department_id = departments.id`;
                
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET an individual employee via department ID
router.get('/employee/:id', (req, res) => {
    const sql = `select employee.*, department.name
                 as department_name
                 from employees
                 left join departments
                 on employees.department_id = department.id
                 where employees.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'success',
            data: row
        });
    });
});

// GET an individual employee via manager ID
router.get('/employee/:id', (req, res) => {
    const sql = `select employee.*, manager.name
                 as manager_name
                 from employees
                 left join managers
                 on employees.manager_id = manager.id
                 where employees.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'success',
            data: row
        });
    });
});

// Create an employee
router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(
        body,
            'id',
            'first_name',
            'last_name',
            'role',
            'department',
            'salary',
            'manager'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `insert into employees (id, first_name, last_name, role, department, salary, manager) values (?,?,?,?,?,?,?)`;
    const params = [
        body.id,
        body.first_name,
        body.last_name,
        body.role,
        body.department,
        body.salary,
        body.manager
    ];

    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Update a employee's role
router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `update employees set role_id = ?
                 where id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: results.affectedRows
            });
        }
    });
});

// Delete a employee
router.delete('/employee/:id', (req, res) => {
    const sql = `delete from employees where id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'employee deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;