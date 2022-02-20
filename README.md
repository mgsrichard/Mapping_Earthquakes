# Mapping_Earthquakes

This week we learned how to use Leaflet, an open source JavacScript mapping library, to create interactive maps where the user can toggle between different background maps and overlays.  To use Leaflet, we learned about GeoJSON data as well. In our challenge, we created a map using live data from the US Geological Survey to show all earthquakes that have occurred globally in the last 7 days.  

Key steps in setting up this Leaflet mapping project:

  1. Create the map object with a center, zoom level, and default layer
  2. Set up the index.html as shown here in Leaflet documentation: https://leafletjs.com/examples/quick-start/
  3. Create the tile layers for your base maps, grab these from the quick start link above, or copy from another project. Here we have streets, satellite, and dark views.
      - To use a different tile layer, look for streets-v11 in the url for the tile layer and replace with one of the other options (like dark-v10) , options are given nicely here: https://docs.mapbox.com/api/maps/styles/
  4. Create the base layer that contains all 3 base map options
  5. Create 3 overlay options with L.LayerGroup(), assign the contents to them later in the code. The 3 options here are for all earthquakes, tectonic plates, and major earthquakes.
  6. Create a control layer with L.control.layers() to enable the user to toggle between the choices of base map and overlay maps
  7. Retrieve the GeoJSON data from web or computer, and use d3.json to open it. Then, within this function, prep it to assign to the overlay options you assigned. This is probably where most of the code is.
  - Create functions for styling the data the way you want on the map, here we created StyleInfo, StyleInfoMajorEQ, getColor, getColor2, and getRadius.
  - Call GeoJson to get the data set the way you want for the map. Use pointToLayer and onEachFeature to loop through GeoJson geometry data points and put them on the map, using L.marker() or L.circleMarker to create a marker for point data. Use .bindPopup to make a popup appear on each feature with the info you want, coding it in "" with html inside the function
  - Use addTo to connect the pieces where you want them to go, on various maps or layers
  
     
 
  
