const mysql = require("mysql2");
//connect the DB
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '0Bother!!',
        database: 'election'
    },
    console.log('Connected to the election database')
);

module.exports = db;