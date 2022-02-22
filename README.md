# Mapping_Earthquakes

This week we learned how to use Leaflet, an open source JavacScript mapping library, to create interactive maps where the user can toggle between different background maps and overlays.  To use Leaflet, we learned about GeoJSON data as well. In our challenge, we created a map using live data from the US Geological Survey to show all earthquakes that have occurred globally in the last 7 days.  

Key steps in setting up this Leaflet mapping project:

  1. Create the map object with a center, zoom level, and default layer
  2. Set up the index.html as shown here in Leaflet documentation: https://leafletjs.com/examples/quick-start/
  3. Create the tile layers for your base maps, grab these from the quick start link above, or copy from another project. Here we have streets, satellite, and dark views.
      - To use a different tile layer, look for streets-v11 in the url for the tile layer and replace with one of the other options (like dark-v10) , options are given nicely here: https://docs.mapbox.com/api/maps/styles/
  4. Create the base layer that contains all 3 base map options
  5. Create overlay options with L.LayerGroup(), assign the contents to them later in the code. The options here are for all earthquakes, tectonic plates, and major earthquakes.
  6. Create a control layer with L.control.layers() to enable the user to toggle between the choices of base map and overlay maps
  7. Retrieve the GeoJSON data from web or computer, and use d3.json to open it. Then, within this function, prep it to assign to the overlay options you assigned. This is probably where most of the code is. Inside here we:
      - Create functions for styling the data the way you want on the map, here we created StyleInfo, getColor, and getRadius.
      - Call GeoJson to get the data set the way you want for the map. Use pointToLayer and onEachFeature to loop through GeoJson geometry data points and put them on the map, using L.marker() or L.circleMarker to create a marker for point data. Use .bindPopup to make a popup appear on each feature with the info you want, coding it in "" with html inside the function
      - Use addTo to connect the pieces where you want them to go, on various maps or layers
  
     
     Here's what my map should look like when it first loads:
     
     ![map load image](https://github.com/mgsrichard/Mapping_Earthquakes/blob/main/Earthquake_Challenge/Load%20image.png)
     
     
 The instructions for the challenge said to change the color function to use three colors for the major earthquakes map. What I did was to  add to the logic to make another color, purple, for earthquakes of magnitude of 6 and more. This function also applies the new 6+ magnitude color to the original earthquakes layer. This makes the two layers consistent with each other, so if the user is toggling the major earthquakes layer and the all earthquakes layer on and off then they have the same look and same colors for the same magnitudes. The instructions also say that the major earthquakes map should have only three colors, and since we only show magnitudes of 4.5 and higher in that layer then only three colors show, since 4 displays orange, and 5 displays red, and 6 and above displays as purple. I also altered the legend to include the new purple for magnitude 6 and above there too. 
