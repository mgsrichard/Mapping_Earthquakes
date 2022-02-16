// Add console.log to check to see if our code is working
console.log("working")

// Create the map object with the center at the San Francisco airport
//let map = L.map('mapid').setView([30,30], 2);

// Equivalentally, create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [
      39.5, -98.5
    ],
    zoom: 3
  });
  

/* let line = [
  [33.9416,-118.4085],
  [40.641766,-73.780968],
  [30.19,-97.6687],
  [43.677223,-79.630556],
  [37.509313,-77.33626]
];

//Create a polyline using the line coordinates and make the line red
L.polyline(line, {
  color:"blue",
  weight:4,
  opacity:0.5,
  dashArray:'7'
}).addTo(map); */

//Get data from cities.js
//let cityData = cities;

// Grabbing our GeoJSON data

// Example with pointToLayer
/* 
L.geoJSON(sanFranAirport, {
  //We turn each feature into a marker on the map
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng)
    .bindPopup("<h3>" + feature.properties.name + "</h3> <hr> <h4>" + feature.properties.city + ", " + feature.properties.country + "</h4>");
  }
}).addTo(map); */

//Example with onEachFeature
/* L.geoJSON(sanFranAirport, {
  //We turn each feature into a marker on the map
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h3>Airport Code: "+ feature.properties.faa +"</h3> <hr> <h3>Airport name: "+ feature.properties.name + "</h3>");
     }
}).addTo(map); */

// Loop through the cities array and create one marker for each city.
/* cityData.forEach(function(city) {
  console.log(city)
  L.circleMarker(city.location, {
    radius: city.population/200000,
    weight: 4,
    color: "orange"
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3")
  .addTo(map)
 });
 */

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//Create a base layer that holds both maps
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
}

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
  };

//Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps,overlays).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create a style for the lines.
let myStyle = {
  color: "ffffa1",
  weight: 2,
  fillColor:"yellow"
}

// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {

    // This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  //Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {

    // We turn each feature into a circleMarker on the map.
    
        pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
        // we set the stylefor each circleMarker using our styleInfo function
        style:styleInfo,
        // We create a popup for each circleMarker to display the magnitude and
        //  location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
            }
        }).addTo(earthquakes);

        //Then we add the earthquake layer to our map
        earthquakes.addTo(map);
});