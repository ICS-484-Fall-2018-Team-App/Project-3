function chartCountries(chart_div, countries) {

    let countries_to_graph = [];
    let country_names = [];
    
    for(let country in countries){
        let total = [];
        let c1_value_names = [];
        let c1_values = [];
        let rank = '';
        for(let key in countries[country]){
            if(key!== 'Country' && key!== 'Region' && key!== 'Happiness Rank' &&
               key!== 'Lower Confidence Interval' && key!== 'Upper Confidence Interval' && key!=='Lat' && key!== 'Lon' && key!== 'Population' && key!== 'Land Mass' && key!== 'GDP')
            {
                c1_value_names.push(key);
                c1_values.push(countries[country][key]);
            }
            if(key == 'Happiness Rank'){
                rank = countries[country][key];
            }
        }
        total.push(c1_value_names);
        total.push(c1_values);
        total.push(country);
        total.push(rank);
        countries_to_graph.push(total);
    }
    let trace = [];
    
    for(let key in countries_to_graph){
        let newTrace = {
            x: countries_to_graph[key][0],
            y: countries_to_graph[key][1],
            name: countries_to_graph[key][2],
            type: 'bar'
        };
        trace.push(newTrace);
    }
    var data = trace;

    var layout = {barmode: 'group',
                 title:'Happiness break down',
                 plot_bgcolor: "rgb(0,0,0)",
                 margin: {
                     b:150
                 }};

    Plotly.newPlot(chart_div, data, layout);
    
}
