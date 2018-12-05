 function plot_data_trends() {
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
     
 $.each(data_2017, function(idx, val) {
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
  });
  // 2016
  $.each(data_2016, function(idx, val) {
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
  });
  // 2015
  $.each(data_2015, function(idx, val) {
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
  });
     
     
        var happiness = [];
        happiness[0] = [];
        happiness[1] = [];
        happiness[2] = [];
        for(var i=0; i<3; i++){
            happiness[i]['name'] = [];
            happiness[i]['gdp'] = [];
            happiness[i]['family'] = [];
            happiness[i]['health'] = [];
            happiness[i]['freedom'] = [];
            happiness[i]['trust'] = [];
            happiness[i]['generosity'] = [];
            happiness[i]['dystopia'] = [];
            happiness[i]['score'] = [];
            happiness[i]['population'] = [];
            happiness[i]['land'] = [];
            happiness[i]['pop_density'] = [];
        }
   //console.log(data_2015);
        for(var i=0; i<data_2015.length; i++) {   
            happiness[0]['name'].push(data_2015[i]["Country"]);
            happiness[0]['gdp'].push(data_2015[i]["Economy (GDP per Capita)"]);
            happiness[0]['family'].push(data_2015[i]["Family"]);
            happiness[0]['health'].push(data_2015[i]["Health (Life Expectancy)"]);
            happiness[0]['freedom'].push(data_2015[i]["Freedom"]);
            happiness[0]['generosity'].push(data_2015[i]["Trust (Government Corruption)"]);
            happiness[0]['trust'].push(data_2015[i]["Generosity"]);
            happiness[0]['dystopia'].push(data_2015[i]["Dystopia Residual"]);
            happiness[0]['score'].push(data_2015[i]["Happiness Score"]);
            happiness[0]['population'].push(data_2015[i]["Population"]);
            happiness[0]['land'].push(data_2015[i]["Land Mass"]);
            let density = data_2015[i]["Population"] / data_2015[i]['Land Mass'];
            happiness[0]['pop_density'].push(density);
        }
        
        for(var i=0; i<data_2016.length; i++) {   
            happiness[1]['name'].push(data_2016[i]["Country"]);
            happiness[1]['gdp'].push(data_2016[i]["Economy (GDP per Capita)"]);
            happiness[1]['family'].push(data_2016[i]["Family"]);
            happiness[1]['health'].push(data_2016[i]["Health (Life Expectancy)"]);
            happiness[1]['freedom'].push(data_2016[i]["Freedom"]);
            happiness[1]['trust'].push(data_2016[i]["Trust (Government Corruption)"]);
            happiness[1]['generosity'].push(data_2016[i]["Generosity"]);
            happiness[1]['dystopia'].push(data_2016[i]["Dystopia Residual"]);
            happiness[1]['score'].push(data_2016[i]["Happiness Score"]);
            happiness[1]['population'].push(data_2016[i]["Population"]);
            happiness[1]['land'].push(data_2016[i]["Land Mass"]);
            let density = data_2016[i]["Population"] / data_2016[i]['Land Mass'];
            happiness[1]['pop_density'].push(density);
            
        }

        for(var i=0; i<data_2017.length; i++) {
            happiness[2]['name'].push(data_2017[i]["Country"]);
            happiness[2]['gdp'].push(data_2017[i]["Economy..GDP.per.Capita."]);
            happiness[2]['family'].push(data_2017[i]["Family"]);
            happiness[2]['health'].push(data_2017[i]["Health..Life.Expectancy."]);
            happiness[2]['freedom'].push(data_2017[i]["Freedom"]);
            happiness[2]['trust'].push(data_2017[i]["Trust..Government.Corruption."]);
            happiness[2]['generosity'].push(data_2017[i]["Generosity"]);
            happiness[2]['dystopia'].push(data_2017[i]["Dystopia.Residual"]);
            happiness[2]['score'].push(data_2017[i]["Happiness Score"]);
            happiness[2]['population'].push(data_2017[i]["Population"]);
            happiness[2]['land'].push(data_2017[i]["Land Mass"]);
            let density = data_2017[i]["Population"] / data_2017[i]['Land Mass'];
            happiness[2]['pop_density'].push(density);
            
        }
      
        count = 0;
        var trace = [];
        trace[0] = [];
        trace[1] = [];
        trace[2] = [];
        
        var trace_dystopia = [];
        trace_dystopia[0] = [];
        trace_dystopia[1] = [];
        trace_dystopia[2] = [];
     
        var font_color = '#FFFFFF';
 //plot vs happiness score       
        for(var i=0; i<3; i++){
            for(var key in happiness[i]) {
                if(key!=='Happiness Score' || key !== 'Country'){
                    var temp_trace = {
                      x: happiness[i][key],
                      y: happiness[i]['score'],
                      mode: 'markers',
                      marker: {
                        size: 40,
                        //color: region_2016
                      },
                      type: 'scatter',
                      name: 'Year: ' + (i+ 2015),
                      text: happiness[i]['name'],
                      textposition: 'top center',
                      textfont: {
                        color: font_color,
                        family:  'Raleway, sans-serif'
                      },
                      marker: { size: 12 }
                    };
                    trace[i][key] = temp_trace;
                }
            }
        }
        var data = [];
        for(var key in trace[0]){
            var temp = [];
            for(var i=0; i<3; i++){
                temp.push(trace[i][key]);
            }
            data[key] = temp;
        }
        console.log(data['population']);
//plot vs distopian residule 
     /*
        for(var i=0; i<3; i++){
            for(var key in happiness[i]) {
                if(key!=='score' || key !== 'name' 
                  || key !== 'dystopia'){
                    var temp_trace = {
                      x: happiness[i][key],
                      y: happiness[i]['dystopia'],
                      mode: 'markers',
                      marker: {
                        size: 40,
                        //color: region_2016
                      },
                      type: 'scatter',
                      name: 'Year: ' + (i+ 2015),
                      text: happiness[i]['name'],
                      textposition: 'top center',
                      textfont: {
                        family:  'Raleway, sans-serif'
                      },
                      marker: { size: 12 }
                    };
                    trace_dystopia[i][key] = temp_trace;
                }
            }
        }
        var data_dystopia = [];
        for(var key in trace_dystopia[0]){
            var temp = [];
            for(var i=0; i<3; i++){
                temp.push(trace_dystopia[i][key]);
            }
            data_dystopia[key] = temp;
        }
     */   
        Plotly.newPlot('gdp_score', data['gdp'], layout['gdp']);
        Plotly.newPlot('family_score', data['family'], layout['family']);
        Plotly.newPlot('health_score', data['health'], layout['health']);
        Plotly.newPlot('freedom_score', data['freedom'], layout['freedom']);
        Plotly.newPlot('generosity_score', data['generosity'], layout['generosity']);
        Plotly.newPlot('trust_score', data['trust'], layout['trust']);
        Plotly.newPlot('population_score', data['population'],layout['population']);
        Plotly.newPlot('land_score', data['land'], layout['land']);    
        Plotly.newPlot('population_density_score', data['pop_density'], layout['pop_density']);
        
/*
        Plotly.newPlot('gdp_dystopia', data_dystopia['gdp'], layout['gdp_dystopia']);
        Plotly.newPlot('family_dystopia', data_dystopia['family'], layout['family_dystopia']);
        Plotly.newPlot('health_dystopia', data_dystopia['health'], layout['health_dystopia']);
        Plotly.newPlot('freedom_dystopia', data_dystopia['freedom'], layout['freedom_dystopia']);
        Plotly.newPlot('generosity_dystopia', data_dystopia['generosity'], layout['generosity_dystopia']);
        Plotly.newPlot('trust_dystopia', data_dystopia['trust'], layout['trust_dystopia']);
*/
 }