// Selecting the user's text field
var textEl = document.getElementById("city");
// Selecting the button element
var buttonEl = document.getElementById("userInput");

// variables to select elements 
var museumsEl = document.getElementById("museums");
var museumsInfoEl = document.querySelector("#all-museums");
var restaurantsEl = document.getElementById("restaurants");
var restaurantsInfoEl = document.querySelector("#all-restaurants");
var barsEl = document.getElementById("bars");
var monumentsEl = document.getElementById("monuments");
var monumentsInfoEl = document.querySelector("#all-monuments");
var concertsInfoEl = document.querySelector("#all-concerts");
var sportsInfoEl = document.querySelector("#all-sports");

// variables for local storage
var cityHistory = JSON.parse(localStorage.getItem("search")) || [];
var pastEl = document.querySelector("#city-menu");
var citiesEl = document.querySelector("#past-cities");
var pastCityEl = document.querySelector("#past-cities");
var inputEl = document.querySelector("#city");
// this allows enter to be pushed as well as clicking the button to search
inputEl.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
      buttonEl.click();
  }
});

// Adding an event listenr to the button upon click which will display info based on the user input
buttonEl.addEventListener("click", getUserInput);

// Function called when the button is clicked
function getUserInput() {
  var searchTerm = textEl.value;
  if (cityHistory.indexOf(searchTerm) == -1) {
    cityHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(cityHistory));
  }

  // Making an api call using the user input as the city name
  apiCall =
    "https://api.opentripmap.com/0.1/en/places/geoname?name=" +
    searchTerm +
    "&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b";

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
      displayPlaces();
    });
}

var loadCityHistory = function () {
  citiesEl.innerHTML = "";
  for (let i = 0; i < cityHistory.length; i++) {
    var historyItem = document.createElement("a");
    // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
    historyItem.setAttribute("class", "navbar-item");
    historyItem.setAttribute("id", "past-city");
    historyItem.innerText = cityHistory[i];
    var recent = cityHistory[i];
    console.log(recent);
    citiesEl.append(historyItem);
  }
};

// adjusted displayPlaces as we don't have the check boxes anymore

var displayPlaces = function () {
  displayMuseums(lat, lon);
  displayRestaurants(lat, lon);
  displayMonuments(lat, lon);
  displaySportEvents();
  displayMusicEvents();
  loadCityHistory();
  textEl.value = "";
};

var displayMuseums = function () {
  museumsInfoEl.removeAttribute("class");
  museumsInfoEl.setAttribute("class", "column museums");
  var infoEl = document.getElementById("museums");
  infoEl.innerHTML = "";
  apiCall =
    "https://api.opentripmap.com/0.1/en/places/radius?radius=40233&lon=" +
    lon +
    "&lat=" +
    lat +
    "&kinds=museums&rate=3&format=json&limit=25&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b";

  // turning the api call into json
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //printing out to the page the names things
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        // Skipping anything with a rating of 7
        if (response[i].rate === 7) {
          console.log("a 7 was skipped");
        } else {
          // Selecting the mmuseums div
          // var infoEl = document.getElementById('museums');
          // adding to the div an <h2> tag with the name of the place
          infoEl.innerHTML +=
            "<li>" +
            '<a href="https://www.google.com/search?q=' +
            response[i].name +
            '"target="_blank">' +
            response[i].name +
            "</a>" +
            "</li>";
        }
      }
    });
};

// Fetch for restaurants.
displayRestaurants = function () {
  restaurantsInfoEl.removeAttribute("class");
  restaurantsInfoEl.setAttribute("class", "column");
  var infoEl = document.getElementById("restaurants");
  infoEl.innerHTML = "";
  apiCall =
    "https://api.opentripmap.com/0.1/en/places/radius?radius=40233&lon=" +
    lon +
    "&lat=" +
    lat +
    "&kinds=restaurants&rate=3&format=json&limit=10&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b";

  // turning the api call into json
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //printing out to the page the names things
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        // Skipping anything with a rating of 7
        if (response[i].rate === 7) {
          console.log("a 7 was skipped");
        } else {
          // Selecting the restaurants div

          infoEl.innerHTML +=
            "<li>" +
            '<a href="https://www.google.com/search?q=' +
            response[i].name +
            '"target="_blank">' +
            response[i].name +
            "</li>";
        }
      }
    });
};

// fetch for monuments

displayMonuments = function () {
  monumentsInfoEl.removeAttribute("class");
  monumentsInfoEl.setAttribute("class", "column");
  var infoEl = document.getElementById("monuments");
  infoEl.innerHTML = "";
  apiCall =
    "https://api.opentripmap.com/0.1/en/places/radius?radius=40233&lon=" +
    lon +
    "&lat=" +
    lat +
    "&kinds=monuments&rate=3&format=json&limit=20&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b";

  // turning the api call into json
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //printing out to the page the names things
      console.log(response);
      console.log(response.length);
      if (response.length === 0) {
        infoEl.innerHTML += "<li>There are no significant monuments for this city at this time.</li>";
      }

      for (var i = 0; i < response.length; i++) {
        // Skipping anything with a rating of 7
        if (response[i].rate === 7) {
          console.log("a 7 was skipped");
        } else {
          // Selecting the monuments div
          // var infoEl = document.getElementById('monuments');
          // adding a <h2> tag to the div and adding the name
          infoEl.innerHTML +=
            "<li>" +
            '<a href="https://www.google.com/search?q=' +
            response[i].name +
            '"target="_blank">' +
            response[i].name +
            "</li>";
        }
      }
    });
};

//  New Function pull ticketmaster info
function displayMusicEvents() {
  concertsInfoEl.removeAttribute("class");
  concertsInfoEl.setAttribute("class", "column");
  var infoEl = document.getElementById("concerts");
  infoEl.innerHTML = "";
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?segmentId=KZFzniwnSyZfZ7v7nJ&size=6&sort=date,asc&countryCode=US&city=" +
      textEl.value +
      "&apikey=iHQWV72eUoMRF8CqNt6SxnF49uNdDeK8",
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      showMusicEvents(json);
    },
    error: function (xhr, status, err) {},
  });
}

function displaySportEvents() {
  sportsInfoEl.removeAttribute("class");
  sportsInfoEl.setAttribute("class", "column");
  var infoEl = document.getElementById("sports");
  infoEl.innerHTML = "";
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?segmentId=KZFzniwnSyZfZ7v7nE&size=5&sort=date,asc&countryCode=US&city=" +
      textEl.value +
      "&apikey=iHQWV72eUoMRF8CqNt6SxnF49uNdDeK8",
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      showSportEvents(json);
    },
    error: function (xhr, status, err) {},
  });
}

function showMusicEvents(json) {
  for (var i = 1; i < json.page.size; i++) {
    var d = json._embedded.events[i].dates.start.dateTime;
    var date = new Date(d);
    $("#concerts").append(
      '<img src="' +
        json._embedded.events[i].images[0].url +
        '" />' +
        "<li>" +
        '<a href="' +
        json._embedded.events[i].url +
        '" target="_blank">' +
        json._embedded.events[i].name +
        "</a>" +
        "<br> " +
        date.toDateString() +
        "</li>"
    );
  }
}
function showSportEvents(json) {
  for (var i = 0; i < json.page.size; i++) {
    // converted time format using moment.js for a standard
    var d = json._embedded.events[i].dates.start.dateTime;
    var date = moment(d);
    var dateFormat = date.format("ddd MMM DD YYYY");

    $("#sports").append(
      '<img src="' +
        json._embedded.events[i].images[0].url +
        '" />' +
        "<li>" +
        '<a href="' +
        json._embedded.events[i].url +
        '" target="_blank">' +
        json._embedded.events[i].name +
        "</a>" +
        "<br>" +
        dateFormat +
        "</li>"
    );
  }
}
// main function to load the page
loadCityHistory();