import express from "express";
import { gry } from "./dane.js";

const app = express();

// GET / — strona powitalna z listą dostępnych adresów.
app.get("/", (req, res) => {
    res.send(`
        <h1>Katalog gier planszowych</h1>
        <ul>
            <li><a href="/gry">/gry</a> — wszystkie gry</li>
            <li><a href="/gry/1">/gry/:id</a> — jedna gra</li>
            <li><a href="/szukaj?max=150">/szukaj</a> — wyszukiwanie</li>
            <li><a href="/statystyki">/statystyki</a> — podsumowanie</li>
        </ul>
    `);
});

// GET /gry — pełna lista gier w formacie JSON.
app.get("/gry", (req, res) => {
    res.json(gry);
});

// GET /gry/:id — jedna gra po ID; zwraca 404, gdy jej nie ma.
app.get("/gry/:id", (req, res) => {
    const id = Number(req.params.id);
    const gra = gry.find((pozycja) => pozycja.id === id);

    if (!gra) {
        res.status(404).json({ blad: "Nie ma gry o takim numerze." });
        return;
    }

    res.json(gra);
});

// GET /szukaj — filtry query: wydawca, max i gracze; każdy parametr jest opcjonalny.
app.get("/szukaj", (req, res) => {
    const { wydawca, max, gracze } = req.query;
    let wynik = gry;

    if (wydawca !== undefined) {
        const szukanyWydawca = String(wydawca).toLowerCase();
        wynik = wynik.filter(
            (gra) => gra.wydawca.toLowerCase() === szukanyWydawca
        );
    }

    if (max !== undefined) {
        const maksymalnaCena = Number(max);
        wynik = wynik.filter((gra) => gra.cena <= maksymalnaCena);
    }

    if (gracze !== undefined) {
        const minimalnaLiczbaGraczy = Number(gracze);
        wynik = wynik.filter((gra) => gra.gracze >= minimalnaLiczbaGraczy);
    }

    res.json(wynik);
});

// GET /statystyki — liczba gier, średnia cena i nazwa najdroższej gry.
app.get("/statystyki", (req, res) => {
    const sumaCen = gry.reduce((suma, gra) => suma + gra.cena, 0);
    const sredniaCena = Math.round((sumaCen / gry.length) * 100) / 100;
    const najdrozsza = gry.reduce(
        (najlepsza, gra) => gra.cena > najlepsza.cena ? gra : najlepsza
    );

    res.json({
        liczbaGier: gry.length,
        sredniaCena,
        najdrozsza: najdrozsza.nazwa
    });
});

app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});
