//Query database for top ten scores.
const mysql = require("mysql2");

const topTenQuery = (connection, response) => {
    connection.query(

        'SELECT name, score, date, RANK() OVER (ORDER BY score DESC) rank FROM highscores LIMIT 10',

        function (queryError, results, fields) {
            if (queryError) {
                console.log(`Error getting highscores from database: ${queryError}`);
                return response.status(500).json({ error: `Error getting highscores from database: ${queryError}`});
            }
            response.status(200).json(results);
        }
    );
}; 

module.exports = topTenQuery;