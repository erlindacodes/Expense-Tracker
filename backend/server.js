const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

// Test
app.get("/", (req, res) => {
    res.send("Serveri punon!");
});

// Merr shpenzimet
app.get("/expenses", (req, res) => {

    db.query("SELECT * FROM expenses", (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.json(results);

    });

});

// Shto shpenzim
app.post("/expenses", (req, res) => {

    const { title, amount, category, date } = req.body;

    const expenseDate = date || new Date().toISOString().split("T")[0];

    const sql = `
        INSERT INTO expenses (title, amount, category, date)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, amount, category, expenseDate],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }

            res.json({
                message: "Shpenzimi u shtua!",
                id: result.insertId
            });

        }
    );

});

// Fshi shpenzim
app.delete("/expenses/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM expenses WHERE id = ?",
        [id],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }

            res.json({
                message: "Shpenzimi u fshi!"
            });

        }
    );

});
// Fshi të gjitha shpenzimet
app.delete("/expenses", (req, res) => {

    const sql = "DELETE FROM expenses";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.json({
                message: "Të gjitha shpenzimet u fshinë!"
            });
        }

    });

});
// Ndrysho shpenzim
app.put("/expenses/:id", (req, res) => {

    const id = req.params.id;

    const { title, amount, category, date } = req.body;

    const expenseDate = date || new Date().toISOString().split("T")[0];

    const sql = `
        UPDATE expenses
        SET title = ?, amount = ?, category = ?, date = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, amount, category, expenseDate, id],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }

            res.json({
                message: "Shpenzimi u ndryshua!"
            });

        }
    );

});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveri u nis në portin ${PORT}`);
});