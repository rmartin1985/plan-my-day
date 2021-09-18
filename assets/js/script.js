// Selecting the user's text field 
var textEl = document.getElementById('city');
// Selecting the button element 
var buttonEl = document.getElementById('userInput');

// Selecte the checkboxs to check if they are clicked
var museumsEl = document.getElementById('museums');
var restaurantsEl = document.getElementById('restaurants');
var barsEl = document.getElementById('bars');
var monumentsEl = document.getElementById('monuments');

// variable for openmenu api


// Adding an event listenr to the button upon click which will display info based on the user input 
buttonEl.addEventListener("click", getUserInput);

// Function called when the button is clicked 
function getUserInput() {
    // Making an api call using the user input as the city name 
    apiCall = ('https://api.opentripmap.com/0.1/en/places/geoname?name=' + textEl.value + '&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b');

    // turning the API call into JSON
    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            //Pulling the lat and lon values to be used in another API call
            lat = response.lat;
            lon = response.lon;

            //Calling the function to display places based on the lat and lon of the city name
            displayPlaces(lat, lon);
        })
}

var displayPlaces = function (lat, lon) {

    if (museumsEl.checked === true) {
        displayMuseums();
    }
    if (restaurantsEl.checked === true) {
        displayRestaurants();
    }
    if (barsEl.checked === true) {
        displayBars();
    }
    if (monumentsEl.checked === true) {
        displayMonuments();
    }
}

var displayMuseums = function () {
    apiCall = 'https://api.opentripmap.com/0.1/en/places/radius?radius=40233&lon='
        + lon
        + '&lat=' + lat +
        '&kinds=museums&rate=3&format=json&limit=25&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b';

    // turning the api call into json
    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            //printing out to the page the names things
            console.log(response);
            for (var i = 0; i < response.length; i++) {

                var infoEl = document.getElementById('museums-div');

                infoEl.innerHTML += '<h2>' + response[i].name + '</h2>';
            }
        })
}

displayRestaurants = function () {
    var page = Math.floor((Math.random() * 9) + 1)
        console.log(page);

    apiCall = 'https://api.documenu.com/v2/restaurants/search/geo?lat='
        + lat
        + '&lon=' + lon +
        '&distance=5&size=30&page=' + page + '&key=18dceebbe886a72f5ab042ee15df4665';

    // turning the api call into json
    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            //printing out to the page the names things
            console.log(response);
            // var name = Math.floor(Math.random() * 20);
            var infoEl = document.getElementById('restaurants-div');
            infoEl.innerHTML += '<h2>' + response.data[Math.floor(Math.random() * 20)].restaurant_name + '</h2>';
            infoEl.innerHTML += '<h2>' + response.data[Math.floor(Math.random() * 20)].restaurant_name + '</h2>';
            infoEl.innerHTML += '<h2>' + response.data[Math.floor(Math.random() * 20)].restaurant_name + '</h2>';
            infoEl.innerHTML += '<h2>' + response.data[Math.floor(Math.random() * 20)].restaurant_name + '</h2>';
            infoEl.innerHTML += '<h2>' + response.data[Math.floor(Math.random() * 20)].restaurant_name + '</h2>';

            // for (var i = 0; i < response.data.length; i++) {

            //     var infoEl = document.getElementById('restaurants-div');

            //     infoEl.innerHTML += '<h2>' + response.data[i].restaurant_name + '</h2>';
            //     console.log(response.data[i].restaurant_name);
            // }
        })
}

displayBars = function () {
    apiCall = 'https://api.opentripmap.com/0.1/en/places/radius?radius=40233&lon='
        + lon
        + '&lat=' + lat +
        '&kinds=bars&rate=3&format=json&limit=5&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b';

    // turning the api call into json
    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            //printing out to the page the names things
            console.log(response);
            for (var i = 0; i < response.length; i++) {

                var infoEl = document.getElementById('bars-div');

                infoEl.innerHTML += '<h2>' + response[i].name + '</h2>';
            }
        })
}

displayMonuments = function () {
    apiCall = 'https://api.opentripmap.com/0.1/en/places/radius?radius=40233&lon='
        + lon
        + '&lat=' + lat +
        '&kinds=monuments&format=json&limit=5&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b';

    // turning the api call into json
    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            //printing out to the page the names things
            console.log(response);
            for (var i = 0; i < response.length; i++) {

                var infoEl = document.getElementById('monuments-div');

                infoEl.innerHTML += '<h2>' + response[i].name + '</h2>';
            }
        })
}