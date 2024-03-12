//Query database for top ten scores.
const queryTopScores = async (connection) => {
    console.log(`Retrieving topScores from database...`)
    return new Promise ((resolve, reject) => {
        connection.query (

            'SELECT name, score, date, RANK() OVER (ORDER BY score DESC) rank FROM highscores LIMIT 10',

            (error, results, fields) => {
            if (error) {
                reject(`Error getting highscores from database [queryTopScores]`)
            }
            resolve(results);
            }
        )
    })
}

const topTenQuery = async (connection, response) => {
    try {
        const results = await queryTopScores(connection);
        console.log(`Highscores successfully retrieved from database [queryTopSores]`);
        response.status(200).json({ success: `Highscores successfully retrieved`, results });
    } catch (queryError) {
        console.error(queryError);
        response.status(500).json({ error: `Internal server error... Please try again later` });
    }
}

module.exports = topTenQuery;