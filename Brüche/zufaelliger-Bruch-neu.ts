//import { Bruch } from "./Brüche_addieren.ts";
//
//const ganze = Math.floor(Math.random() * 10);
//const zaehler = Math.floor(Math.random() * 10);
//const nenner = Math.ceil(Math.random() * 10);;
//
//const abzieher = Math.ceil(Math.random() * 5);
//const ergebnis = new Bruch(ganze, zaehler, nenner);
//
////Zähler aufteilen und überprüfen 
//const zaehler1 = zaehler - abzieher;
//const zaehler2 = zaehler - zaehler1;
//if (zaehler1  + zaehler2 == zaehler)
//{
//    console.log("Zähler Richtig gerechnet");
//} 
// 
////ganze aufteilen und überprüfen
//const ganze1 = ganze/2
//const ganze2 = ganze/2
//
//for (let i = 0; ganze % 2 != 0 || i > 100; i++)
//{
//    const ganze = Math.floor(Math.random() * 10);
//    const ganze1 = ganze/2
//    const ganze2 = ganze/2
//}
//
//if (ganze1 + ganze2 == ganze) 
//{
//    console.log("Ganze Richtig gerechnet");
//}
//
////Brüche erweitern
//const nenner1 = nenner * (Math.ceil(Math.random() * 10));
//const nenner2 = nenner * (Math.ceil(Math.random() * 10));
//
//const bruch1 = new Bruch(ganze1, zaehler1, nenner1);
//const bruch2 = new Bruch(ganze2, zaehler2, nenner2);       
//console.log('Bruch1:', bruch1.toString());
//console.log('Bruch2:', bruch2.toString());
//console.log('Ergebnis:', ergebnis.toString());
import { Bruch, addiere } from "./Brüche_addieren.ts";

for (let i = 0; i < 16; i++) {
  console.log("------------------\n" + i + ". Versuch ");
  
const ganze = Math.floor(Math.random() * 10);
const zaehler = Math.floor(Math.random() * 10);
const nenner = Math.ceil(Math.random() * 10);

const abzieher = Math.floor(Math.random() * (zaehler + 1)); // <= zaehler
const ergebnis = new Bruch(ganze, zaehler, nenner);

// Zähler aufteilen
const zaehler1 = zaehler - abzieher;
const zaehler2 = abzieher;

// Ganze ganzzahlig aufteilen
const ganze1 = Math.floor(ganze / 2);
const ganze2 = ganze - ganze1;

// Nenner-Erweiterungen (Multiplikatoren > 0)
const mul1 = Math.ceil(Math.random() * 10);
const mul2 = Math.ceil(Math.random() * 10);
const nenner1 = nenner * mul1;
const nenner2 = nenner * mul2;

// Zähler proportional zur Erweiterung skalieren (ganze Teile bleiben gleich)
const skZaehler1 = zaehler1 * mul1;
const skZaehler2 = zaehler2 * mul2;

const bruch1 = new Bruch(ganze1, skZaehler1, nenner1);
const bruch2 = new Bruch(ganze2, skZaehler2, nenner2);

console.log('Bruch1:', bruch1.toString());
console.log('Bruch2:', bruch2.toString());
console.log('Ergebnis:', ergebnis.toString());

console.log('Summe (addiere):', addiere(bruch1, bruch2).toString());
console.log('Gleichheit (equals):', addiere(bruch1, bruch2).equals(ergebnis));
}
