const mysql = require('mysql2');

const db = mysql.createPool({
  uri: 'mysql://root:HCAcRYAHXbkrdWKJgwuuZhTDuJpkIRNS@gondola.proxy.rlwy.net:49586/railway',
  waitForConnections: true,
  ssl: { rejectUnauthorized: false }
}).promise();

module.exports = db;