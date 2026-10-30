
/*
Gumis Car Garage
JavaScript DOM Manipulation
*/

// Henter HTML-elementer
const carForm = document.getElementById("car-form");
const carList = document.getElementById("car-list");
const carCount = document.getElementById("car-count");
// Henter søkefeltet fra HTML
const searchCar = document.getElementById("search-car");
// Henter lagrede biler fra nettleseren
let cars = JSON.parse(localStorage.getItem("cars")) || [];

// Funksjon for å vise bilene
function displayCars() {
    carList.innerHTML = "";


    // Oppdaterer antall biler i garasjen
    carCount.textContent = `Antall biler: ${cars.length}`;


    // Henter teksten fra søkefeltet
    const searchText = searchCar.value.toLowerCase().trim();

    // Går gjennom alle bilene
cars.forEach(function(car, index) {

        const carName = `${car.brand} ${car.model}`.toLowerCase();

        // Hopper over biler som ikke passer med søket
        if (!carName.includes(searchText)) {
            return;
        }

        // Lager et nytt bilkort
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");


        // Velger bilde basert på bilmerke
        let imagePath = "";

        if (car.brand.toLowerCase() === "toyota") {
            imagePath = "images/toyota.jpeg";
        } else if (car.brand.toLowerCase() === "bmw") {
            imagePath = "images/bmw.jpg";
        } else if (car.brand.toLowerCase() === "lexus") {
            imagePath = "images/lexus.jpeg";
        }

        // Lager bildeelementet
        if (imagePath !== "") {
            const carImage = document.createElement("img");
            carImage.src = imagePath;
            carImage.alt = `${car.brand} ${car.model}`;
            carImage.classList.add("car-image");

            carCard.appendChild(carImage);
        }


        // Legger til informasjon om bilen
        const title = document.createElement("h3");
        title.textContent = `${car.brand} ${car.model}`;

        const yearText = document.createElement("p");
        yearText.textContent = `Årsmodell: ${car.year}`;

        // Lager en knapp for å slette bilen
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️ Slett bil";
        deleteButton.classList.add("delete-btn");

        // Sletter bilen når brukeren klikker
        deleteButton.addEventListener("click", function() {
            cars.splice(index, 1);

            // Lagrer den oppdaterte listen
            localStorage.setItem("cars", JSON.stringify(cars));

            displayCars();
        });

        // Legger elementene til bilkortet
        carCard.appendChild(title);
        carCard.appendChild(document.createElement("p")).textContent = `Modell: ${car.model}`;
        carCard.appendChild(yearText);
        carCard.appendChild(deleteButton);

        // Viser bilkortet på nettsiden
        carList.appendChild(carCard);
    });

    // Oppdaterer antall biler
    carCount.textContent = `Antall biler: ${cars.length}`;
}


// Når brukeren sender inn skjemaet
carForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Henter verdiene fra skjemaet
    const brand = document.getElementById("brand").value.trim();
    const model = document.getElementById("model").value.trim();
    const year = document.getElementById("year").value;

    // Sjekker at feltene ikke er tomme
    if (brand === "" || model === "" || year === "") {
        alert("Vennligst fyll ut alle feltene!");
        return;
    }

    // Lager et bilobjekt
    const newCar = {
        brand: brand,
        model: model,
        year: Number(year)
    };

    // Legger bilen til i arrayet
    cars.push(newCar);

    // Lagrer bilene i nettleseren
    localStorage.setItem("cars", JSON.stringify(cars));

    // Oppdaterer nettsiden
    displayCars();

    // Tømmer skjemaet
    carForm.reset();
});

// Viser lagrede biler når siden åpnes
displayCars();


// Oppdaterer billisten når brukeren skriver
searchCar.addEventListener("input", function() {
    displayCars();
});


/* Bytter mellom lys og mørk modus */

// Henter knappen fra HTML
const themeToggle = document.getElementById("theme-toggle");

// Reagerer når brukeren klikker på knappen
themeToggle.addEventListener("click", function() {

    // Legger til eller fjerner dark-mode
    document.body.classList.toggle("dark-mode");

    // Endrer teksten på knappen
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️ Lys modus";
    } else {
        themeToggle.textContent = "🌙 Mørk modus";
    }
});
