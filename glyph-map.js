let glyphMap;
let glyphMarkers;
let glyphLegend;
let glyphMax = 24, glyphMin = 12;
let restyle;
let makeChart;
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
        var scene = new THREE.Scene();
        
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 6000);
    camera.position.z = 500;
        
    //controls = new THREE.OrbitControls( camera );
    //controls.target.set( 0, 1.5, 0 );
    //controls.update();
        
    var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("earth_div").appendChild(renderer.domElement);

    var light = new THREE.HemisphereLight('#fff', '#666', 1.25);
    light.position.set(0, 500, 0);
    scene.add(light);
        
        
    let diffuseMap = new THREE.TextureLoader().load("textures/Albedo.jpg");
    let cloudMap = new THREE.TextureLoader().load("textures/Clouds.png");       
        
    var map_sphere = new THREE.SphereGeometry(200, 50, 50);
    var cloud_sphere = new THREE.SphereGeometry(210, 50, 50);
        
    var map_material = new THREE.MeshPhongMaterial({map: diffuseMap, transparent: true});  
        
    var cloud_material = new THREE.MeshPhongMaterial({
        map: cloudMap, 
        alphaMap: cloudMap,
        transparent: true,
        //side: THREE.DoubleSide,
        //opacity: 0.8,
        depthWrite: false,
    });   
        
    var earth = new THREE.Mesh(map_sphere, map_material);
    var clouds = new THREE.Mesh(cloud_sphere, cloud_material);
        
    var root = new THREE.Object3D();     
    root.add(earth);
    root.add(clouds);    
    scene.add(root);
       
    function render() {
      //root.rotation.y += 0.02;
      earth.rotation.y += .005;
      clouds.rotation.y +=.01;   
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    render();        
        
    
  let country_by_name = country_by_key();
  let countries_to_compare = [];
  let toggledCountries = [];
  let countries = topojson.feature(countryData, countryData.objects.countries);    
  
  //Setting Up Leaflet Map
  glyphMap = L.map('glyph-map').setView([20, 0], 2);
  
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
  
  toggledCountries["United States"]=1;
  countries_to_compare.push("United States");
  makeGraph($("#glyph-map-year option:selected").val());
  
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
    
    
    
//**************** D3 interactive overlay ************************

L.easyButton('<img src="/path/to/img/of/penguin.png">', function(btn, map){
    makeGraph($("#glyph-map-year option:selected").val());
    document.getElementById('glyph-map-year-bottom').scrollIntoView();
}).addTo( glyphMap );
    
// control that shows state info on hover
var info = L.control();

info.onAdd = function (glyphMap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    let text = '<h4>Country</h4><b>';
    if(props){
        text += props;    
    } else {
        text += "No Country Selected";
    }
    text += '</b><br />';      
    if(countries_to_compare.length > 0){
        for(let i=0; i<countries_to_compare.length; i++){
            text+= countries_to_compare[i] + ", ";
            if(i>3){
                text+= "....";
                break;
            }
        }
    }else{
        text += "No Countries Selected";
    }
    this._div.innerHTML = text;

};

info.addTo(glyphMap);


// get color depending on happiness rank

function style(feature) {
  let year = $("#glyph-map-year option:selected").val();
  let data = year == 2017 ? country_by_name[2] : year == 2016 ? country_by_name[1] : country_by_name[0];
  let featureStyle;
  //console.log(data[feature.id]);
  let clr = data[feature.id] == null ? "#333" : data[feature.id]["Happiness Rank"] < 31 ? "#40ff00" : 
    data[feature.id]["Happiness Rank"] < 61 ? "#99ff66" :
    data[feature.id]["Happiness Rank"] < 91 ? "#00ffbf" :
    data[feature.id]["Happiness Rank"] < 121 ? "#00bfff" :"#0040ff";
    if(toggledCountries[feature.id] == undefined ||
    toggledCountries[feature.id] == 0){
        featureStyle = {
            weight: 2,
            opacity: 0.5,
            color: clr,
            dashArray: '3',
            fillOpacity: 0.7
            //fillColor: getColor(feature.properties.density)
        };
    }else{
        featureStyle = {
            weight: 5,
            color: clr,
            dashArray: '',
            fillOpacity: 0.05
      };
    }
  return featureStyle;
}

restyle = function() {
  console.log("ran");
  $.each(geojson._layers, function(i, val){
    //console.log(val);
    //console.log(val.feature);
    glyphMap.removeLayer(val);
    
  });
  geojson = L.geoJson(countries, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(glyphMap);  
} 

function highlightFeature(e) {
    var layer = e.target;
    //console.log(e.target.feature);
    layer.setStyle({
        weight: 5,
        //color: '#666',
        dashArray: '',
        fillOpacity: 0.05
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.id);
}

function resetHighlight(e) {
  if(toggledCountries[e.target.feature.id] == undefined ||
    toggledCountries[e.target.feature.id] == 0){
  geojson.resetStyle(e.target);
  info.update();
  }
}

function toggleFeature(e) {
    if(toggledCountries[e.target.feature.id] == undefined || toggledCountries[e.target.feature.id] == 0){
        toggledCountries[e.target.feature.id] = 1;
        countries_to_compare.push(e.target.feature.id);
    } else {
        toggledCountries[e.target.feature.id] = 0; 
        resetHighlight(e);
        for(let i=0; i< countries_to_compare.length; i++){
            if(countries_to_compare[i] === e.target.feature.id){
                countries_to_compare.splice(i, 1);
                break;
            }
        }
    }
    //console.log(countries_to_compare);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: toggleFeature
    });
    if(feature.id == "United States") {
      layer.setStyle({
        weight: 5,
        dashArray: '',
        fillOpacity: 0.05
    });
    }
}

let geojson = L.geoJson(countries, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(glyphMap);    
    
 
function makeGraph(selectedYear){
    //let year = $("#glyph-map-year option:selected").val();
    let year = selectedYear;
    let countries_to_graph = [];
    let country_array;
    if(year === '2015'){
        country_array = country_by_name[0];
    }else if(year === '2016'){
        country_array = country_by_name[1];
    }else{
        country_array = country_by_name[2];
    }
    document.getElementById("glyph-map-year-bottom").value=selectedYear;
    document.getElementById("glyph-map-year").value=selectedYear;
    for(let i=0; i< countries_to_compare.length; i++){
        //console.log(country_names_2016[countries_to_compare[i]]);
        if(country_array[countries_to_compare[i]] !== undefined){
            countries_to_graph[countries_to_compare[i]] = country_array[countries_to_compare[i]];
        }
    }
    document.getElementById('chart_viz').style.height = "500px";
    document.getElementById('individual-view').style.display = "inline";
    //document.getElementById('individual_charts').style.height = "500px"; 
    chartCountries("chart_viz", year,
                   "population_chart", "gdp_chart", "landmass_chart",
                   "population_density_char","gdp_per_capita_chart",
                   countries_to_graph);
    //document.getElementById('chart_viz').scrollIntoView();
    if (countries_to_compare.length === 0) {
      $('#country-select2').val('Select a Country');
      $('#country-select2').trigger('change');
    } else {
      $('#country-select2').val(countries_to_compare[0]); //Grabs first selected country and selects it for individual view
      $('#country-select2').trigger('change');
    }
}   
    
makeChart = makeGraph;
    
 document.getElementById("back_to_map").addEventListener("click", scrollToMap);
    
function scrollToMap(){
        document.getElementById('glyph-map-year').scrollIntoView();
}
    
    
//**************** end of D3 interactive overlay ***********************  
    
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
  let size = 16;
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
    case "u":
      rtn +=  "<br>Population: " + delim(val["Population"]);
      rtn +=  "<br>Land Mass (km<sup>2</sup>): " + delim(val["Land Mass"]);
      rtn +=  "<br>Population Density: " + round(val["Population"] / val["Land Mass"], 2);
      rtn +=  "<br>GDP ($): " + (val["GDP"] == "" ? "Unknown" : delim(val["GDP"]));
      rtn +=  "<br>GDP per Capita ($): " + (val["GDP"] == "" ? "Unknown" : delim(Math.round(val["GDP"] / val["Population"])));
      break;
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

