// DOM elemek
const form = document.getElementById("userForm");
const tableBody = document.querySelector("#userTable tbody");
const searchInput = document.getElementById("search");
const submitButton = form.querySelector("button");

let users = [];
let editIndex = -1; // Ha -1, akkor hozzáadás módban vagyunk
let currentSort = { col: null, asc: true };

// Hozzáadás vagy frissítés
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const city = document.getElementById("city").value.trim();
  const phone = document.getElementById("phone").value.trim();

 
  if (!name || !city || !phone || age === "") {
  showValidationError("Minden mező kitöltése kötelező!");
  return;
    }

  
  if (name.length > 30 || city.length > 30 || phone.length > 15) {
    alert("A mezők túl hosszúak! Név/város max 30, telefonszám max 15 karakter.");
    return;
  }
  
  if (isNaN(age) || age < 0 || age > 110) {
    alert("Érvénytelen életkor! 0 és 110 között kell lennie.");
    return;
  }
  
  if (editIndex === -1) {
    // Hozzáadás
    users.push({ name, age, city, phone });
  } else {
    // Frissítés
    users[editIndex] = { name, age, city, phone };
    editIndex = -1;
    submitButton.innerText = "➕";
    submitButton.classList.remove("btn-success");
    submitButton.classList.add("btn-primary");
  }

  renderTable(users);
  form.reset();
});

// Táblázat kirajzolása
function renderTable(data) {
    
    tableBody.innerHTML = "";
    

    data.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.city}</td>
        <td>${user.phone}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editUser(${index})">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  
  }
  

function attachSortHandlers() {
    document.querySelectorAll("#userTable th[data-col]").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.dataset.col;
  
        if (currentSort.col === col) {
          currentSort.asc = !currentSort.asc;
        } else {
          currentSort.col = col;
          currentSort.asc = true;
        }
  
        users.sort((a, b) => {
          const valA = a[col].toString().toLowerCase();
          const valB = b[col].toString().toLowerCase();
          if (valA < valB) return currentSort.asc ? -1 : 1;
          if (valA > valB) return currentSort.asc ? 1 : -1;
          return 0;
        });
  
        renderTable(users);
      });
    });
  }
  

// Törlés
function deleteUser(index) {
  users.splice(index, 1);
  renderTable(users);

  // Ha épp ezt a sort szerkesztettük, akkor megszakítjuk a szerkesztést
  if (editIndex === index) {
    form.reset();
    editIndex = -1;
    submitButton.innerText = "➕";
    submitButton.classList.remove("btn-success");
    submitButton.classList.add("btn-primary");
  }
}

// Keresés
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(query) ||
    u.city.toLowerCase().includes(query) ||
    u.phone.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

// Szerkesztés aktiválása
function editUser(index) {
  const user = users[index];

  document.getElementById("name").value = user.name;
  document.getElementById("age").value = user.age;
  document.getElementById("city").value = user.city;
  document.getElementById("phone").value = user.phone;

  editIndex = index;

  submitButton.innerText = "✅";
  submitButton.classList.remove("btn-primary");
  submitButton.classList.add("btn-success");
}
attachSortHandlers();
function showValidationError(message) {
    alert(message); 
  }
  
