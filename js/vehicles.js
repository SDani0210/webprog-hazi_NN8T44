class Vehicle {
    constructor(brand, model, horsepower, drivetrain, transmission, origin, imageUrl) {
      this.brand = brand;
      this.model = model;
      this.horsepower = horsepower;
      this.drivetrain = drivetrain;
      this.transmission = transmission;
      this.origin = origin;
      this.imageUrl = imageUrl;
    }
  
    createCard() {
      const card = document.createElement('div');
      card.classList.add('vehicle-card');
  
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <img src="${this.imageUrl}" alt="${this.brand} ${this.model}">
          </div>
          <div class="card-back">
            <h5>${this.brand} ${this.model}</h5>
            <p><strong>Lóerő:</strong> ${this.horsepower} LE</p>
            <p><strong>Hajtáslánc:</strong> ${this.drivetrain}</p>
            <p><strong>Váltó:</strong> ${this.transmission}</p>
            <p><strong>Származás:</strong> ${this.origin}</p>
          </div>
        </div>
      `;
  
      card.addEventListener('click', () => card.classList.toggle('flipped'));
      return card;
    }
  }
  
  class Car extends Vehicle {}
  class Truck extends Vehicle {}
  class Motorcycle extends Vehicle {}
  
  const vehicles = [
    new Car("Toyota", "Supra", 330, "Hátsókerék", "Manuális", "Japán", "../img/supra-mk4.jpg"),
    new Car("Mazda", "RX-7", 280, "Hátsókerék", "Manuális", "Japán", "../img/mazdarx7.jpg"),
    new Car("Nissan", "Skyline GT-R", 320, "Összkerék", "Manuális", "Japán", "../img/skylinegtr4.jpg"),
    new Truck("Ford", "Transit Jumbo", 125, "Hátsókerék", "Automata", "Egyesült Királyság", "../img/fordtransit.jpg"),
    new Motorcycle("Yamaha", "MT-09", 119, "Lánchajtás", "Manuális", "Japán", "../img/yamahamt09.jpg"),
    new Car("BMW", "M3 E46", 343, "Hátsókerék", "Manuális", "Németország", "../img/m3e46.jpg"),
    new Car("Chevrolet", "Camaro", 455, "Hátsókerék", "Automata", "USA", "../img/camaro.jpg"),
    new Truck("Mercedes-Benz", "Sprinter", 160, "Hátsókerék", "Automata", "Németország", "../img/sprinter.jpg"),
    new Motorcycle("Ducati", "Panigale V4", 215, "Lánchajtás", "Manuális", "Olaszország", "../img/panigale.jpeg"),
    new Car("Audi", "RS6", 600, "Összkerék", "Automata", "Németország", "../img/rs6.jpg")
  ];
  
  const container = document.getElementById("vehicleContainer");
  vehicles.forEach(v => container.appendChild(v.createCard()));
  