const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  ssl: {
    rejectUnauthorized: false
  }
}).promise();

db.query('SELECT 1')
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.log('❌ DB Error:', err.message));

module.exports = db;