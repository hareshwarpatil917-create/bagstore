const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sai@12345',  // ← your MySQL root password
  database: 'bagstore',
  waitForConnections: true
});

const db = pool.promise();

db.query('SELECT 1')
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.log('❌ DB Error:', err.message));

module.exports = db;