/// <reference lib="dom" />

console.log("globalThis === window:", globalThis === window);
console.log("globalThis.document === document:", globalThis.document === document);
console.log("globalThis.fetch === fetch:", globalThis.fetch === fetch);

const url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/123.png";

const bilder: HTMLImageElement[] = [];

async function holePokemon() {
    const response = await globalThis.fetch(url);
    if (!response.ok) {
        throw new Error("Fehler beim Abrufen des Pokemons: " + response.status);
    }
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    const img = globalThis.document.createElement("img");
    img.src = imgUrl;
    globalThis.document.body.appendChild(img);
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