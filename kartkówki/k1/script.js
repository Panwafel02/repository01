const produkty = [
    { nazwa: "Klawiatura", cena: 199, dostepny: true },
    { nazwa: "Myszka", cena: 89, dostepny: true },
    { nazwa: "Monitor", cena: 899, dostepny: false },
    { nazwa: "Słuchawki", cena: 249, dostepny: true },
    { nazwa: "Kamerka", cena: 159, dostepny: false },
    { nazwa: "Podkładka", cena: 45, dostepny: true }
];

const przefiltrowane = produkty.filter(p => p.cena < 300);

const budujListe = przefiltrowane => przefiltrowane.map(({
    nazwa, cena, dostepny
}) => `<li class="${dostepny ? 'wyrozniony' : ''}">${nazwa} - ${cena}zł</li>`).join('');
document.querySelector('#lista').innerHTML = budujListe(przefiltrowane);

const suma = przefiltrowane.reduce((suma, produkt) => suma + produkt.cena, 0);
document.querySelector('#podsumowanie').textContent = `Liczba produktów: ${przefiltrowane.length}. Łączna suma: ${suma} zł`; 