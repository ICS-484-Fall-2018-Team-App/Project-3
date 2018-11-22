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
               key!== 'Lower Confidence Interval' && key!== 'Upper Confidence Interval' && key!=='Lat' && key!== 'Lon' && key!== 'Population' && key!== 'Land Mass' && key!== 'GDP' && key!== 'Whisker.high' && key!== 'Whisker.low')
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
                 title:'Happiness break down for year: ' + year,
                 plot_bgcolor: "rgba(0,0,0,0)",
                 paper_bgcolor: 'rgba(0,0,0,0)',  
                 margin: {
                     b:150
                 }};
    var layout2 = {barmode: 'group',
                 title:'Population comparison for year: ' + year,
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
                 plot_bgcolor: "rgba(0,0,0,0)",
                 paper_bgcolor: 'rgba(0,0,0,0)',       
                 yaxis: {
                    title: 'People per (km^2)',
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


