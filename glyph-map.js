let glyphMap;
let glyphMarkers;
let glyphLegend;
let glyphMax = 24, glyphMin = 12;
let HighPop2017 = 0, HighPop2016 = 0, HighPop2015 = 0;

$(document).ready(function() {
  
  //Setting Up Leaflet Map
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
  
  // Joining Data Sets
  $.each(data_2017, function(idx, val) {
    $.each(country_lat_lon, function(i, v) {
      if(val["Country"] == v["Country"]) {
        val["Lat"] = v["Latitude (average)"];
        val["Lon"] = v["Longitude (average)"];
      }
    });
    $.each(data_pop, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        val["Population"] = v["2017"];
        if(v["2017"] > HighPop2017) {
          HighPop2017 = v["2017"];
        }
      }
    });
  });
  $.each(data_2016, function(idx, val) {
    $.each(country_lat_lon, function(i, v) {
      if(val["Country"] == v["Country"]) {
        val["Lat"] = v["Latitude (average)"];
        val["Lon"] = v["Longitude (average)"];
      }
    });
    $.each(data_pop, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        val["Population"] = v["2016"];
        if(v["2016"] > HighPop2016) {
          HighPop2016 = v["2016"];
        }
      }
    });
  });
  $.each(data_2015, function(idx, val) {
    $.each(country_lat_lon, function(i, v) {
      if(val["Country"] == v["Country"]) {
        val["Lat"] = v["Latitude (average)"];
        val["Lon"] = v["Longitude (average)"];
      }
    });
    $.each(data_pop, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        val["Population"] = v["2015"];
        if(v["2015"] > HighPop2015) {
          HighPop2015 = v["2015"];
        }
      }
    });
  });
  
  generateGlyphMap();
  
  // Building Gylph Legend
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

function generateGlyphMap() {
  console.log("building");
  glyphMarkers.clearLayers();
  $.each($("#glyph-map-year option:selected").val() == "2017" ? data_2017 : $("#glyph-map-year option:selected").val() == "2016" ? data_2016 : data_2015, function(idx, val) {
    if(val["Happiness Rank"] < 31) {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/grin-beam-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"])}).addTo(glyphMap).bindPopup("<span class='f-16'>" + val["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2) + "<br>Population: " + delim(val["Population"])).addTo(glyphMarkers);  
    }
    else if(val["Happiness Rank"] < 61) {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/smile-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"])}).addTo(glyphMap).bindPopup("<span class='f-16'>" + val["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2) + "<br>Population: " + delim(val["Population"])).addTo(glyphMarkers);  
    }
    else if(val["Happiness Rank"] < 91) {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/meh-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"])}).addTo(glyphMap).bindPopup("<span class='f-16'>" + val["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2) + "<br>Population: " + delim(val["Population"])).addTo(glyphMarkers);  
    }
    else if(val["Happiness Rank"] < 121) {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/frown-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"])}).addTo(glyphMap).bindPopup("<span class='f-16'>" + val["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2) + "<br>Population: " + delim(val["Population"])).addTo(glyphMarkers);  
    }
    else {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/sad-tear-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"])}).addTo(glyphMap).bindPopup("<span class='f-16'>" + val["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2) + "<br>Population: " + delim(val["Population"])).addTo(glyphMarkers);  
    }
  });
}

function generateGlyph(url, rank, score, name, pop) {
  let size = 15;
  let data = $("#glyph-map-year option:selected").val() == "2017" ? data_2017 : $("#glyph-map-year option:selected").val() == "2016" ? data_2016 : data_2015;
  switch($("#glyph-map-size option:selected").val()) {
    case "u":
      break;
    case "rh":
      size = Math.round(((data.length - rank)/(data.length - 1))*glyphMax + glyphMin);
      break;
    case "rl":
      size = Math.round((rank/(data.length - 1))*glyphMax + glyphMin);
      break;
    case "sh":
      size = Math.round(score / 10 * glyphMax + glyphMin);
      break;
    case "sl":
      size = Math.round((10 - score) / 10 * glyphMax + glyphMin);
      break;
    case "p":
      let max = $("#glyph-map-year option:selected").val() == "2017" ? HighPop2017 : $("#glyph-map-year option:selected").val() == "2016" ? HighPop2016 : HighPop2015;
      size = Math.round((pop / max) * glyphMax + glyphMin);
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [size, size],
    popupAnchor: [0, 0]
  });
}

/*
 * Rounds Float values to dec decimal places
 */
function round(val, dec) {
  return Number(Math.round(val+'e'+dec)+'e-'+dec);
}
/*
 * Comma delimmits large positive integers for readability
 */
function delim(num) {
  let n = (num + "").split("");
  for (let i = n.length - 3; i > 0; i-=3) {
    n.splice(i, 0, ",");
  }
  n = n.join("");
  return n;
}