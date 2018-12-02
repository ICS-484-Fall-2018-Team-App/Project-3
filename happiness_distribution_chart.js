 function make_distributions(div) {
    let happy = "Happiness Score"; 
    let num_bins = 20;
     //2016 data
    data_2015.sort(function(a, b){return a[happy] - b[happy]});
        console.log(data_2015);
    let bins = [];
    bins[0] = [];
    bins[1] = [];    
    bins[2] = [];
        
    let bin_values = [];        
        
    for(i=0; i<num_bins; i++){
        bins[0][i] = 0;       
        bins[1][i] = 0;
        bins[2][i] = 0;
        bin_values[i] = i/2;  
    }
        
    let averg_2015 = 0;
    let averg_2016 = 0;    
    let averg_2017 = 0;
        
     for(let i=0; i< data_2015.length; i++){
        averg_2015 += data_2015[i][happy]; 
        let value = Math.floor(data_2015[i][happy]*2);
        bins[0][value]++;
     }
    for(let i=0; i< data_2016.length; i++){
        averg_2016 += data_2016[i][happy]; 
        let value = Math.floor(data_2016[i][happy]*2);
        bins[1][value]++;
     }
    for(let i=0; i< data_2017.length; i++){
        averg_2017 += data_2015[i][happy]; 
        let value = Math.floor(data_2017[i][happy]*2);
        bins[2][value]++;
     }
    
    let high_2015 = data_2015[data_2015.length-1]["Happiness Score"];
    let low_2015 = data_2015[0]["Happiness Score"];
    averg_2015 = averg_2015 / data_2015.length;
    console.log("average happiness 2015: " + averg_2015);
    console.log("highest happiness score: " + high_2015 + " lowest happiness score: " + low_2015 + " difference: " + (high_2015-low_2015));    
    
    let trace = [];    
    let year = 2015;   
    let axis_color = "#ffffff";  
     
    for(let i=0; i<3; i++){   
        trace[i] = {
                  x: bin_values,
                  y: bins[i],
                  mode: 'lines+markers',
                  marker: {
                    size: 40,
                    //color: region_2016
                  },
                  type: 'scatter',
                  name: "year: "+ year,
                  //text: name1,
                  textposition: 'top center',
                  textfont: {
                    family:  'Raleway, sans-serif'
                  },
                  marker: { size: 12 }
                };  
        year++;
        
    }
        var data = trace;

        var layout = {
          hovermode: 'closest',
          xaxis: {
            title: 'happiness score',
            //range: [ 0, 2 ]
          },
          yaxis: {
            title: 'number of countries',
            range: [0, 32],
            titlefont: {
              //family: 'Courier New, monospace',
              size: 12,
              color: axis_color
            }
          },
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: 'rgba(0,0,0,0)',  
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'grey',
            },
            title: 'hi',
          },
          title:'Country score distribution',
        font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 16,
            color: axis_color
         }, 
        };
      
        Plotly.newPlot(div, data, layout); 
}