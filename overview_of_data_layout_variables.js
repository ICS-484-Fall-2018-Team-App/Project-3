
        var layout = [];

        
        layout['gdp'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'GDP per capita score (higher means higher gdp per capita)',
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
        
         layout['family'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'Family score',
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
          title:'Happiness Score vs Family relations'
        }; 

         layout['health'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'health (life expectency) score',
            range: [ 0, 1.5 ]
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
          title:'Happiness Score vs Health(life expectency)'
        }; 

         layout['freedom'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'Freedom score',
            range: [ 0, 1 ]
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
          title:'Happiness Score vs Freedom'
        }; 

         layout['generosity'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'Generosity score',
            range: [ 0, 1 ]
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
          title:'Happiness Score vs Generosity'
        }; 

         layout['trust'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'trust(government trustworthiness) score',
            range: [ 0, 1 ]
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
          title:'Happiness Score vs Government trustworthiness'
        }; 

         layout['dystopia'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'dystopia score',
            range: [ 0, 4 ]
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
          title:'Happiness Score vs dystopian residual'
        }; 