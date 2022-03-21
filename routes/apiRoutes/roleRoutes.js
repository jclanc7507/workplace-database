const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET for all roles
router.get('/roles', (req, res) => {
    const sql = `select * from roles`;

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

// Create a role
router.post('/role', ({ body }, res) => {
    const errors = inputCheck(
        body,
            'id',
            'title',
            'department',
            'salary'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `insert into roles (id, title, department, salary)`;
    const params = [
        body.id,
        body.title,
        body.department,
        body.salary
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

// Delete a role
router.delete('/role/:id', (req, res) => {
    const sql = `delete from roles where id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: 'role deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;