const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'gondola.proxy.rlwy.net',
  user: 'root',
  password: 'HCAcRYAHXbkrdWKJgwuuZhTDuJpkIRNS',
  database: 'railway',
  port: 49586,
  waitForConnections: true,
  ssl: {
    rejectUnauthorized: false
  }
}).promise();

db.query('SELECT 1')
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.log('❌ DB Error:', err.message));

module.exports = db;