// Import required modules.
const http = require("http");
const express = require("express");
const { connectionPool , establishConnectionPool } = require("./databaseConnection");
const topTenQuery = require("./handlers/topTenQuery");
const insertScore = require("./handlers/insertScore");
const PORT = process.env.PORT || 5000;

// Initialise server.
const app = express();
app.use(express.json());
const server = http.createServer(app);
establishConnectionPool().then( () => {
    app.get("/", ((request, response) => {topTenQuery(connectionPool, response)}));
    app.post("/", ((request, response) => {insertScore(connectionPool, request, response)}));
    server.listen(PORT);
    console.log(`Server is listening on port ${PORT}`);
});