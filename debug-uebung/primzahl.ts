export function primzahl (n: number): [boolean, string]{
    const wurzel = Math.sqrt(n);
    if (n <= 1) {
        return [false, n + " ist zu klein"];
    }

    for (let i = 2; i <= wurzel; i++) {
        if (n % i === 0) {
            return  [false,  (n) + " ist keine Primzahl"];
        }
    }
    return [true, (n) + " ist eine Primzahl"]
}
for (let i = 0; i < 20; i++) {
console.log (primzahl(Math.ceil (Math.random() * 100)));
console.log ("-------------------");
}

