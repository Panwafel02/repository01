import express from "express";
import { gry } from "./dane.js";

const app = express();

app.get("/gry", (req, res) => {
    res.json(gry);
});

app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});
