let glyphMap;
let glyphMarkers;
let glyphLegend;
let glyphMax = 24, glyphMin = 12;
const HighPop = {
  "2017": 0,
  "2016": 0,
  "2015": 0
}
const HighLand = {
  "2017": 0,
  "2016": 0,
  "2015": 0
}
const HighPD = {
  "2017": 0,
  "2016": 0,
  "2015": 0
}
const HighGDP = {
  "2017": 0,
  "2016": 0,
  "2015": 0
}
const HighGDPPC = {
  "2017": 0,
  "2016": 0,
  "2015": 0
}


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
  // 2017
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
        if(v["2017"] > HighPop["2017"]) {
          HighPop["2017"] = v["2017"];
        }
      }
    });
    $.each(data_land, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        val["Land Mass"] = v["2017"];
        if(v["2017"] > HighLand["2017"]) {
          HighLand["2017"] = v["2017"];
        }
      }
    });
    if (val["Population"] / val["Land Mass"] > HighPD["2017"]) {
      HighPD["2017"] = val["Population"] / val["Land Mass"];
    }
    $.each(data_GDP, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        match = 1;
        val["GDP"] = v["2017"];
        if(v["2017"] > HighGDP["2017"]) {
          HighGDP["2017"] = v["2017"];
        }
      }
    });
    if (val["GDP"] != "" && val["GDP"] / val["Population"] > HighGDPPC["2017"]) {
      HighGDPPC["2017"] = val["GDP"] / val["Population"];
    }
  });
  // 2016
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
        if(v["2016"] > HighPop["2016"]) {
          HighPop["2016"] = v["2016"];
        }
      }
    });
    $.each(data_land, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        val["Land Mass"] = v["2016"];
        if(v["2016"] > HighLand["2016"]) {
          HighLand["2016"] = v["2016"];
        }
      }
    });
    if (val["Population"] / val["Land Mass"] > HighPD["2016"]) {
      HighPD["2016"] = val["Population"] / val["Land Mass"];
    }
    $.each(data_GDP, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        val["GDP"] = v["2016"];
        if(v["2016"] > HighGDP["2016"]) {
          HighGDP["2016"] = v["2016"];
        }
      }
    });
    if (val["GDP"] != "" && val["GDP"] / val["Population"] > HighGDPPC["2016"]) {
      HighGDPPC["2016"] = val["GDP"] / val["Population"];
    }
  });
  // 2015
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
        if(v["2015"] > HighPop["2015"]) {
          HighPop["2015"] = v["2015"];
        }
      }
    });
    $.each(data_land, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        val["Land Mass"] = v["2015"];
        if(v["2015"] > HighLand["2015"]) {
          HighLand["2015"] = v["2015"];
        }
      }
    });
    if (val["Population"] / val["Land Mass"] > HighPD["2015"]) {
      HighPD["2015"] = val["Population"] / val["Land Mass"];
    }
    $.each(data_GDP, function(i, v) {
      if(val["Country"] == v["Country Name"]) {
        val["GDP"] = v["2015"];
        if(v["2015"] > HighGDP["2015"]) {
          HighGDP["2015"] = v["2015"];
        }
      }
    });
    if (val["GDP"] != "" && val["GDP"] / val["Population"] > HighGDPPC["2015"]) {
      HighGDPPC["2015"] = val["GDP"] / val["Population"];
    }
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
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/grin-beam-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"], val["Land Mass"], val["GDP"])}).addTo(glyphMap).bindPopup(generatePopUpText(val)).addTo(glyphMarkers);  
    }
    else if(val["Happiness Rank"] < 61) {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/smile-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"], val["Land Mass"], val["GDP"])}).addTo(glyphMap).bindPopup(generatePopUpText(val)).addTo(glyphMarkers);  
    }
    else if(val["Happiness Rank"] < 91) {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/meh-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"], val["Land Mass"], val["GDP"])}).addTo(glyphMap).bindPopup(generatePopUpText(val)).addTo(glyphMarkers);  
    }
    else if(val["Happiness Rank"] < 121) {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/frown-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"], val["Land Mass"], val["GDP"])}).addTo(glyphMap).bindPopup(generatePopUpText(val)).addTo(glyphMarkers);  
    }
    else {
      L.marker([val["Lat"], val["Lon"]], {icon: generateGlyph('icons/sad-tear-solid.svg', val["Happiness Rank"], val["Happiness Score"], val["Country"], val["Population"], val["Land Mass"], val["GDP"])}).addTo(glyphMap).bindPopup(generatePopUpText(val)).addTo(glyphMarkers);  
    }
  });
}

function generateGlyph(url, rank, score, name, pop, land, gdp) {
  let size = 15;
  let data = $("#glyph-map-year option:selected").val() == "2017" ? data_2017 : $("#glyph-map-year option:selected").val() == "2016" ? data_2016 : data_2015;
  let max;
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
      max = HighPop[$("#glyph-map-year option:selected").val()];
      size = Math.round((((pop / max) * Math.sqrt(1/(pop/max))) * glyphMax) + glyphMin);
      break;
    case "l":
      max = HighLand[$("#glyph-map-year option:selected").val()];
      size = Math.round((((land / max) * Math.sqrt(1/(land/max))) * glyphMax) + glyphMin);
      break;
    case "pd":
      max = HighPD[$("#glyph-map-year option:selected").val()];
      size = Math.round((((pop / land / max) * Math.sqrt(1/(pop / land / max))) * glyphMax) + glyphMin);
      break;
    case "g":
      max = HighGDP[$("#glyph-map-year option:selected").val()];
      size = gdp == "" ? glyphMin : Math.round((((gdp / max) * Math.sqrt(1/(gdp / max))) * glyphMax) + glyphMin);
      break;
    case "gc":
      max = HighGDPPC[$("#glyph-map-year option:selected").val()];
      size = gdp == "" ? glyphMin : Math.round((((gdp / pop / max) * Math.sqrt(1/(gdp / pop / max))) * glyphMax) + glyphMin);
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [size, size],
    popupAnchor: [0, 0]
  });
}
function generatePopUpText(val) {
  let rtn = "<span class='f-16'>" + val["Country"] + "</span><br>Rank: " + val["Happiness Rank"] + "&nbsp;&nbsp;&nbsp;Score: " + round(val["Happiness Score"], 2);
  switch($("#glyph-map-size option:selected").val()) {
    case "p":
      rtn +=  "<br>Population: " + delim(val["Population"]);
      break;
    case "l":
      rtn +=  "<br>Land Mass (km<sup>2</sup>): " + delim(val["Land Mass"]);
      break;
    case "pd":
      rtn +=  "<br>Land Mass (km<sup>2</sup>): " + delim(val["Land Mass"]);
      rtn +=  "<br>Population: " + delim(val["Population"]);
      rtn +=  "<br>Population Density: " + round(val["Population"] / val["Land Mass"], 2);
      break;
    case "g":
      rtn +=  "<br>GDP ($): " + (val["GDP"] == "" ? "Unknown" : delim(val["GDP"]));
      break;
    case "gc":
      rtn +=  "<br>Population: " + delim(val["Population"]);
      rtn +=  "<br>GDP ($): " + (val["GDP"] == "" ? "Unknown" : delim(val["GDP"]));
      rtn +=  "<br>GDP per Capita ($): " + (val["GDP"] == "" ? "Unknown" : delim(Math.round(val["GDP"] / val["Population"])));
      break;
  }
  return rtn;
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