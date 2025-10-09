export class Bruch {
  ganze: number;
  zaehler: number;
  nenner: number;

  constructor(ganze: number, zaehler: number, nenner: number) {
    this.ganze = ganze;
    this.zaehler = zaehler;
    this.nenner = nenner;
    if (this.nenner === 0) {
      throw new Error("Nenner darf nicht 0 sein!");
    }
  }

  static fromString(str: string): Bruch {
    const [ganze, bruchteil] = str.split(" ");
    const [zaehler, nenner] = bruchteil.split("/");
    return new Bruch(Number(ganze), Number(zaehler), Number(nenner));
  }

  static ggt(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  addiere(other: Bruch): Bruch {
    let neueNenner = this.nenner * other.nenner;
    let neueZaehler = (this.zaehler * other.nenner) + (other.zaehler * this.nenner);
    let neueGanze = this.ganze + other.ganze;
    const teiler = Bruch.ggt(neueZaehler, neueNenner);
    neueNenner = neueNenner / teiler;
    neueZaehler = neueZaehler / teiler;
    return new Bruch(neueGanze, neueZaehler, neueNenner);
  }

  toString(): string {
    return `${this.ganze} ${this.zaehler}/${this.nenner}`;
  }
}

// kleines Demo / Test
if (import.meta.main) {
  let b1 = "30 2/2";
  let b2 = "10 2/2";

  let bruch1 = Bruch.fromString(b1);
  let bruch2 = Bruch.fromString(b2);

  let summe = bruch1.addiere(bruch2);
  console.log("Summe:", summe.toString());
}