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

//Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create a style for the lines.
let myStyle = {
  color: "blue",
  weight: 1,
  fillColor:"yellow"
}

// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
  console.log(data);
  //Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data).addTo(map);
});