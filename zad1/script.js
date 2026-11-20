const umiejetnosci = [
  { nazwa: "HTML", poziom: 3, kategoria: "frontend" },
  { nazwa: "CSS", poziom: 3, kategoria: "frontend" },
  { nazwa: "JavaScript", poziom: 3, kategoria: "frontend" },
  { nazwa: "SQL", poziom: 2, kategoria: "backend" },
  { nazwa: "Git", poziom: 3, kategoria: "narzedzia" },
  { nazwa: "Praca w zespole", poziom: 3, kategoria: "miekkie" },
  { nazwa: "C#", poziom: 2, kategoria: "backend" },
  { nazwa: "C++", poziom: 2, kategoria: "backend" },
  { nazwa: "Python", poziom: 3, kategoria: "backend" }
];

const pokazUmiejetnosci = (lista) => {
   const kontener = document.querySelector("#lista-umiejetnosci");
   for (const nazwa of lista) {
   const element = document.createElement("li");
   element.textContent = nazwa;
   kontener.appendChild(element);
   }
}
pokazUmiejetnosci(umiejetnosci);

const formularz = document.querySelector("#formularz-kontakt");
const komunikat = document.querySelector("#komunikat");

const pokazKomunikat = (tresc, rodzaj) => {
   komunikat.textContent = tresc;
   komunikat.classList.remove("blad", "sukces");
   komunikat.classList.add(rodzaj);
}

formularz.addEventListener("submit", function (event) {
   event.preventDefault();
   const dane = Object.fromEntries(new FormData(formularz));
   const { imie, email, temat } = dane;

   if (imie === "") {
      pokazKomunikat("Podaj imię.", "blad");
      return;
   }
   if (email === "") {
      pokazKomunikat("Podaj adres e-mail.", "blad");
      return;
   }
   if (temat === "") {
      pokazKomunikat("Wybierz temat wiadomości.", "blad");
      return;
   }
   pokazKomunikat(
      `Dziękuję, ${imie}. Wiadomość na temat „${temat}” została przyjęta., sukces`
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
przycisk.addEventListener("click", function () {
   const jestCiemny = document.body.classList.toggle("ciemny");
   if (jestCiemny) {
   przycisk.textContent = "Jasny motyw";
   } else {
   przycisk.textContent = "Ciemny motyw";
   }
});