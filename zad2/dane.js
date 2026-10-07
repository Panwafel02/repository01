/**
 * Lista umiejętności prezentowanych na stronie.
 *
 * @type {Array<{nazwa: string, poziom: number, kategoria: string}>}
 */
export const umiejetnosci = [
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

export const ADRES_API = "https://jsonplaceholder.typicode.com/users";