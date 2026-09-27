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

const budujListe = (lista) =>
    lista
        .map(({ nazwa, poziom }) => `
            <li>
                <span class="nazwa">${nazwa}</span>
                <span class="poziom" title="Poziom ${poziom} z 5">${"●".repeat(poziom)}${"○".repeat(5 - poziom)}</span>
            </li>
        `)
        .join("");

const filtrujPoKategorii = (lista, kategoria) =>
    kategoria === "wszystkie"
        ? [...lista]
        : lista.filter((umiejetnosc) => umiejetnosc.kategoria === kategoria);

const sredniPoziom = (lista) => {
    if (lista.length === 0) {
        return 0;
    }

    const suma = lista.reduce((razem, { poziom }) => razem + poziom, 0);
    return Math.round((suma / lista.length) * 10) / 10;
};

const podsumowanie = (lista) =>
    lista.length === 0
        ? "Brak umiejętności w tej kategorii."
        : `Umiejętności: ${lista.length} · średni poziom: ${sredniPoziom(lista)}`;

const listaEl = document.querySelector("#lista-umiejetnosci");
const podsumowanieEl = document.querySelector("#podsumowanie");
const filtryEl = document.querySelector("#filtry");

const pokazUmiejetnosci = (kategoria = "wszystkie") => {
    const wybrane = filtrujPoKategorii(umiejetnosci, kategoria);
    listaEl.innerHTML = budujListe(wybrane);
    podsumowanieEl.textContent = podsumowanie(wybrane);
};

filtryEl.addEventListener("click", (event) => {
    const przyciskFiltra = event.target.closest("button");

    if (!przyciskFiltra) {
        return;
    }

    filtryEl
        .querySelectorAll("button")
        .forEach((element) => element.classList.remove("aktywny"));

    przyciskFiltra.classList.add("aktywny");
    pokazUmiejetnosci(przyciskFiltra.dataset.kategoria);
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
    const { imie, email, temat } = dane;

    if (imie.trim() === "") {
        pokazKomunikat("Podaj imię.", "blad");
        return;
    }

    if (email.trim() === "") {
        pokazKomunikat("Podaj adres e-mail.", "blad");
        return;
    }

    if (temat === "") {
        pokazKomunikat("Wybierz temat wiadomości.", "blad");
        return;
    }

    pokazKomunikat(
        `Dziękuję, ${imie}. Wiadomość na temat „${temat}” została przyjęta.`,
        "sukces"
    );

    console.log("Dane z formularza:", dane);
    formularz.reset();
});

const przycisk = document.querySelector("#przelacznik-motywu");

przycisk.addEventListener("click", () => {
    const jestCiemny = document.body.classList.toggle("ciemny");
    przycisk.textContent = jestCiemny ? "Jasny motyw" : "Ciemny motyw";
});
