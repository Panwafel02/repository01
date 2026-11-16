import express from "express";
import path from "node:path";
import { gry } from "./dane.js";

const app = express();

/**
* Loguje każde żądanie w terminalu: godzina, metoda i adres.
* Dodaje do żądania pole `req.czasZadania` (godzina w formacie
HH:MM:SS),
* z którego korzysta trasa /statystyki.
*/
const logger = (req, res, next) => {
    req.czasZadania = new Date().toLocaleTimeString("pl-PL");
    console.log(`[${req.czasZadania}] ${req.method} ${req.url}`);
    next();
};

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));


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
/** POST /echo — odsyła otrzymane dane. */
app.post("/echo", (req, res) => {
    console.log(req.body);
    res.json({ odebrano: req.body });
});
app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});
