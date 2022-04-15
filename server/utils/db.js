const { createPool } = require('mysql2');

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};
