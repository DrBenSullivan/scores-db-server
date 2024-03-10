//Import required modules.
const http = require("http");
const express = require("express");
const establishConnectionPool = require("./database");
const topTenQuery = require("./handlers/topTenQuery");
const insertScore = require("./handlers/insertScore");

//Instatiate server & express and establish connection pool to database.
const app = express();
const server = http.createServer(app);
establishConnectionPool;

//Body-parser and routers.
app.use(express.json());
app.get("/", function(request, response){ topTenQuery;});
app.post("/", function(request, response){ insertScore;});

//Listen on PORT.
const PORT = process.env.PORT || 5000;
server.listen(PORT);
console.log(`Server is listening on port: ${PORT}`);