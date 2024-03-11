// Define function to post score to database.
const mysql = require("mysql2");

const insertScore = (connection, request, response) => {
    const body = request.body;

    // Validate name to ensure contains exactly 3 upper-case alphabetic characters.
    if (!/^[A-Z]{3}$/.test(body.name)) {
        return response.status(400).json({ message: `Bad request: Name must be exactly 3 upper-case alphabetic characters` });
    };

    connection.query(

        'INSERT INTO highscores ( name, score, date ) VALUES ( ? , ? , ? )',
        [ body.name , body.score , body.date ],

        function (postError, results, fields) {
            if (postError) {
                console.log(`Error adding highscore to database: ${postError}`);
                return response.status(500).json({ error: `Error adding highscore to database: ${postError}`});
            } else {

                const newId = results.insertId;

                connection.query(

                    'WITH scorerank AS ( SELECT * , RANK() OVER (ORDER BY score DESC) AS rank FROM highscores) SELECT * FROM scorerank WHERE id = ? ORDER BY rank',
                    [ newId ],
                    
                    function (rankError, entryWithRank, rankFields) {
                        if (rankError) {
                            console.log(`Error getting rank from database: ${rankError}`);
                            return response.status(500).json({ error: `Error getting rank from database: ${rankError}`});

                        } else {
                        response.status(201).json({ message: `Entry successfully added to database`, entry: entryWithRank, });
                        }
                    }
                );
            };
        }
    );
};

module.exports = insertScore;