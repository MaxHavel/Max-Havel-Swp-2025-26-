import { assertEquals, assertThrows, assert } from "https://deno.land/std/testing/asserts.ts";

import { Bruch, addiere } from "./Brüche_addieren.ts";
{
    "deno.enable"; true
    "deno.lint"; true
    "deno.unstable"; false
}
declare const Deno: any;


Deno.test("Bruch.fromString erstellt korrektes Objekt", () => {
  const b = Bruch.fromString("3 1/2");
  assertEquals(b.ganze, 3);
  assertEquals(b.zaehler, 1);
  assertEquals(b.nenner, 2);
});

Deno.test("Addition von Brüchen funktioniert", () => {
  const b1 = Bruch.fromString("1 1/2");
  const b2 = Bruch.fromString("2 1/2");
  const summe = addiere(b1, b2);
  // Ergebnis wird gekürzt => 4 0/1
  assert(summe.equals(new Bruch(4, 0, 1)));
});

Deno.test("Bruch.toString gibt korrekten String zurück", () => {
  const b = new Bruch(2, 3, 4);
  assertEquals(b.toString(), "2 3/4");
});

Deno.test("Nenner 0 wirft Fehler", () => {
  assertThrows(() => {
    new Bruch(1, 2, 0);
  }, Error, "Nenner darf nicht 0 sein!");
});

Deno.test("ggt berechnet größten gemeinsamen Teiler", () => {
  assertEquals(Bruch.ggt(12, 8), 4);
  assertEquals(Bruch.ggt(15, 5), 5);
});


