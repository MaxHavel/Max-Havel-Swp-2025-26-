import ms from "npm:ms";

// === Demo 1: ms-Paket Funktionalität ===
document.querySelector<HTMLButtonElement>("#ms-button")?.addEventListener("click", () => {
  try {
    const input = document.querySelector<HTMLInputElement>("#ms-input")?.value;
    
    if (!input || input.trim().length === 0) {
      document.querySelector<HTMLParagraphElement>("#ms-output")!.textContent = 
        "❌ Fehler: Bitte eine Zeitangabe eingeben (z.B. '1h', '30m', '2 days')";
      return;
    }

    const result = ms(input);
    
    if (result === undefined) {
      document.querySelector<HTMLParagraphElement>("#ms-output")!.textContent = 
        "❌ Fehler: Ungültige Zeitangabe. Beispiele: '1h', '30m', '2 days', '5000ms'";
    } else {
      const formatted = typeof result === "number" 
        ? `✓ ${input} = ${result.toLocaleString()} Millisekunden`
        : `✓ ${input} = ${result}`;
      
      document.querySelector<HTMLParagraphElement>("#ms-output")!.textContent = formatted;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    document.querySelector<HTMLParagraphElement>("#ms-output")!.textContent = 
      `❌ Fehler beim Parsen: ${message}`;
  }
});

// === Demo 2a: async/await mit /hallo Endpoint ===
document.querySelector<HTMLButtonElement>("#fetch-hallo")?.addEventListener("click", async () => {
  const output = document.querySelector<HTMLParagraphElement>("#async-output")!;
  output.textContent = "⏳ Laden...";
  
  try {
    const response = await fetch("/hallo");
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    output.textContent = `✓ GET /hallo erfolgreich:\n${JSON.stringify(data, null, 2)}`;
    console.log("Hallo-Daten:", data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    output.textContent = `❌ Fehler beim Abrufen von /hallo:\n${message}`;
    console.error("Fehler:", error);
  }
});

// === Demo 2b: async/await mit /essen Endpoint ===
document.querySelector<HTMLButtonElement>("#fetch-essen")?.addEventListener("click", async () => {
  const output = document.querySelector<HTMLParagraphElement>("#async-output")!;
  output.textContent = "⏳ Laden...";
  
  try {
    const response = await fetch("/essen");
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data)) {
      output.textContent = `✓ GET /essen erfolgreich:\n${data.length} Einträge gefunden\n\n${JSON.stringify(data, null, 2)}`;
    } else if (typeof data === "object" && data !== null) {
      output.textContent = `✓ GET /essen erfolgreich:\n${JSON.stringify(data, null, 2)}`;
    } else {
      output.textContent = `✓ GET /essen erfolgreich:\n${data}`;
    }
    
    console.log("Essen-Daten:", data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    output.textContent = `❌ Fehler beim Abrufen von /essen:\n${message}`;
    console.error("Fehler:", error);
  }
});

// === Demo 3a: Essen laden und in Tabelle anzeigen ===
document.querySelector<HTMLButtonElement>("#hole-essen")?.addEventListener("click", async () => {
  try {
    const response = await fetch("/essen");
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const tbody = document.querySelector<HTMLTableSectionElement>("#tabelle")!;
    tbody.innerHTML = "";
    
    // Handle verschiedene Response-Formate
    const rows = Array.isArray(data) ? data : (data?.data ? data.data : []);
    
    if (rows.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = '<td colspan="2" style="text-align: center; color: #999;">Keine Daten verfügbar</td>';
      tbody.appendChild(tr);
      return;
    }
    
    for (const row of rows) {
      const tr = document.createElement("tr");
      const name = typeof row === "object" && row !== null && "name" in row ? (row as any).name : String(row);
      const essen = typeof row === "object" && row !== null && "essen" in row ? (row as any).essen : "N/A";
      tr.innerHTML = `<td>${name}</td><td>${essen}</td>`;
      tbody.appendChild(tr);
    }
    
    console.log("Essen geladen:", rows);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Fehler beim Laden:", message);
    
    const tbody = document.querySelector<HTMLTableSectionElement>("#tabelle")!;
    tbody.innerHTML = `<tr><td colspan="2" style="color: red;">Fehler: ${message}</td></tr>`;
  }
});

// === Demo 3b: Tabelle löschen ===
document.querySelector<HTMLButtonElement>("#loesche-essen")?.addEventListener("click", () => {
  const tbody = document.querySelector<HTMLTableSectionElement>("#tabelle")!;
  tbody.innerHTML = "";
  console.log("Tabelle geleert");
});

console.log("TypeScript wurde erfolgreich transpiliert und geladen!");