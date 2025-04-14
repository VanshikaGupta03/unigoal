require('dotenv').config();
const queryBuilder = require('node-querybuilder');
const mysql = require('mysql');

const settings = {
    "host": process.env.MYSQL_HOST,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DBNAME,
    "charset": 'utf8mb4',
    "dbcollat": 'utf8mb4_unicode_ci'
};

const connection = mysql.createConnection(settings);
connection.connect((err) => {
    if (err) throw err;
  console.log('Database is connected successfully!');
});

const qb = new queryBuilder(settings, 'mysql', 'single');

module.exports = {
  connection,
  qb,
}