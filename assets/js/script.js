// Selecting the user's text field
var textEl = document.getElementById("city");
// Selecting the button element
var buttonEl = document.getElementById("userInput");

// Adding an event listenr to the button upon click which will display info based on the user input
buttonEl.addEventListener("click", getUserInput);

// Function that will be used to display places on the page
// takes as argument lat and lon
var displayPlaces = function (lat, lon) {
  // Making an API call based on Lat and Lon from the user's City
  // The API Call displays the top 25 things in 25 miles from the lat,lon
  // API Call can filter based on popularity I have choosen only the most popular
  apiCall =
    "https://api.opentripmap.com/0.1/en/places/radius?radius=40233&lon=" +
    lon +
    "&lat=" +
    lat +
    "&rate=3&format=json&limit=25&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b";

  // turning the api call into json
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //printing out to the page the names things
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var infoEl = document.getElementById("info");

        infoEl.innerHTML += "<h2>" + response[i].name + "</h2>";
      }
    });
};

// Function called when the button is clicked
function getUserInput() {
  // Making an api call using the user input as the city name
  apiCall =
    "https://api.opentripmap.com/0.1/en/places/geoname?name=" +
    textEl.value +
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
      displayPlaces(lat, lon);
      displayTicketApi();
    });
}

// Function pull ticketmaster info
function displayTicketApi() {
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?size=5&sort=date,asc&countryCode=US&city=" +
      textEl.value +
      "&apikey=iHQWV72eUoMRF8CqNt6SxnF49uNdDeK8",
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      showEvents(json);
    },
    error: function (xhr, status, err) {},
  });
}

function showEvents(json) {
  for (var i = 0; i < json.page.size; i++) {
    $("#info").append(
      "<p>" +
        '<a href="' +
        json._embedded.events[i].url +
        '" target="_blank">' +
        json._embedded.events[i].name +
        "</a>" +
        "</p>"
    );
  }
}
