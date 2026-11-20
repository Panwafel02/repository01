# MB5 - Lista zadań CLI

Program do zarządzania listą zadań z poziomu terminala. Pozwala wyświetlać zadania, dodawać nowe i oznaczać je jako wykonane. Dane są zapisywane lokalnie w pliku `zadania.json` obok skryptów.

## Informacje o środowisku

- System: Windows
- Edytor: Visual Studio Code
- Język: JavaScript (ES modules)
- Node.js: 24.21.0

## Uruchomienie

Projekt nie wymaga instalowania dodatkowych pakietów. Otwórz terminal w katalogu projektu i użyj jednego ze skryptów npm poniżej.

## Struktura projektu

| Plik | Opis |
|---|---|
| `package.json` | konfiguracja projektu i skrypty npm |
| `.gitignore` | wyklucza lokalny plik z danymi |
| `app.js` | obsługa komend terminala |
| `magazyn.js` | odczyt i zapis pliku JSON |
| `zadania.json` | dane tworzone automatycznie przy pierwszym zapisie |

## Skrypty

| Polecenie | Działanie |
|---|---|
| `npm run lista` | wypisuje wszystkie zadania |
| `npm run dodaj -- "tekst"` | dodaje nowe zadanie |
| `npm run zrobione -- numer` | oznacza zadanie jako wykonane |

## Przykład

```text
> npm run dodaj -- "Kupić mleko"
Dodano zadanie nr 1: Kupić mleko

> npm run lista
1. [ ] Kupić mleko

> npm run zrobione -- 1
Zadanie nr 1 oznaczone jako zrobione: Kupić mleko
```

## Autor

[Imię i nazwisko], [klasa]
