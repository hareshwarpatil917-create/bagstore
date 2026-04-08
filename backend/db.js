const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
}).promise();

// 🔥 Debug log
db.query('SELECT 1')
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.log('❌ DB ERROR:', err.message));

module.exports = db;