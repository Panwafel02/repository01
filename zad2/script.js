import { umiejetnosci, ADRES_API } from "./dane.js";
import { budujListe, filtrujPoKategorii, podsumowanie } from "./umiejetnosci.js";

const listaEl = document.querySelector("#lista-umiejetnosci");
const podsumowanieEl = document.querySelector("#podsumowanie");
const filtryEl = document.querySelector("#filtry");

/**
 * Wyświetla przefiltrowaną listę umiejętności i podsumowanie.
 *
 * @param {string} kategoria - nazwa kategorii lub "wszystkie"
 * @returns {void}
 */
const pokazUmiejetnosci = (kategoria = "wszystkie") => {
   const wybrane = filtrujPoKategorii(umiejetnosci, kategoria);

   listaEl.innerHTML = budujListe(wybrane);
   podsumowanieEl.textContent = podsumowanie(wybrane);
};

filtryEl.addEventListener("click", (event) => {
   const przycisk = event.target.closest("button");

   if (!przycisk) {
      return;
   }

   filtryEl.querySelectorAll("button").forEach(b => b.classList.remove("aktywny"));
   przycisk.classList.add("aktywny");

   pokazUmiejetnosci(przycisk.dataset.kategoria);
});

pokazUmiejetnosci();

const formularz = document.querySelector("#formularz-kontakt");
const komunikat = document.querySelector("#komunikat");

/**
 * Wyświetla komunikat dla użytkownika.
 *
 * @param {string} tresc - tekst komunikatu
 * @param {string} rodzaj - klasa CSS ("blad" lub "sukces")
 * @returns {void}
 */
const pokazKomunikat = (tresc, rodzaj) => {
   komunikat.textContent = tresc;
   komunikat.classList.remove("blad", "sukces");
   komunikat.classList.add(rodzaj);
};

formularz.addEventListener("submit", (event) => {
   event.preventDefault();
   const dane = Object.fromEntries(new FormData(formularz));
   const { imie, email, temat, tresc } = dane;

   if (imie.trim() === "") {
      pokazKomunikat("Podaj imię.", "blad");
      return;
   }
   if (email.trim() === "") {
      pokazKomunikat("Podaj adres e-mail.", "blad");
      return;
   }
   if (temat.trim() === "") {
      pokazKomunikat("Wybierz temat wiadomości.", "blad");
      return;
   }
   pokazKomunikat(
       `Dziękuję, ${imie}. Wiadomość na temat „${temat}” została przyjęta.`,
       "sukces"
   );
   console.log("Dane z formularza:", {
      imie: imie,
      email: email,
      temat: temat,
      tresc: tresc
   });
   formularz.reset();
});

const przycisk = document.querySelector("#przelacznik-motywu");
przycisk.addEventListener("click", () => {
   const jestCiemny = document.body.classList.toggle("ciemny");
   przycisk.textContent = jestCiemny ? "Jasny motyw" : "Ciemny motyw";
});

const inspiracjeEl = document.querySelector("#inspiracje");

/**
 * Pobiera listę użytkowników z publicznego API.
 *
 * @param {string} adres - pełny adres zasobu
 * @returns {Promise<Array<Object>>} tablica użytkowników
 * @throws {Error} gdy serwer odpowie statusem innym niż 2xx
 */
const pobierzUzytkownikow = async (adres) => {
   const odpowiedz = await fetch(adres);

   if (!odpowiedz.ok) {
      throw new Error(`Serwer odpowiedział: ${odpowiedz.status}`);
   }

   return odpowiedz.json();
};

/**
 * Pobiera i wyświetla sekcję Inspiracje z API.
 *
 * @returns {Promise<void>}
 */
const pokazInspiracje = async () => {
   inspiracjeEl.innerHTML = `<p class="ladowanie">Ładowanie…</p>`;

   try {
      const uzytkownicy = await pobierzUzytkownikow(ADRES_API);

      inspiracjeEl.innerHTML = `
            <ul class="osoby">
                ${uzytkownicy
          .map(({ name, address }) => `
                        <li>
                            <strong>${name}</strong>
                            <span>${address.city}</span>
                        </li>
                    `)
          .join("")}
            </ul>
        `;
   } catch (blad) {
      console.error("Nie udało się pobrać danych:", blad.message);
      inspiracjeEl.innerHTML = `
            <p class="blad">
                Nie udało się pobrać danych z serwera. Sprawdź połączenie
                z internetem i odśwież stronę.
            </p>
        `;
   }
};

pokazInspiracje();