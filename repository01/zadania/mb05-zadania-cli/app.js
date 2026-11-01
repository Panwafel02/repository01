const [, , komenda, argument] = process.argv;
import { wczytaj, zapisz } from "./magazyn.js";


const pokazListe = async () => {
	const zadania = await wczytaj();

	if (zadania.length === 0) {
		console.log("Brak zadań.");
		return;
	}

	zadania.forEach(({ tekst, zrobione }, i) => {
		console.log(`${i + 1}. [${zrobione ? "x" : " "}] ${tekst}`);
	});
};

switch (komenda) {
	case "lista":
		await pokazListe();
		break;
}
