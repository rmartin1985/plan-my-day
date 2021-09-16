apiCall = ('https://api.opentripmap.com/0.1/en/places/geoname?name=Austin&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b');

fetch(apiCall)
.then(function(response){
    return response.json();
})
.then(function(response){
    console.log(response);

    console.log(response.lat);
    console.log(response.lon);
})

40233.6 

fetch('https://api.opentripmap.com/0.1/en/places/radius?radius=40233&lon=-97.74306&lat=30.26715&rate=3&format=json&limit=25&apikey=5ae2e3f221c38a28845f05b6d3c5612fbf8d9a0bb1b85e69d409790b')
.then(function(response){
    return response.json();
})
.then(function(response){
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        var infoEl = document.getElementById('info');

        console.log(infoEl);

        infoEl.innerHTML += '<h2>' + response[i].name + '</h2>';
    }
})