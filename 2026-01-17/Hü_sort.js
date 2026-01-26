const persons = [
  { name: "Hermine", age: 14, gender: "f" },
  { name: "Harry", age: 15, gender: "m" },
  { name: "Ron", age: 14, gender: "m" },
  { name: "Ginny", age: 13, gender: "f" },
  { name: "Draco", age: 16, gender: "m" }
];


persons.sort((a, b) => a.age - b.age);


const males = persons.filter(p => p.gender === "m");
const females = persons.filter(p => p.gender === "f");


console.log("Alle sortiert:", persons);
console.log("Männlich:", males);
console.log("Weiblich:", females);
