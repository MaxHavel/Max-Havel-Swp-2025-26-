/// <reference lib="dom" />

const url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/123.png";

const bilder: HTMLImageElement[] = [];

async function holePokemon() {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Fehler beim Abrufen des Pokemons: " + response.status);
    }
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = imgUrl;
    document.body.appendChild(img);
    bilder.push(img);
}

document.getElementById("hole-essen")?.addEventListener("click", async () => {
    try {
        await holePokemon();
        console.log("wirft wurde aufgerufen");
    } catch (e) {
        if (e instanceof Error) {
            console.log("Fehler aufgetreten: ", e.message);
        } else {
            console.log("Fehler aufgetreten: ", e);
        }
    } finally {
        console.log("IMMER");
    }
});

document.getElementById("loesche-essen")?.addEventListener("click", () => {
    bilder.forEach((img) => img.remove());
    bilder.length = 0;
});