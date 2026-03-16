function checkPasswort(passwort) {
    return new Promise((resolve, reject) => {
        if (passwort.length < 8) {
            console.log("Passwort zu kurz, werde rejecten");
            return reject("Passwort zu kurz");
        }
        console.log("Passwort ist sicher genug");
        return resolve("Login erlaubt");
    });
}

checkPasswort("abc")
    .then((r) => {
        console.log(`Passwort "abc", r = ${r}`);
    })
    .catch((e) => { console.error(`Fehler bei "abc": ${e}`); });

checkPasswort("sicherespasswort")
    .then((r) => {
        console.log(`Passwort "sicherespasswort", r = ${r}`);
    })
    .catch((e) => { console.error(`Fehler bei "sicherespasswort": ${e}`); });

console.log("Promises erstellt");
