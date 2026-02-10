
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
    const fResult = f(x);
    const gResult = g(x);
    const hResult = h(x);
    const iResult = i(x);
    

    const row = document.createElement("tr");
    
 
    row.innerHTML = `
      <td>${x}</td>
      <td>${fResult}</td>
      <td>${gResult}</td>
      <td>${hResult}</td>
      <td>${iResult}</td>
    `;
    
  
    tableBody.appendChild(row);
  }
}


document.addEventListener("DOMContentLoaded", function() {

  const calculateBtn = document.getElementById("calculate");
  
  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateAndDisplay);
  } 
});