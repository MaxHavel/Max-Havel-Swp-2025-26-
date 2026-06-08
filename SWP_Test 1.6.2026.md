# Wissenstest - 2ahwii

**Datum:** 2026-06-01  
**Themen:** Promises, async/await, DOM-Manipulation, Array-Methoden, Event-Handling, TypeScript-Transpilation

---

## Multiple Choice Fragen

Kreuze die richtigen Antworten an. Es können mehrere Antworten richtig sein.  
Wenn du eine Antwort als mehrdeutig oder kontextabhängig empfindest, markiere `-` und begründe kurz.

### 1. Promise – Grundlagen

Was ist ein Promise in JavaScript?

- [x] Ein Objekt, das einen zukünftigen Wert repräsentiert
- [ ] Eine Funktion, die sofort ausgeführt wird
- [x] Ein Objekt mit den Zuständen `pending`, `fulfilled` und `rejected`
- [ ] Eine Datenstruktur für synchrone Operationen

### 2. Promise – then/catch

Was bewirkt `.catch()` an einer Promise-Kette?

- [ ] Es wird nur nach einem erfolgreichen `.then()` ausgeführt
- [x] Es fängt Fehler aus allen vorherigen `.then()`-Schritten ab
- [x] Es wird aufgerufen, wenn das Promise rejected wird 
- [] Es unterbricht die weitere Ausführung der Kette

### 3. Promise-Chaining

Was passiert, wenn man in einem `.then()` ein neues Promise zurückgibt (`return`)?

- [ ] Das äußere Promise wird sofort resolved
- [x] Das nächste `.then()` wartet, bis das zurückgegebene Promise resolved ist
- [ ] Der Rückgabewert wird ignoriert
- [ ] Die Kette wird abgebrochen

### 4. async/await

Was bewirkt das Schlüsselwort `await`?

- [ ] Es pausiert die Ausführung der gesamten Anwendung
- [x] Es wartet, bis ein Promise resolved oder rejected ist
- [x] Es kann nur innerhalb einer `async`-Funktion verwendet werden
- [ ] Es verwandelt eine synchrone Funktion in eine asynchrone

### 5. Async-Funktionen

Was gibt eine `async`-Funktion zurück?

- [ ] Einen beliebigen Wert
- [x] Immer ein Promise
- [ ] Nur `undefined`
- [ ] Ein Promise, wenn `await` verwendet wird, sonst den Wert direkt  -------------vllt

### 6. DOM – createElement

Wie erstellt man ein neues `<div>`-Element in JavaScript?

- [x] `document.createElement("div")`
- [ ] `new HTMLDivElement()`
- [ ] `document.createNode("div")`
- [ ] `document.newElement("div")`

### 7. DOM – classList

Welche Methoden gibt es auf `element.classList`?

- [x] `.add("klasse")`
- [x] `.remove("klasse")`
- [x] `.toggle("klasse")`
- [ ] `.set("klasse")`

### 8. Array – filter

Was macht `array.filter(fn)`?

- [ ] Es ändert das ursprüngliche Array
- [x] Es gibt ein neues Array mit allen Elementen zurück, für die `fn` `true` zurückgibt
- [ ] Es gibt das erste Element zurück, für das `fn` `true` ergibt
- [ ] Es entfernt Elemente aus dem Array, für die `fn` `false` zurückgibt

### 9. Array – sort

Was bewirkt `array.sort((a, b) => a.price - b.price)`?

- [x] Es sortiert die Elemente aufsteigend nach `price`
- [ ] Es sortiert die Elemente absteigend nach `price`
- [x] Es verändert das ursprüngliche Array (bei `sort()`)
- [x] Es gibt ein neues sortiertes Array zurück (bei `toSorted()`)

### 10. Event-Handling

Welche Aussagen zu `addEventListener` sind richtig?

- [x] Man kann mehrere Event-Listener für dasselbe Event an einem Element registrieren
- [ ] Der Callback wird sofort beim Registrieren ausgeführt  
- [x] Der Callback wird ausgeführt, wenn das Event eintritt
- [x] Man kann Events mit `removeEventListener` wieder entfernen

### 11. JavaScript Klassen

Was ist in JavaScript bei `class`-Definitionen möglich? 

- [x] Private Felder mit `#`-Präfix
- [x] Getter und Setter mit `get` und `set`
- [ ] Echte Sichtbarkeitsmodifikatoren wie `private` oder `public` (zur Laufzeit)
- [ ] Mehrere Konstruktoren wie in Java

### 12. TypeScript-Transpilation

Was bewirkt `Deno.bundle()` im Unterrichtsbeispiel? ---------------------------------

- [ ] Es kompiliert TypeScript zu JavaScript
- [ ] Es erstellt ein ausführbares Binary
- [x] Es bündelt alle importierten Module in eine einzige Datei
- [ ] Es führt den Code sofort aus

---

## Freitext Fragen

### 13. Promise-Kette erklären

Erkläre den Ablauf einer Promise-Kette am Beispiel eines Pizza-Service:  
`checkOven()` → `bakePizza("Margherita")` → Ausgabe.  
Warum reicht ein einziges `.catch()` am Ende der Kette?

1. checkOven(): prüft, ob die Backofenmaschine bereit ist. Wenn sie bereit ist, wird ein Promise mit dem Wert `{ovenReady: true}` ausgegeben

2. bakePizza("Margherita") : macht eine Margherita-Pizza. Sie erstellt eine neue Pizza-Instanz, legt ihr den Namen fest und gibt dieses zur Ausgabe zurück. Dieser Ablauf wird ebenfalls in einem Promise umgewandelt. Wenn die Pizza fertig ist, wird ein Promise ausgegeben und eine Ausgabe erfolgt (z.B in Form von Pizza ist fertig)

3.  .then(msg => console.log(msg)): Sobald bakePizza() erfüllt ist, gibt es den Wert (z.B. "Pizza ist fertig!") weiter. Das nächste .then() empfängt diesen Wert als Parameter msg und gibt ihn mit console.log in der Konsole aus.
Warum reicht ein .catch() am Ende? Weil Fehler in einer Promise-Kette automatisch nach unten weitergegeben werden. Egal ob checkOven() oder bakePizza() fehlschlägt – das Promise wird rejected und springt springt zum nächsten .catch() in der Kette, alle dazwischenliegenden .then()-Schritte werden übersprungen.


### 14. async/await vs. then/catch

Schreibe die folgende Promise-Kette mit `async`/`await` und `try`/`catch` um:

```javascript
checkOven()
  .then((result) => bakePizza("Margherita"))
  .then((msg) => console.log(msg))
  .catch((err) => console.error(err));



async function processPizzas() {
  try {
    const result = await checkOven();
    if (result) {
      const pizzaMessage = await bakePizza("Margherita");
      console.log(pizzaMessage);
    } else {
      console.error("Backofen nicht bereit!");
    }
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten:", error);
  }
}


_______________________________________________________________________________

### 15. DOM-Elemente programmatisch erstellen

Beschreibe, wie man in JavaScript ein DOM-Element erstellt, mit einer CSS-Klasse versieht und in ein Eltern-Element einfügt.  
Gehe auf `document.createElement`, `classList.add`, `textContent` und `append` ein.

man erstellet ein DOm-Element mit: document.createElement("div");
man hängt dann die Css-Klasse mit: div.classList.add("Eine Klasee");
Text Inhalt setzten: div.textContent = "Hallo Welt!";

Bsp vom letzten Test: 

function createProductElement(product) {
    const article = document.createElement("article");
    article.classList.add("shop-card");

    const emoji = document.createElement("p");
    emoji.classList.add("shop-emoji");
    emoji.textContent = product.emoji;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const category = document.createElement("p");
    category.classList.add("shop-category");
    category.textContent = product.category;

    const price = document.createElement("p");
    price.classList.add("shop-price");
    price.textContent = product.price.toFixed(2) + " Euro";

    article.append(emoji, name, category, price);
}
article, emoji, name, category, price werden als Element erstellt 
manchen wird ein Inhalt mit .textcontent angehängt und manchen wird die Css Klasse mit .classlist.add angehängt

am ende wird mit article.append(emoji, name, category, price); dem article (emoji, name, category und price als Kinder angehängt). article ist in dem Fall das Elterteil, die restlichen Elemente sind Kinder.




_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

---

Gutes Gelingen!
