const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'gondola.proxy.rlwy.net',
  user: 'root',
  password: 'HCAcRYAHXbkrdWKJgwuuZhTDuJpkIRNS',
  database: 'railway',
  port: 49586,
  waitForConnections: true,
  ssl: { rejectUnauthorized: false }
}).promise();

module.exports = db;