# Zusammenfassung: 2AHWII Unterrichtseinheiten

**Zeitraum:** 23.02.2026 - 27.04.2026

---

## 1. Einheit: Hono mit SQL (23.02.2026)

### Lernziel
Verwendung von Hono als Web-Framework in Deno, um REST-APIs zu erstellen und mit SQLite-Datenbanken zu arbeiten.

### Konzepte
- **REST API HTTP-Methoden:** `GET`, `POST`, `PUT/PATCH`, `DELETE`
- **Hono Framework:** Web-Framework für Deno
- **SQLite:** Datenbank über `@db/sqlite`, `db.prepare()` für SQL-Abfragen mit JOINs
- **Statische Dateien:** Middleware `serveStatic` mit Wildcard-Pfad `/*`

### Code-Beispiele

**main.ts:**
```typescript
import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { getLieblinge } from "./db.ts";

const app = new Hono();
app.use("/*", serveStatic({ root: "./static" }));
app.get("/lieblinge", (c) => c.json(getLieblinge()));
Deno.serve(app.fetch);
```

**db.ts:**
```typescript
import { Database } from "@db/sqlite";
export const db = new Database("lieblingsessen.db");

const lieblinge_stmt = db.prepare(
    "select person.name, essen.essen from person join essen on person.id_lieblingsessen = essen.id order by essen;",
);

export function getLieblinge() {
    return lieblinge_stmt.all() as { name: string; essen: string }[];
}
```

### Befehle
- `deno run --watch main.ts` - Server starten
- `deno run -A main.ts` - Server starten mit allen Berechtigungen

---

## 2. Einheit: Button Fetch Übung (02.03.2026)

### Lernziel
Daten von einer REST-API mit der Fetch-API (Client-seitig) abrufen und dynamisch in eine HTML-Tabelle einfügen.

### Konzepte
- **Fetch API:** `fetch()`, gibt Promise zurück, mit `.then()` und `.catch()` nutzen
- **Response handling:** `response.json()` zum Parsen
- **DOM-Manipulation:** `document.getElementById()`, `querySelector("#id")`
- **Event Listener:** `addEventListener("click", fn)`

### Code-Beispiele

**Backend (main.ts):**
```typescript
import { Context, Hono } from "hono";
import { serveStatic } from "hono/deno";
import { Database } from "sqlite";

const app = new Hono();
const db = new Database("lieblingsessen.db");

app.use("/*", serveStatic({ root: "./static" }));

app.get("/essen", (c: Context) => {
  const rows = db.prepare(`
    SELECT person.name, essen.essen
    FROM person
    JOIN essen ON person.lieblingsessen = essen.id
  `).all();
  return c.json(rows);
});

Deno.serve(app.fetch);
```

**Frontend (script.js):**
```javascript
function holeEssen() {
  fetch("/essens")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((eintrag) => {
        html += `<tr><td>${eintrag.name}</td><td>${eintrag.essen}</td></tr>`;
      });
      document.getElementById("tabelle").innerHTML = html;
    })
    .catch((error) => console.error("Fehler:", error));
}
```

---

## 3. Einheit: Promises (09.03.2026)

### Lernziel
Verständnis von Promises in JavaScript/TypeScript.

### Konzepte
- **Promise-Objekt:** Repräsentiert einen asynchronen Wert
- **Promise-Status:** pending, fulfilled, rejected
- **Promise-Executor:** Funktion mit `resolve` und `reject` Parametern
- **Fehlerbehandlung:** `.catch()` und `.then(errorCase)`
- **Mehrere Promises:** `Promise.all()`, `Promise.race()`, `Promise.allSettled()`

### Wichtige Regeln
- Ein throw im Promise-Executor wird automatisch zu `reject()`
- Nach `resolve()` hat ein throw keine Wirkung mehr
- Nach `reject()` hat ein `resolve()` keine Wirkung mehr
- Ein `throw` in einer async-Funktion entspricht einem `reject()`

---

## 4. Einheit: Transpile (16.03.2026)

### Lernziel
TypeScript-Dateien im Browser ausführen durch Transpilierung mit Deno.bundle().

### Konzepte
- **TypeScript im Browser:** Direkt im Browser laufen lassen via Transpiling
- **Deno.bundle():** TypeScript zu JavaScript bündeln
- **ESM-Format:** `format: "esm"` für moderne Module
- **Globale Variablen:** `globalThis` als einheitlicher Zugriff (Browser = window, Node = global)
- **Export/Import:** `export` und `import` in TypeScript

### Code-Beispiele

**main.ts (Transpile-Server):**
```typescript
app.get("/:path{.+\\.ts$}", async (c) => {
    const filePath = `./src/${c.req.param("path")}`;
    const result = await Deno.bundle({
        entrypoints: [filePath],
        platform: "browser",
        minify: !isDev,
        write: false,
        format: "esm",
    });
    if (!result.success) throw new Error("Bundling failed");
    const jsFile = result.outputFiles?.find((f) => typeof f.text === "function");
    const js = jsFile?.text();
    return c.body(js, 200, {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": isDev ? "no-cache" : "public, max-age=31536000",
    });
});
```

**src/script.ts:**
```typescript
import { holeEssen, loescheEssen } from "./essen.ts";

type EssenGlobals = typeof globalThis & {
    holeEssen: typeof holeEssen;
    loescheEssen: typeof loescheEssen;
};

const globals = globalThis as EssenGlobals;
globals.holeEssen = holeEssen;
globals.loescheEssen = loescheEssen;

document.getElementById("hole-essen")?.addEventListener("click", holeEssen);
document.getElementById("loesche-essen")?.addEventListener("click", loescheEssen);
```

**src/essen.ts:**
```typescript
import { concat } from "@std/bytes";

export type EssenEintrag = { name: string; essen: string };

export async function holeEssen(): Promise<void> {
    try {
        const response = await fetch("/essen");
        const daten = await response.json() as EssenEintrag[];
        const tabelle = document.getElementById("tabelle");
        if (!tabelle) throw new Error("Element not found");
        tabelle.innerHTML = createTabellenMarkup(daten);
    } catch (error) {
        console.info("Fehler beim Laden der Daten", error);
    }
}

export function loescheEssen(): void {
    const tabelle = document.getElementById("tabelle");
    if (!tabelle) throw new Error("Element not found");
    tabelle.innerHTML = "";
}
```

---

## 5. Einheit: Await (13.04.2026)

### Lernziel
Async/Await in TypeScript verstehen und anwenden.

### Konzepte
- **async/await:** Syntaktischer Zucker über Promises
- **try/catch:** Fehlerbehandlung bei async Operationen
- **finally:** Code der immer ausgeführt wird
- **Blob/URL.createObjectURL():** Binärdaten als Bild im Browser anzeigen

### Code-Beispiele

**src/script.ts:**
```typescript
/// <reference lib="dom" />

const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/female/123.png";

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
}

try {
    await holePokemon();
    console.log("Pokemon wurde geladen");
} catch (e) {
    if (e instanceof Error) {
        console.log("Fehler aufgetreten: ", e.message);
    }
} finally {
    console.log("IMMER");
}
```

### Befehle
- `/// <reference lib="dom" />` - TypeScript Typdefinitionen für DOM hinzufügen

---

## 6. Einheit: Freie KI-Provider (20.04.2026)

### Themen
- Übersicht über freie/opensource KI-Provider und Modelle
- API-Zugriff auf KI-Dienste
- Nvidia als Hardware-Anbieter für KI

---

## 7. Einheit: Übung Promises (27.04.2026)

### Lernziel
Vertiefung von Promises, Exceptions und globalThis-Typisierung.

### Konzepte

**globalThis Typisierung:**
```typescript
interface AppConfig {
    apiUrl: string;
    maxRetries: number;
    debug: boolean;
}

declare global {
    var appConfig: AppConfig;
    var _retryCount: number;
}
```

**Unterschiede Browser vs. Node.js:**
- `window` → Browser
- `document` → Browser
- `process` → Node.js
- `console` → Beides
- `Buffer` → Node.js
- `setTimeout` → Beides
- `fetch` → Beides

### Aufgabe: withRetry Funktion
```typescript
function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3
): Promise<T> {
    // Implementierung: bei Exception bis maxRetries-mal erneut versuchen
    // globalThis.__retryCount speichert die Anzahl der Versuche
}
```

**Wichtige Regeln:**
1. Ein `throw` in einer async-Funktion entspricht einem `reject()`
2. Nach `resolve()` hat ein `throw` keine Wirkung mehr
3. Nach `reject()` hat ein `resolve()` keine Wirkung mehr
4. Exception in setTimeout (asynchron) landet NICHT in `.catch()` - nur synchrone Throws

---

## Wichtige Befehle (Gesamtübersicht)

| Befehl | Beschreibung |
|--------|--------------|
| `deno run --watch main.ts` | Server starten mit Hot-Reload |
| `deno run -A main.ts` | Server mit allen Berechtigungen |
| `deno add <package>` | Paket hinzufügen |
| `/// <reference lib="dom" />` | DOM-Typen aktivieren |

---

## Verwendete Technologien

- **Runtime:** Deno
- **Web-Framework:** Hono
- **Datenbank:** SQLite
- **Sprachen:** TypeScript, JavaScript
- **Frontend:** HTML, CSS
- **API:** REST