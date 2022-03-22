const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET for all employees via ID
router.get('/employees', (req, res) => {
    const sql = `select * from employees`;
                
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

    const sql = `insert into employees (first_name, last_name, role, department, salary, manager) values (?,?,?,?,?,?,?)`;
    const params = [
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
                changes: result.affectedRows
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