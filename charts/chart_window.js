function chartCountries(chart_div, year, population_div, gdp_div, landmass_div, population_density_div, gdp_per_capita_div, countries) {
console.log("chart countries :");
console.log(countries);
    let countries_to_graph = [];
    let country_names = [];
     var axis_color = '#FFFFFF';
    var plot_grid_color;
    var plot_outer_color;
       
    for(let country in countries){
        let total = [];
        let c1_value_names = [];
        let c1_values = [];
        let rank = '';
        let populations = [];
        let gdp = [];
        let landmass = [];
        for(let key in countries[country]){
            if(key!== 'Country' && key!== 'Region' && key!== 'Happiness Rank' &&
               key!== 'Lower Confidence Interval' && key!== 'Upper Confidence Interval' && key!=='Lat' && key!== 'Lon' && key!== 'Population' && key!== 'Land Mass' && key!== 'GDP' && key!== 'Whisker.high' && key!== 'Whisker.low' && key!== 'Standard Error')
            {
                c1_value_names.push(key);
                c1_values.push(countries[country][key]);
            }
            if(key === 'Population'){
                populations.push(countries[country][key]);
            }
            if(key === 'Land Mass'){
                landmass.push(countries[country][key]);
            }
            if(key === 'GDP'){
                gdp.push(countries[country][key]);
            }
            if(key === 'Happiness Rank'){
                rank = countries[country][key];
            }
        }

        total.push(c1_value_names);
        total.push(c1_values);
        total.push(country);
        total.push(populations);
        total.push(gdp);
        total.push(landmass);
        total.push(rank);
        countries_to_graph.push(total);
    }
    let trace = [];
    let pop_trace = [];
    let gdp_trace = [];
    let landmass_trace = [];
    let gdp_per_capita_trace = [];
    let population_density_trace = [];

    for(let i=0; i<countries_to_graph.length; i++){
        let gdp_per_capita = countries_to_graph[i][4] / countries_to_graph[i][3];
        let population_density = countries_to_graph[i][3] / countries_to_graph[i][5];
        
        countries_to_graph[i].push([gdp_per_capita]);
        countries_to_graph[i].push([population_density]);

    }
    for(let key in countries_to_graph){
        let newTrace = {
            x: countries_to_graph[key][0],
            y: countries_to_graph[key][1],
            name: countries_to_graph[key][2],
            type: 'bar',
            textfont: {
                color: axis_color
            }
        };
        let newTrace_pop = {
            x: ['population'],
            y: countries_to_graph[key][3],
            name: countries_to_graph[key][2],
            type: 'bar',
            textfont: {
                color: axis_color
            }
        };
        let newTrace_gdp = {
            x: ['gdp'],
            y: countries_to_graph[key][4],
            name: countries_to_graph[key][2],
            type: 'bar',
            textfont: {
                color: axis_color
            }
        };
        let newTrace_land = {
            x: ['land mass'],
            y: countries_to_graph[key][5],
            name: countries_to_graph[key][2],
            type: 'bar',
            textfont: {
                color: axis_color
            }
        };
        let newTrace_gdp_per_capita = {
            x: ['gdp per capita'],
            y: countries_to_graph[key][7],
            name: countries_to_graph[key][2],
            type: 'bar',
            textfont: {
                color: axis_color
            }            
        };
        let newTrace_population_density = {
            x: ['population density'],
            y: countries_to_graph[key][8],
            name: countries_to_graph[key][2],
            type: 'bar',
            textfont: {
                color: axis_color
            }
        };        
        trace.push(newTrace);
        pop_trace.push(newTrace_pop);
        gdp_trace.push(newTrace_gdp);
        landmass_trace.push(newTrace_land);
        gdp_per_capita_trace.push(newTrace_gdp_per_capita);
        population_density_trace.push(newTrace_population_density);
    }
    var data = trace;
    
    var layout = {barmode: 'group',
                 title: 'World Happiness Breakdown: ' + year,
                 font: {
                   size: 12,
                   color: axis_color
                 },
                 titlefont: {
                    size: 16,
                    color: axis_color
                 },
                 plot_bgcolor: "rgba(0,0,0,0)",
                 paper_bgcolor: 'rgba(0,0,0,0)',  
                 margin: {
                     b:150
                 }};
    var layout2 = {barmode: 'group',
                 title:'Population comparison for year: ' + year,
                 font: {
                   size: 12,
                   color: axis_color
                 },
                 titlefont: {
                    size: 16,
                    color: axis_color
                 },                   
                 plot_bgcolor: "rgba(0,0,0,0)",
                 paper_bgcolor: 'rgba(0,0,0,0)',   
                 yaxis: {
                    title: 'Number of People',
                    titlefont: {
                      //family: 'Courier New, monospace',
                      size: 12,
                      color: axis_color
                    }
                 },                   
                 margin: {
                     b:150
                 }};
    var layout3 = {barmode: 'group',
                 title:'Overall GDP comparison for year: ' + year,
                 font: {
                   size: 12,
                   color: axis_color
                 },
                 titlefont: {
                    size: 16,
                    color: axis_color
                 },                   
                 plot_bgcolor: "rgba(0,0,0,0)",
                 paper_bgcolor: 'rgba(0,0,0,0)',   
                 yaxis: {
                    title: 'Overall GDP ($)',
                    titlefont: {
                      //family: 'Courier New, monospace',
                      size: 12,
                      color: axis_color
                    }
                 }, 
                 margin: {
                     b:150
                 }};
    var layout4 = {barmode: 'group',
                 title:'Land Mass comparison for year: ' + year,
                  font: {
                   size: 12,
                   color: axis_color
                 },
                 titlefont: {
                    size: 16,
                    color: axis_color
                 },                  
                 plot_bgcolor: "rgba(0,0,0,0)",
                 paper_bgcolor: 'rgba(0,0,0,0)',
                 yaxis: {
                    title: 'Land Mass (km^2)',
                    titlefont: {
                      //family: 'Courier New, monospace',
                      size: 12,
                      color: axis_color
                    }
                 },                    
                 margin: {
                     b:150
                 }};
    var layout5 = {barmode: 'group',
                 title:'Gdp per Capita: ' + year,
                 font: {
                   size: 12,
                   color: axis_color
                 },
                 titlefont: {
                    size: 16,
                    color: axis_color
                 },                  
                 plot_bgcolor: "rgba(0,0,0,0)",
                paper_bgcolor: 'rgba(0,0,0,0)',
                 yaxis: {
                    title: 'average GDP per perosn ($)',
                    titlefont: {
                      //family: 'Courier New, monospace',
                      size: 12,
                      color: axis_color
                    }
                 },                    
                 margin: {
                     b:150
                 }};
        var layout6 = {barmode: 'group',
                 title:'Population Density: ' + year,
                  font: {
                   size: 12,
                   color: axis_color
                 },
                 titlefont: {
                    size: 16,
                    color: axis_color
                 },                      
                 plot_bgcolor: "rgba(0,0,0,0)",
                 paper_bgcolor: 'rgba(0,0,0,0)',       
                 yaxis: {
                    title: 'People per square kilmeter area (km^2)',
                    titlefont: {
                      //family: 'Courier New, monospace',
                      size: 12,
                      color: axis_color
                    }
                 },                    
                 margin: {
                     b:150
                 }};
    Plotly.newPlot(chart_div, data, layout);
    Plotly.newPlot(population_div, pop_trace, layout2);
    Plotly.newPlot(gdp_div, gdp_trace, layout3);
    Plotly.newPlot(landmass_div, landmass_trace, layout4);
    Plotly.newPlot(gdp_per_capita_div, gdp_per_capita_trace, layout5);
    Plotly.newPlot(population_density_div, population_density_trace, layout6);
    
}





function makeScatterPlot(chart_div) {
        
        var region = [];
        var country_2016 = [];
        var GDP_2016 = [];
        var happiness_score_2016 = [];  
        var region_2016 = [];
        
        for(var i=0; i<data_2017.length; i++) {
            country_2016[i] = data_2016[i]["Country"];
            GDP_2016[i] = data_2016[i]["Economy (GDP per Capita)"];
            happiness_score_2016[i] = data_2016[i]["Happiness Score"];
            //region_2016[i] = region_color[data_2016[i]["Region"]];
            var country = {
                name: data_2016[i]["Country"],
                GDP: data_2016[i]["Economy (GDP per Capita)"],
                happiness_score: data_2016[i]["Happiness Score"]
            };
            if(region[data_2016[i]["Region"]] == undefined){
                region[data_2016[i]["Region"]] = [];
                //region[data_2016[i]["Region"]].push(data_2016[i]["Region"]);
            }
            region[data_2016[i]["Region"]].push(country);
            
        }
        console.log(region);
        
        
/*      
    //2017 data    
        var country_2017 = [];
        var GDP_2017 = [];
        var happiness_score_2017 = [];
        //var regions = {};

        for(var i=0; i<data_2017.length; i++) {
            country_2017[i] = data_2017[i]["Country"];
            GDP_2017[i] = data_2017[i]["Economy..GDP.per.Capita."];
            happiness_score_2017[i] = data_2017[i]["Happiness.Score"];
            //if(regions[data_2017[i]["Happiness.Score"]])
            
        }
 */       
        count = 0;
        var trace = [];
        for( let key in region) {
            var name1 = [];
            var GDP = [];
            var score = [];
            for(let i = 0; i< region[key].length; i++){
                name1.push(region[key][i]["name"]);
                GDP.push(region[key][i]["GDP"]);
                score.push(region[key][i]["happiness_score"]);       
            }
            trace[count] = {
              x: GDP,
              y: score,
              mode: 'markers',
              marker: {
                size: 40,
                //color: region_2016
              },
              type: 'scatter',
              name: key,
              text: name1,
              textposition: 'top center',
              textfont: {
                family:  'Raleway, sans-serif'
              },
              marker: { size: 12 }
            };
            count++;
        }
        console.log(trace);
        
   /*     
        var trace1 = {
          x: GDP_2016,
          y: happiness_score_2016,
          mode: 'markers',
          marker: {
            size: 40,
            //color: region_2016
          }
          }
          type: 'scatter',
          //name: 'Team A',
          text: country_2016,
          textposition: 'top center',
          textfont: {
            family:  'Raleway, sans-serif'
          },
          marker: { size: 12 }
        };
*/

        var data = trace;

        var layout = {
          hovermode: 'closest',
          xaxis: {
            title: 'GDP per capita score (higher is better)',
            range: [ 0, 2 ]
          },
          yaxis: {
            title: 'Happiness score (higher is better)',
            range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'grey',
            }
          },
          title:'Happiness Score vs GDP per capita'
        };
      
        Plotly.newPlot(chart_div, data, layout);    
        
}