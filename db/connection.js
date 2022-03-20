const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PCCid#121092',
  database: 'workplace'
});

module.exports = db;