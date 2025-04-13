document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableBody");
    const numRows = 5;
    const numCols = 10;
    const dataRows = [];
  
    // Véletlen szín generátor (RGB)
    function getRandomColor() {
      const r = Math.floor(Math.random() * 200);
      const g = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);
      return `rgb(${r}, ${g}, ${b})`;
    }
  
    // Véletlen számokkal feltöltött táblázat létrehozása
    for (let i = 0; i < numRows; i++) {
      const row = [];
      const tr = document.createElement("tr");
  
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.index = i;
      checkbox.addEventListener("change", updateChart);
      checkboxCell.appendChild(checkbox);
      tr.appendChild(checkboxCell);
  
      for (let j = 0; j < numCols; j++) {
        const value = Math.floor(Math.random() * 101);
        row.push(value);
  
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
      }
  
      dataRows.push(row);
      tableBody.appendChild(tr);
    }
  
    // Diagram inicializálás
    const ctx = document.getElementById("chart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: numCols }, (_, i) => i + 1),
        datasets: [],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
          },
        },
      },
    });
  
    // Frissíti a chart adatait a kiválasztott checkboxok alapján
    function updateChart() {
      const selectedDatasets = [];
  
      document.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
        const index = cb.dataset.index;
        selectedDatasets.push({
          label: `Sor ${parseInt(index) + 1}`,
          data: dataRows[index],
          borderColor: getRandomColor(),
          fill: false,
          tension: 0.2,
        });
      });
  
      chart.data.datasets = selectedDatasets;
      chart.update();
    }
  });
  