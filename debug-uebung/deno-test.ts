import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { primzahl } from "./primzahl.ts"; 

Deno.test("Primzahlen erkennen", () => {
  const primzahlen = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

  for (const n of primzahlen) {
    const [istPrim, msg] = primzahl(n);
    assertEquals(istPrim, true, `${n} sollte als Primzahl erkannt werden (${msg})`);
  }
});

Deno.test("Nicht-Primzahlen erkennen", () => {
  const nichtPrimzahlen = [1, 4, 6, 8, 9, 10, 12, 14, 15, 16];

  for (const n of nichtPrimzahlen) {
    const [istPrim, msg] = primzahl(n);
    assertEquals(istPrim, false, `${n} sollte keine Primzahl sein (${msg})`);
  }
});

