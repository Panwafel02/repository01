# Katalog gier planszowych MB7

Serwer Express udostępnia katalog gier, filtrowanie, statystyki i stronę powitalną.

## Uruchomienie

W katalogu projektu zainstaluj zależności i uruchom serwer:

```bash
npm install
npm start
```

W trybie developerskim uruchom `npm run dev`.

## Struktura projektu

| Plik lub katalog | Opis |
|---|---|
| `package.json` | nazwa projektu, zależności i skrypty npm |
| `.gitignore` | wyklucza `node_modules` |
| `serwer.js` | middleware, trasy i uruchomienie serwera |
| `dane.js` | katalog gier |
| `trasy/gry.js` | router `/gry` i `/gry/:id` |
| `public/index.html` | strona powitalna |
| `public/styl.css` | wygląd strony powitalnej |
| `zapytania.http` | przykładowe żądania POST `/echo` |

## Trasy

| Metoda | Adres | Działanie |
|---|---|---|
| GET | `/` | strona powitalna z plików statycznych |
| GET | `/gry` | pełny katalog w JSON |
| GET | `/gry/:id` | gra o podanym ID albo JSON 404 |
| GET | `/szukaj?wydawca=&max=&gracze=` | filtrowanie katalogu; parametry są opcjonalne |
| GET | `/statystyki` | liczba gier, średnia cena, najdroższa gra i czas wygenerowania |
| POST | `/echo` | zwraca treść żądania w JSON |
| GET | `/blad` | zgłasza testowy błąd serwera |

## Middleware

| Middleware | Działanie |
|---|---|
| `logger` | loguje żądania i dodaje `req.czasZadania` |
| `express.json` | odczytuje treść żądania JSON |
| `express.urlencoded` | odczytuje treść formularza |
| `express.static` | wysyła pliki z katalogu `public` |

## Obsługa błędów

Nieznana strona zwraca status 404 i tekst HTML. Nieznana trasa z danymi zwraca status 404 i JSON. Błąd w trasie, na przykład `/blad`, zwraca status 500 i `{"blad":"Błąd serwera"}`; szczegóły są logowane w terminalu.

## Autor

Aleksander Nowaczyk, klasa: 4P1T
