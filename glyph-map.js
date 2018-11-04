let glyphMap;
let glyphMarkers;
let glyphLegend;

$(document).ready(function() {
  console.log( "ready!" );
  glyphMap = L.map('glyph-map').setView([0, 0], 2);
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {//TODO API KEY
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, ' + 
      'Icons from <a href="https://fontawesome.com/">Font Awesome</a>',
		id: 'mapbox.dark'
	}).addTo(glyphMap);
  
  glyphMarkers = L.layerGroup().addTo(glyphMap);
  
  generateGlyphMap();
  
  glyphLegend = L.control({position: "bottomleft"});
  glyphLegend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'glyph-map-legend px-2 py-1');
    div.innerHTML += '<div class="text-center"><span class="text-light f-16">Rank</span></div>';
    div.innerHTML += '<img src="icons/grin-beam-solid.svg" class="mb-1 mr-1"><span class="text-light">&nbsp;1 to 30</span><br>';
    div.innerHTML += '<img src="icons/smile-solid.svg" class="mb-1 mr-1"><span class="text-light">&nbsp;31 to 60</span><br>';
    div.innerHTML += '<img src="icons/meh-solid.svg" class="mb-1 mr-1"><span class="text-light">&nbsp;61 to 90</span><br>';
    div.innerHTML += '<img src="icons/frown-solid.svg" class="mb-1 mr-1"><span class="text-light">&nbsp;91 to 120</span><br>';
    div.innerHTML += '<img src="icons/sad-tear-solid.svg" class=" mr-1"><span class="text-light">&nbsp;121+</span><br>';
    return div;
  };
  glyphLegend.addTo(glyphMap);
  
});

let glyph = L.icon({
  iconUrl: 'icons/grin-beam-solid.svg',
  iconSize:     [15, 15],
  popupAnchor:  [0, 0] 
});
let glyph2 = L.icon({
  iconUrl: 'icons/smile-solid.svg',
  iconSize:     [15, 15],
  popupAnchor:  [0, 0] 
});
let glyph3 = L.icon({
  iconUrl: 'icons/meh-solid.svg',
  iconSize:     [15, 15],
  popupAnchor:  [0, 0] 
});
let glyph4 = L.icon({
  iconUrl: 'icons/frown-solid.svg',
  iconSize:     [15, 15],
  popupAnchor:  [0, 0] 
});
let glyph5 = L.icon({
  iconUrl: 'icons/sad-tear-solid.svg',
  iconSize:     [15, 15],
  popupAnchor:  [0, 0] 
});

function generateGlyphMap() {
  console.log("building");
  glyphMarkers.clearLayers();
  $.each($("#glyph-map-year option:selected").val() == "2017" ? data_2017 : $("#glyph-map-year option:selected").val() == "2016" ? data_2016 : data_2015, function(idx, val){
    $.each(country_lat_lon, function(i, v) {
      if(val["Country"] == v["Country"]) {
        if(val["Happiness Rank"] < 31) {
          L.marker([v["Latitude (average)"], v["Longitude (average)"]], {icon: glyph}).addTo(glyphMap).bindPopup("<span class='f-16'>" + v["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2)).addTo(glyphMarkers);  
        }
        else if(val["Happiness Rank"] < 61) {
          L.marker([v["Latitude (average)"], v["Longitude (average)"]], {icon: glyph2}).addTo(glyphMap).bindPopup("<span class='f-16'>" + v["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2)).addTo(glyphMarkers);  
        }
        else if(val["Happiness Rank"] < 91) {
          L.marker([v["Latitude (average)"], v["Longitude (average)"]], {icon: glyph3}).addTo(glyphMap).bindPopup("<span class='f-16'>" + v["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2)).addTo(glyphMarkers);  
        }
        else if(val["Happiness Rank"] < 121) {
          L.marker([v["Latitude (average)"], v["Longitude (average)"]], {icon: glyph4}).addTo(glyphMap).bindPopup("<span class='f-16'>" + v["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2)).addTo(glyphMarkers);  
        }
        else {
          L.marker([v["Latitude (average)"], v["Longitude (average)"]], {icon: glyph5}).addTo(glyphMap).bindPopup("<span class='f-16'>" + v["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2)).addTo(glyphMarkers);  
        }
      }
    });
  });
  
}

function round(val, dec) {
  return Number(Math.round(val+'e'+dec)+'e-'+dec);
}