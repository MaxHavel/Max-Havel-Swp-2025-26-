
class Bruch {
  constructor(ganze, zaehler, nenner) {
    this.ganze = ganze;
    this.zaehler = zaehler;
    this.nenner = nenner;
    if (this.nenner === 0) {
      throw new Error("Nenner darf nicht 0 sein!");
    }
  }

  static fromString(str) {
    let [ganze, bruchteil] = str.split(" ");
    let [zaehler, nenner] = bruchteil.split("/");
    return new Bruch(Number(ganze), Number(zaehler), Number(nenner));
  }

  static ggt(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  addiere(other) {
    let neueNenner = this.nenner * other.nenner;
    let neueZaehler = (this.zaehler * other.nenner) + (other.zaehler * this.nenner);
    let neueGanze = this.ganze + other.ganze;
    let teiler = Bruch.ggt(neueNenner, neueZaehler);
    neueNenner /= teiler;
    neueZaehler /= teiler;
    return new Bruch(neueGanze, neueZaehler, neueNenner);
  }

  toString() {
    return `${this.ganze} ${this.zaehler}/${this.nenner}`;
  }
}

let b1 = "30 2/2";
let b2 = "10 2/2";

let bruch1 = Bruch.fromString(b1);
let bruch2 = Bruch.fromString(b2);

let summe = bruch1.addiere(bruch2);
console.log("Summe:", summe.toString());