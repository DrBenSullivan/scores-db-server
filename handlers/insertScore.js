const validateName = async (name) => {
    console.log(`Attempting to validate name: ${name}...`);
    if (!/^[A-Z]{3}$/.test(name)) {
        throw new Error(`Name ${name} is invalid`);
    }
}

const validateScore = async (score) => {
    console.log(`Attempting to validate score: ${score}...`)
    if (!/^[0-9]{1,3}$/.test(score)) {
        throw new Error(`Score ${score} is invalid`);
    }
}

const postToDatabase = async (connection, name, score) => {
    return new Promise((resolve, reject) => {
        connection.query(

            `INSERT INTO highscores 
            ( name , score ) 
            VALUES ( ? , ? )`,

            [ name , score ],

            (error, results, fields) => {
                if(error) {
                    reject (`Error posting highscore. [postToDatabase]`)
                }
                resolve({ id: results.insertId, name, score });
            }
        )
    })
}

const getRank = async (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query(

            `WITH scorerank 
            AS (SELECT *, 
                    RANK() OVER (ORDER BY score DESC) AS rank 
                FROM highscores)
            SELECT * 
            FROM scorerank
            WHERE id = ?
            ORDER BY rank
            LIMIT 1`,

            [ id ],

            (error, results, fields) => {
                if(error){
                    reject(`Error getting rank [getRank]`)
                }
                resolve(results)
            }
        )
    })
}

const insertScore = async (connection, request, response) => {
    const requestBody = request.body;
    console.log(requestBody);
    try {
        await validateName(requestBody.name);
        console.log(`Valid name submitted.`);
    } catch (nameValidationError) {
        console.error(`${nameValidationError} [validateName] ${requestBody.Name}`);
        response.status(400).json({
            error: `${nameValidationError}: Name must be exactly 3 upper-case alphabetic characters.`
        })
        return;
    }

    try {
        await validateScore(requestBody.score);
        console.log(`Valid score submitted.`);
    } catch (scoreValidationError) {
        console.error(`${scoreValidationError} [validateScore] ${requestBoy.score}`);
        response.status(400).json({
            error: `${scoreValidationError}: Score must contain a maximum of 3 numeric characters.`
        })
        return;
    }
    
    try {
        const postedValues = await postToDatabase(connection, requestBody.name, requestBody.score);
        console.log(`Entry successfully posted to database: ${JSON.stringify(postedValues)} [postToDatabase]`)
        const rankResults = await getRank(connection, postedValues.id );
        console.log(`Rank retrieved from database: Rank = ${JSON.stringify(rankResults[0])} [getRank]`);
        response.status(201).json({ 
            success: `Highscore successfully posted!`, rankResults });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: `Internal server error... Please try again later.`
        });
        return;
    }
}

module.exports = insertScore;


