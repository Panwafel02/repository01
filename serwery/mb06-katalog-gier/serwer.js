import express from "express";

const app = express();

app.get("/gry", (req, res) => {
    res.send("Katalog gier planszowych");
});

app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});
