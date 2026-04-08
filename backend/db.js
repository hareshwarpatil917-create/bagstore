const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'gondola.proxy.rlwy.net',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'HCAcRYAHXbkrdWKJgwuuZhTDuJpkIRNS',
  database: process.env.DB_NAME || 'railway',
  port: process.env.DB_PORT || 49586,
  waitForConnections: true,
  ssl: { rejectUnauthorized: false }
});

const db = pool.promise();

db.query('SELECT 1')
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.log('❌ DB Error:', err.message));

module.exports = db;