function checkOven(isOvenHot) {
    return new Promise((resolve, reject) => {
        console.log("Prüfe Ofen...");
        if (isOvenHot) {
            resolve("Ofen ist heiß!");
        } else {
            reject("Ofen ist noch kalt");
        }
    });
}

function bakePizza(pizzaName) {
    return new Promise((resolve, reject) => {
        console.log("Backe " + pizzaName + "...");
        if (!pizzaName) {
            reject("Pizza-Name darf nicht leer sein");
        } else {
            resolve(pizzaName + " ist fertig! ");
        }
    });
}

console.log("=== Pizza-Service mit Promise-Chaining ===");

checkOven(true)
    .then((result) => {
        console.log(result);
        return bakePizza("Margherita");
    })
    .then((result) => {
        console.log(result);
        console.log("Alles fertig! Genieße deine Pizza.");
    })
    .catch((error) => {
        console.error("FEHLER:", error);
    });

console.log("Promises erstellt (läuft asynchron)");
