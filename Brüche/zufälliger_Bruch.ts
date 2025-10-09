import { Bruch } from "./Brüche addieren.ts";

const ganze1 = Math.floor(Math.random() * 10);
const ganze2 = Math.floor(Math.random() * 10);
const zaehler = Math.floor(Math.random() * 10);
const nenner = Math.ceil(Math.random() * 9) + 1; // 1..10
const abzieher = Math.ceil(Math.random() * 5);

let zaehler1 = zaehler - abzieher;
let zaehler2 = zaehler - zaehler1;

const Multiplizierer = Math.ceil(Math.random() * 10) + 1;
const nenner1 = nenner * (Math.ceil(Math.random() * 5) || 1);
zaehler1 *= Multiplizierer;

const nenner2 = nenner * (Math.ceil(Math.random() * 5) || 1);
zaehler2 *= Multiplizierer;

const bruch1 = new Bruch(ganze1, zaehler1, nenner1);
const bruch2 = new Bruch(ganze2, zaehler2, nenner2);

console.log('Bruch1:', bruch1.toString());
console.log('Bruch2:', bruch2.toString());
