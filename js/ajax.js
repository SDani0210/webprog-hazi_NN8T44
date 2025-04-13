const endpoint = "http://gamf.nhely.hu/ajax2/";
const code = "NN8T44teszt001";

// Az oldal betöltésekor az összes adat lekérése
readData();

// Validálás
function validateInput(name, height, weight) {
  if (!name || !height || !weight) return "Nem lehet üres mező!";
  if (name.length > 30 || height.value > 30 || weight.length > 30)
    return "Maximum 30 karakter lehet minden mező!";
  return null;
}

// Üzenet megjelenítése
function showMessage(msg, color = "black") {
  const message = document.getElementById("message");
  message.textContent = msg;
  message.style.color = color;
}

// Táblázat frissítése
function renderTable(dataList) {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  let sum = 0, count = 0, max = -Infinity;

  dataList.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.height}</td>
      <td>${row.weight}</td>`;
    tbody.appendChild(tr);

    const h = parseFloat(row.height);
    if (!isNaN(h)) {
      sum += h;
      count++;
      if (h > max) max = h;
    }
  });

  const avg = count > 0 ? (sum / count).toFixed(2) : 0;
  document.getElementById("stats").innerHTML = `
    <p>Magasság összeg: ${sum}</p>
    <p>Átlag magasság: ${avg}</p>
    <p>Legmagasabb magasság: ${max}</p>
  `;
}

// ========== CREATE ==========
function createData() {
  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();
  const error = validateInput(name, height, weight);
  if (error) return showMessage(error, "red");

  const data = new URLSearchParams({ op: "create", code, name, height, weight });

  fetch(endpoint, { method: "POST", body: data })
    .then(res => res.json())
    .then(res => {
    if (res == 1 || res.affectedRows == 1) {
        showMessage("Sikeres hozzáadás!", "green");
        readData();
      } else {
        showMessage("Nem sikerült hozzáadni!", "red");
      }
    });
}

// ========== READ (Összes adat) ==========
function readData() {
  const data = new URLSearchParams({ op: "read", code });

  fetch(endpoint, { method: "POST", body: data })
    .then(res => res.json())
    .then(json => {
      renderTable(json.list || []);
      showMessage("Összes adat sikeresen betöltve.", "green");
    });
}

// ========== READ (ID alapján) ==========
function getDataById() {
  const id = document.getElementById("searchId").value.trim();
  if (!id) return showMessage("Add meg az ID-t!", "red");

  const data = new URLSearchParams({ op: "read", code });

  fetch(endpoint, { method: "POST", body: data })
    .then(res => res.json())
    .then(json => {
      const record = (json.list || []).find(x => x.id == id); // szám == string is működik
      if (record) {
        renderTable([record]);
        showMessage("Adatok betöltve az ID alapján.", "green");
      } else {
        renderTable([]);
        showMessage("Nincs ilyen ID!", "red");
      }
    });
}

// ========== UPDATE ==========
function updateData() {
  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();

  const error = validateInput(name, height, weight);
  if (!id) return showMessage("ID megadása kötelező frissítéshez!", "red");
  if (error) return showMessage(error, "red");

  const data = new URLSearchParams({ op: "update", code, id, name, height, weight });

  fetch(endpoint, { method: "POST", body: data })
    .then(res => res.json())
    .then(res => {
    if (res == 1 || res.affectedRows == 1) {
        showMessage("Sikeres módosítás!", "green");
        readData();
      } else {
        showMessage("Nem sikerült módosítani!", "red");
      }
    });
}

// ========== DELETE ==========
function deleteData() {
  const id = document.getElementById("id").value.trim();
  if (!id) return showMessage("Adj meg ID-t a törléshez!", "red");

  const data = new URLSearchParams({ op: "delete", code, id });

  fetch(endpoint, { method: "POST", body: data })
    .then(res => res.json())
    .then(res => {
    if (res == 1 || res.affectedRows == 1) {
        showMessage("Sikeres törlés!", "green");
        readData();
      } else {
        showMessage("Nem sikerült törölni!", "red");
      }
    });
}
