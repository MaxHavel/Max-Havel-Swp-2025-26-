//Mein Ansatz --> für mich, wahrscheinlich fehler beim erweitern wegen verschiedenen zahlen

//import { Bruch,addiere } from "./Brüche_addieren.ts";
//
//for (let i = 0; i < 16; i++) {
//console.log (i + ". Versuch \n");
//const ganze = Math.floor(Math.random() * 10);
//const zaehler = Math.floor(Math.random() * 10);
//const nenner = Math.ceil(Math.random() * 9) + 1; 
//const abzieher = Math.ceil(Math.random() * 5);
//
//const ergebnis = new Bruch(ganze, zaehler, nenner);
//
//let zaehler1 = zaehler - abzieher;
//let zaehler2 = zaehler - zaehler1;
//
//const Multiplizierer = Math.ceil(Math.random() * 10) + 1;
//const nenner1 = nenner * (Math.ceil(Math.random() * 5) || 1);
//zaehler1 *= Multiplizierer;
//let ganze1 = ganze * Multiplizierer;
//
//
//const nenner2 = nenner * (Math.ceil(Math.random() * 5) || 1);
//zaehler2 *= Multiplizierer;
//let ganze2 = ganze * Multiplizierer;
//
//const bruch1 = new Bruch(ganze1, zaehler1, nenner1);
//const bruch2 = new Bruch(ganze2, zaehler2, nenner2);
//
//console.log('Bruch1:', bruch1.toString());
//console.log('Bruch2:', bruch2.toString());
//console.log('Ergebnis:', ergebnis.toString());
//
//const summeStr = addiere(bruch1, bruch2).toString();
//console.log('Summe:', summeStr);
//
//if (summeStr.trim() === ergebnis.toString().trim())
//{
//    console.log("Richtig!\n ");
//}
//else
//{
//    console.log("Falsch!\n ");
//}






import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Bruch,addiere } from "./Brüche_addieren.ts";
{
    "deno.enable"; true
    "deno.lint"; true
    "deno.unstable"; false
}
declare const Deno: any;

for (let i = 0; i < 16; i++) {
    const basisNenner = Math.ceil(Math.random() * 9) + 1; 
    const zielZaehler = Math.ceil(Math.random() * 20);  
    const erweiterer = Math.ceil(Math.random() * 6);    

    const ersterZaehler = Math.floor(Math.random() * (zielZaehler + 1)); 
    const zweiterZaehler = zielZaehler - ersterZaehler;

    const skalierterNenner = basisNenner * erweiterer;
    const skalierterZaehlerA = ersterZaehler * erweiterer;
    const skalierterZaehlerB = zweiterZaehler * erweiterer;

    const brA = new Bruch(0, skalierterZaehlerA, skalierterNenner);
    const brB = new Bruch(0, skalierterZaehlerB, skalierterNenner);
    const erwartet = new Bruch(0, zielZaehler, basisNenner);

    Deno.test(`Bruch Addition Random Test ${idx}`, () => {
        assertEquals(brA.addiere(brB).toString(), erwartet.toString());
    });
}