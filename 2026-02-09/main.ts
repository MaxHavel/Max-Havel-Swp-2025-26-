import { DOMParser } from "jsr:@b-fuze/deno-dom";

const html = `
<!DOCTYPE html>
<html>
<body>
  <input id="start" value="0" />
  <input id="end" value="10" />
  <input id="step" value="1" />
  <button id="calculate">Berechnen</button>
  <table>
    <tbody id="table-body"></tbody>
  </table>
</body>
</html>
`;


const document = new DOMParser().parseFromString(html, "text/html");

const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const stepInput = document.getElementById("step");
const tableBody = document.getElementById("table-body");

function f(x) {
  return x * x;
}

function g(x) {
  return x * x / 4;
}

function h(x) {
  return x * x - 8;
}

function i(x) {
  return x * x / 4 - 4;
}

function calculateAndDisplay() {
  const start = parseInt(startInput.value);
  const end = parseInt(endInput.value);
  const step = parseInt(stepInput.value) || 1;

  tableBody.innerHTML = "";

  for (let x = start; x <= end; x += step) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${x}</td>
      <td>${f(x)}</td>
      <td>${g(x)}</td>
      <td>${h(x)}</td>
      <td>${i(x)}</td>
    `;

    tableBody.appendChild(row);
  }
}

calculateAndDisplay();

console.log(document.documentElement.outerHTML);
