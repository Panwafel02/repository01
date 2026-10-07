/**
 * Zwraca umiejętności należące do wskazanej kategorii.
 *
 * @param {Array<Object>} lista - pełna lista umiejętności
 * @param {string} kategoria - nazwa kategorii albo "wszystkie"
 * @returns {Array<Object>} nowa tablica; pusta, gdy nic nie pasuje
 */
export const filtrujPoKategorii = (lista, kategoria) =>
    kategoria === "wszystkie"
        ? [...lista]
        : lista.filter(u => u.kategoria === kategoria);

/**
 * Oblicza średni poziom umiejętności z listy.
 *
 * @param {Array<Object>} lista - lista umiejętności
 * @returns {number} średni poziom zaokrąglony do 1 miejsca po przecinku; 0 dla pustej listy
 */
export const sredniPoziom = (lista) => {
    if (lista.length === 0) {
        return 0;
    }

    const suma = lista.reduce((razem, { poziom }) => razem + poziom, 0);
    return Math.round((suma / lista.length) * 10) / 10;
};

/**
 * Zwraca napis z podsumowaniem listy umiejętności.
 *
 * @param {Array<Object>} lista - lista umiejętności
 * @returns {string} opis z liczbą i średnim poziomem albo informacja o braku
 */
export const podsumowanie = (lista) =>
    lista.length === 0
        ? "Brak umiejętności w tej kategorii."
        : `Umiejętności: ${lista.length} · średni poziom: ${sredniPoziom(lista)}`;

/**
 * Buduje HTML listy umiejętności jako napis.
 *
 * @param {Array<Object>} lista - lista umiejętności
 * @returns {string} fragment HTML z elementami li
 */
export const budujListe = (lista) =>
    lista
        .map(({ nazwa, poziom }) => `
            <li>
                <span class="nazwa">${nazwa}</span>
                <span class="poziom" title="Poziom ${poziom} z 5">${"●".repeat(poziom)}${"○".repeat(5 - poziom)}</span>
            </li>
        `)
        .join("");