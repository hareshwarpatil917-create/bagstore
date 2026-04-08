const mysql = require('mysql2');

const connectionString = process.env.MYSQL_PUBLIC_URL;

let pool;

if (connectionString) {
  pool = mysql.createPool(connectionString + '?ssl={"rejectUnauthorized":false}');
} else {
  pool = mysql.createPool({
    host: 'gondola.proxy.rlwy.net',
    user: 'root',
    password: 'HCAcRYAHXbkrdWKJgwuuZhTDuJpkIRNS',
    database: 'railway',
    port: 49586,
    waitForConnections: true,
    ssl: { rejectUnauthorized: false }
  });
}

const db = pool.promise();

db.query('SELECT 1')
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.log('❌ DB Error:', err.message));