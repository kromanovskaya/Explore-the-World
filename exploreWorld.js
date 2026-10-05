 let destinations = []

 // function to load json file with destinations
async function loadDestinations() {
    const container = document.querySelector(".cities");
    container.innerHTML = "Loading...";

    try {
        const response = await fetch("destinations.json");
        destinations = await response.json();

        displayDestinations(destinations);
    } catch (error) {
        container.textContent = "Failed to load destinations.";
    }
} 

// function to display destinations cards
function displayDestinations(destinations) {
    const container = document.querySelector(".cities");
    container.innerHTML = "";

     if (destinations.length === 0) {
        container.innerHTML = "<p>No destinations found :( <br> We are working on adding more destinations soon!</p>";
        return;

     }

    destinations.forEach((destination) => {
        //create destination card
        const card = document.createElement("section");
        card.classList.add("destination-card");

        // add city name
        const city = document.createElement("h2");
        city.textContent = destination.city;

        // add country
        const country = document.createElement("h4");
        country.textContent = destination.country;

        // add photo beautifully
        const photoContainer = document.createElement("div");
        photoContainer.classList.add("image-container");

        const photo = document.createElement("img");
        photo.src = destination.photoV;
        photo.alt = destination.city;

        photoContainer.appendChild(photo);

        // add details button
        const detailsButton = document.createElement("button");
        detailsButton.textContent = "View Details";

        // add click event listener to the details button
        detailsButton.addEventListener("click", () => {
            showDestinationDetails(destination);
        });

        // add all elements to the card
        card.appendChild(photoContainer);
        card.appendChild(city);
        card.appendChild(country);
        card.appendChild(detailsButton);

        container.appendChild(card);
    });
}

// function to show destination details
function showDestinationDetails(destination) {
    const container = document.querySelector(".cities");
    container.innerHTML = "";

    // create a new card for displaying destination details
    const detailsCard = document.createElement("section");
    detailsCard.classList.add("details-card");

    // create a container for the photo
    const photoContainer = document.createElement("div");
    photoContainer.classList.add("image-container");

    // create the photo element and set its source and alt text
    const photo = document.createElement("img");
    photo.src = destination.photoG;
    photo.alt = destination.city;

    // append the photo to the photo container
    photoContainer.appendChild(photo);

    // add city and country
    const city = document.createElement("h2");
    city.textContent = destination.city + ", " + destination.country;

    // add region
    const region = document.createElement("h4");
    region.textContent = destination.region;

    // add description title
    const descriptionTitle = document.createElement("h3");
    descriptionTitle.textContent = "Overview:";

    // add description
    const description = document.createElement("p");
    description.textContent = destination.description;

    // add title for attractions
    const attractionsTitle = document.createElement("h3");
    attractionsTitle.textContent = "Must see attractions:";

    // add attractions list
    const attractions = document.createElement("ul");
    attractions.classList.add("attractions");
    destination.attractions.forEach((attraction) => {
        const listItem = document.createElement("li");
        listItem.textContent = attraction;
        attractions.appendChild(listItem);
    });

    // add special fact title
    const factTitle = document.createElement("h3");
    factTitle.textContent = "Special Fact:";

    // add special fact
    const fact = document.createElement("p");
    fact.classList.add("special-fact");
    fact.textContent = destination.fact;

    // add back to destinations button
    const backToDestinationsButton = document.createElement("button");
    backToDestinationsButton.textContent = "Back to Destinations";

    // add event listener to the back to destinations button
    backToDestinationsButton.addEventListener("click", () => {
        displayDestinations(destinations);

    });

    // append all elements to the details card
    detailsCard.appendChild(photoContainer);
    detailsCard.appendChild(city);
    detailsCard.appendChild(region);
    detailsCard.appendChild(descriptionTitle);
    detailsCard.appendChild(description);
    detailsCard.appendChild(attractionsTitle);
    detailsCard.appendChild(attractions);
    detailsCard.appendChild(factTitle);
    detailsCard.appendChild(fact);
    detailsCard.appendChild(backToDestinationsButton);

    // append the details card to the main container
    container.appendChild(detailsCard);
}


// event listener to filter destinations based on search input
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keyup', (e) => {

    // get the search text from the input field
    const searchText = e.target.value.toLowerCase();

    // filter the destinations based on the search text
    const filteredDestinations = destinations.filter(function(destination) {
        return destination.city.toLowerCase().includes(searchText) ||
               destination.country.toLowerCase().includes(searchText);
    });

    // display the filtered destinations
    displayDestinations(filteredDestinations);
});



// call loadDestinations function
loadDestinations();


