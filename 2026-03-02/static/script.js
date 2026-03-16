async function holeEssen() {
            const res = await fetch("/lieblinge");
            const data = await res.json();
            
            const tbody = document.querySelector("#essen-table tbody");
            tbody.innerHTML = "";
            
            for (const item of data) {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${item.name}</td><td>${item.essen}</td>`;
                tbody.appendChild(tr);
            }
        }

async function löscheEssen() {
    document.getElementById("essen-table").innerHTML = '';


}