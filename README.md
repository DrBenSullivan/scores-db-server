# Scores-Db-Server

Scores-Db-Server is a simple Node.js server that communicates with a MySQL database.
It allows 2 inputs:
- `name` : A string of 3 uppercase alphabetic characters.
- `score` : An integer consisting of 1-3 numeric characters.

## Installation

Installation requires 2 steps: the creation of a MySQL database & to start the server in Node.js
### 1. MySQL

Using the MySQL CLI, login to MySQL

In the root directory, create the database, table & columns with the following commands:
```
CREATE DATABASE scores;
USE scores;
CREATE TABLE highscores (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(3) NOT NULL,
    score int(3) NOT NULL,
    date int NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Node.js
Ensuring the updated versions of node.js & npm are installed, move repository files to the root directory.

Edit the `PORT` variable in `./index.js` and the `connectionPool` variable in `./databaseConnection.js` to suit your requirements. 

And finally, in the root directory enter the following using the CLI:

```
npm install
node run start
```

Happy scoring!

## Usage

### Getting Highscores

A `GET` HTTP request to the server leads to a  database query. This returns a JSON containing the largest 10 `score` values, along with their respective `name` & `date`.

### Posting Highscores

A `POST` HTTP request allows the insertion of values into the database. 

The server is designed to allow the posting of `name` `score` only. Submitted values are verified before posting, allowing only:
- `name` values of exactly 3 uppercase alphabetic characters,
- `score` values of 1-3 numeric characters.

After posting, the server will query the database again to retrieve the `rank` of the posted values along with the `id`, `name`, `score` & `date` all of which are sent in JSON as HTTP response.

The `id` values are automatically-generated by the MySQL server using the `AUTO_INCREMENT` feature.

The `date` values are automatically-generated by the MySQL server as `TIMESTAMP` values.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[ISC](https://choosealicense.com/licenses/isc/)