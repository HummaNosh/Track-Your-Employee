const mysql = require('mysql2');

const dbOptions = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const connection = mysql.createConnection(dbOptions);

module.exports = connection;
