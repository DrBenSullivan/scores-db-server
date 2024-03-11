// Database connection pool details.
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "highscores",
    connectionLimit: 4,
});

module.exports = pool;