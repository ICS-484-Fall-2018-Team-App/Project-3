function chartCountries(chart_div, other_div, population_div, gdp_div, landmass_div, countries) {

    let countries_to_graph = [];
    let country_names = [];
    
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
    
    for(let key in countries_to_graph){
        let newTrace = {
            x: countries_to_graph[key][0],
            y: countries_to_graph[key][1],
            name: countries_to_graph[key][2],
            type: 'bar'
        };
        let newTrace_pop = {
            x: ['population'],
            y: countries_to_graph[key][3],
            name: countries_to_graph[key][2],
            type: 'bar'
        };
        let newTrace_gdp = {
            x: ['gdp'],
            y: countries_to_graph[key][4],
            name: countries_to_graph[key][2],
            type: 'bar'
        };
        let newTrace_land = {
            x: ['land mass'],
            y: countries_to_graph[key][5],
            name: countries_to_graph[key][2],
            type: 'bar'
        };
        trace.push(newTrace);
        pop_trace.push(newTrace_pop);
        gdp_trace.push(newTrace_gdp);
        landmass_trace.push(newTrace_land);
    }
    var data = trace;

    var layout = {barmode: 'group',
                 title:'Happiness break down',
                 plot_bgcolor: "rgb(0,0,0)",
                 margin: {
                     b:150
                 }};
    var layout2 = {barmode: 'group',
                 title:'Population comparison',
                 plot_bgcolor: "rgb(0,0,0)",
                 margin: {
                     b:150
                 }};
    var layout3 = {barmode: 'group',
                 title:'GDP comparison',
                 plot_bgcolor: "rgb(0,0,0)",
                 margin: {
                     b:150
                 }};
    var layout4 = {barmode: 'group',
                 title:'Land Mass comparison',
                 plot_bgcolor: "rgb(0,0,0)",
                 margin: {
                     b:150
                 }};

    Plotly.newPlot(chart_div, data, layout);
    Plotly.newPlot(population_div, pop_trace, layout2);
    Plotly.newPlot(gdp_div, gdp_trace, layout3);
    Plotly.newPlot(landmass_div, landmass_trace, layout4);
    
}


