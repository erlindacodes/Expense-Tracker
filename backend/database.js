const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "expense_tracker"
});

connection.connect((err) => {
    if (err) {
        console.log("Gabim ne lidhje me databazen");
    } else {
        console.log("U lidhem me databazen!");
    }
});

module.exports = connection;