# Serwer katalogu gier planszowych

Serwer Express udostępnia katalog gier planszowych, wyszukiwanie i statystyki. Dane katalogu są zapisane w pliku `dane.js`.

## Uruchomienie

W katalogu projektu zainstaluj zależności i uruchom serwer:

```bash
npm install
npm start
```

W trybie developerskim użyj `npm run dev`; serwer uruchomi się ponownie po zmianie plików.

## Struktura projektu

| Plik | Opis |
|---|---|
| `package.json` | konfiguracja projektu i skrypty npm |
| `package-lock.json` | dokładne wersje zależności |
| `.gitignore` | wyklucza katalog `node_modules` |
| `serwer.js` | trasy Express i uruchomienie serwera |
| `dane.js` | katalog gier planszowych |

## Trasy

| Metoda | Adres | Parametry | Działanie |
|---|---|---|---|
| GET | `/` | — | zwraca stronę powitalną z linkami |
| GET | `/gry` | — | zwraca pełny katalog w JSON |
| GET | `/gry/:id` | `id` w ścieżce | zwraca grę o podanym ID albo błąd 404 |
| GET | `/szukaj` | `wydawca`, `max`, `gracze` | filtruje gry; każdy parametr jest opcjonalny |
| GET | `/statystyki` | — | zwraca liczbę gier, średnią cenę i nazwę najdroższej gry |

## Autor

Panwafel0, klasa: [do uzupełnienia]
