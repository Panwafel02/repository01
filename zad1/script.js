const umiejetnosci = [
 "HTML",
 "CSS",
 "JavaScript",
 "SQL",
 "Git",
 "Praca w zespole",
 "C#",
 "C++",
 "Python"
];

function pokazUmiejetnosci(lista) {
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

function pokazKomunikat(tresc, rodzaj) {
 komunikat.textContent = tresc;
 komunikat.classList.remove("blad", "sukces");
 komunikat.classList.add(rodzaj);
}

formularz.addEventListener("submit", function (event) {
 event.preventDefault();
 const imie = document.querySelector("#imie").value.trim();
 const email = document.querySelector("#email").value.trim();
 const temat = document.querySelector("#temat").value;
 const tresc = document.querySelector("#tresc").value.trim();
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
    "Dziękuję, " + imie + ". Wiadomość na temat „" + temat + "została przyjęta.","sukces"
 );
 console.log("Dane z formularza:", {
 imie: imie,
 email: email,
 temat: temat,
 tresc: tresc
 });
 formularz.reset();
});
