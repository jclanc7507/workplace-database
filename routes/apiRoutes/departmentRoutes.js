const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const { route } = require('./employeeRoutes');

// GET for all departments
router.get('/departments', (req, res) => {
    const sql = `select * from departments`;

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

// GET a single department via ID
router.get('/department/:id', (req, res) => {
    const sql = `select * from departments where id = ?`;
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

// Creates a department
router.post('/department', ({ body }, res) => {
    const errors = inputCheck(
        body,
            'id',
            'name'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `insert into departments (id, name)`;
    const params = [
        body.id,
        body.name
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

// Delete a department
router.delete('/department/:id', (req, res) => {
    const sql = `delete from departments where id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'department deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.export = router;