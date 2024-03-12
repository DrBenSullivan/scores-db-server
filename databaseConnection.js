const mysql = require("mysql2");

// Database connection pool details.
const connectionPool = mysql.createPool({
    host: "xxx", // EDIT TO SUIT YOUR REQUIREMENTS
    user: "xxx", // EDIT TO SUIT YOUR REQUIREMENTS
    password: "xxx", // EDIT TO SUIT YOUR REQUIREMENTS
    database: "scores",
    connectionLimit: 4,
});

// Connect to database using asynchronously.
exports.establishConnectionPool = () => {
    return new Promise ((resolve, reject) => {
        connectionPool.getConnection((connectionError) => {
            if (connectionError) {
                console.error(`Database connection failed: ${connectionError}`);
                reject(`Database connection failed: ${connectionError}`);
            } else {
                console.log(`Database connection pool established`);
                resolve();
            }
        });
    })
}

exports.connectionPool = connectionPool;