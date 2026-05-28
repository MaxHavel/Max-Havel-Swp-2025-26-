import ms from "npm:ms";

// === Demo: ms-Paket ===
document.querySelector<HTMLButtonElement>("#ms-button")!.addEventListener("click", () => {
  const input = document.querySelector<HTMLInputElement>("#ms-input")!.value;
  const result = ms(input);
  // ms gibt bereits einen String oder eine Zahl zurück
  document.querySelector<HTMLParagraphElement>("#ms-output")!.textContent = 
    typeof result === "number" ? result + " ms" : result;
});

// === Demo: async/await mit REST-Endpunkten ===
document.querySelector<HTMLButtonElement>("#fetch-essen")?.addEventListener("click", async () => {
  try {
    const response = await fetch("/essen");
    const data = await response.json();
    console.log("Essen-Daten:", data);
    document.querySelector<HTMLParagraphElement>("#async-output")!.textContent = 
      "Daten erhalten: " + JSON.stringify(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("async/await Fehler:", error.message);
      document.querySelector<HTMLParagraphElement>("#async-output")!.textContent = 
        "Fehler: " + error.message;
    }
  }
});

document.querySelector<HTMLButtonElement>("#fetch-hallo")?.addEventListener("click", async () => {
  try {
    const response = await fetch("/hallo");
    const data = await response.json();
    console.log("Hallo-Daten:", data);
    document.querySelector<HTMLParagraphElement>("#async-output")!.textContent = 
      "Antwort: " + JSON.stringify(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("async/await Fehler:", error.message);
      document.querySelector<HTMLParagraphElement>("#async-output")!.textContent = 
        "Fehler: " + error.message;
    }
  }
});