var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 10
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

 //d3.csv("Resources/chicago_clean.csv", function(chicagoData) {console.log(chicagoData)});
 //d3.csv("Resources/seattle_clean.csv", function(seattleData) {console.log(seattleData)});
 //d3.csv("Resources/nyc_clean.csv", function(nycData) {console.log(nycData)});

 
//d3.csv("Resources/chi_sum.csv").then(function(data) {
  //var test = (data.Neighbourhood == "Woodlawn") 
  //console.log(test.Neighbourhood)

//});




 
//var data = chisum.filter(function (d) {return (d.Neighbourhood == "Hyde Park") })
//console.log(data);

 

 // Use this link to get the geojson data.
var link = "NData/chiN.geojson";

// Our style object
var mapStyle = {
  color: "white",
  fillColor: "blue",
  fillOpacity: 0.5,
  weight: 1.5
};

function chooseOpac(X) {
  return (X.properties.Price/200)
}


// Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "blue",
        fillOpacity: chooseOpac(feature),
        weight: 1.5
      };
    },
onEachFeature: function(feature, layer) {
  // Set mouse events to change map styling
  layer.on({
    // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
    mouseover: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9
      });
    },
    // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
    mouseout: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.5
      });
    },
    
  });
  layer.bindPopup("<h1>" + feature.properties.community + "</h1> <hr> <h2>" + feature.properties.Price + "</h1> <hr> <h2>" + feature.properties.Number + "</h2>");

    }
  }).addTo(myMap);
});
