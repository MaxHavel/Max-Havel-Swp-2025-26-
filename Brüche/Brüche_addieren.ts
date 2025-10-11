export class Bruch {
  ganze: number;
  zaehler: number;
  nenner: number;

  constructor(ganze: number, zaehler: number, nenner: number) {
    if (nenner === 0) throw new Error("Nenner darf nicht 0 sein!");
    this.ganze = ganze;
    this.zaehler = zaehler;
    this.nenner = nenner;
  }

  static ggt(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  equals(other: Bruch): boolean {
    const num1 = this.ganze * this.nenner + this.zaehler;
    const num2 = other.ganze * other.nenner + other.zaehler;
    return num1 * other.nenner === num2 * this.nenner;
  }

  toString(): string {
    return `${this.ganze} ${this.zaehler}/${this.nenner}`;
  }

  static fromString(str: string): Bruch {
    const [ganzeStr, bruchteil] = str.split(" ");
    const [zaehlerStr, nennerStr] = bruchteil.split("/");
    return new Bruch(Number(ganzeStr), Number(zaehlerStr), Number(nennerStr));
  }
}

export function addiere(a: Bruch, b: Bruch): Bruch {
  const numA = a.ganze * a.nenner + a.zaehler;
  const numB = b.ganze * b.nenner + b.zaehler;
  let zaehlerGes = numA * b.nenner + numB * a.nenner;
  let nennerGes = a.nenner * b.nenner;

  // Vorzeichenbehandlung (falls nötig)
  const sign = zaehlerGes < 0 ? -1 : 1;
  zaehlerGes = Math.abs(zaehlerGes);

  const teiler = Bruch.ggt(zaehlerGes, nennerGes) || 1;
  zaehlerGes = zaehlerGes / teiler;
  nennerGes = nennerGes / teiler;

  const ganze = Math.floor(zaehlerGes / nennerGes) * sign;
  const zaehlerRest = zaehlerGes % nennerGes;

  return new Bruch(ganze, zaehlerRest, nennerGes);
}

//von KI
if (typeof (globalThis as any).Deno !== "undefined" ? (import.meta as any).main : false) {
  const b1 = Bruch.fromString("30 2/20");
  const b2 = Bruch.fromString("14 2/100");
  const summe = addiere(b1, b2);
  console.log("Summe:", summe.toString());
}
