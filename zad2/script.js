import { umiejetnosci, ADRES_API } from "./dane.js";
import { budujListe, filtrujPoKategorii, podsumowanie } from "./umiejetnosci.js";

const listaEl = document.querySelector("#lista-umiejetnosci");
const podsumowanieEl = document.querySelector("#podsumowanie");
const filtryEl = document.querySelector("#filtry");

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