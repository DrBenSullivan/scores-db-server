// Import required modules.
const http = require("http");
const express = require("express");
const connection = require("./database");
const topTenQuery = require("./handlers/topTenQuery");
const insertScore = require("./handlers/insertScore");
const PORT = process.env.PORT || 5000;

// Initialise server.
const app = express();
const server = http.createServer(app);

// Connect to database using asynchronous callback function.
connection.getConnection((connectionError) => {
    if (connectionError) {
        console.error(`Database connection failed: ${connectionError}`); 
    } else {

        // Body parser and routers.
        app.use(express.json());
        app.get("/", function(request, response) {
            topTenQuery(connection, response);
        });
        app.post("/", function(request, response) {
            insertScore(connection, request, response);
        });

        // Start server.
        server.listen(PORT);
        console.log(`Server is listening on port ${PORT}`);
    }
});