var axis_color = '#FFFFFF';

        var layout = [];
        
        layout['gdp'] = {
         font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 24,
            color: axis_color
         },
         plot_bgcolor: "rgba(0,0,0,0)",
         paper_bgcolor: 'rgba(0,0,0,0)',  
          hovermode: 'closest',
          xaxis: {
            title: 'GDP per capita score (higher means higher gdp per capita)',
            range: [ 0, 2 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs GDP per capita'
        };
        
         layout['family'] = {
        font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 24,
            color: axis_color
         },
         plot_bgcolor: "rgba(0,0,0,0)",
         paper_bgcolor: 'rgba(0,0,0,0)',               
          hovermode: 'closest',
          xaxis: {
            title: 'Family score (higher means better family/friend relations)',
            range: [ 0, 2 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs Family relations'
        }; 

         layout['health'] = {
          font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 24,
            color: axis_color
         },   
         plot_bgcolor: "rgba(0,0,0,0)",
         paper_bgcolor: 'rgba(0,0,0,0)',               
          hovermode: 'closest',
          xaxis: {
            title: 'health score (higher means longer life expectancy)',
            range: [ 0, 1.5 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs Health (life expectency)'
        }; 

         layout['freedom'] = {
         font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 24,
            color: axis_color
         },
         plot_bgcolor: "rgba(0,0,0,0)",
         paper_bgcolor: 'rgba(0,0,0,0)',               
          hovermode: 'closest',
          xaxis: {
            title: 'Freedom score (higher means more freedom)',
            range: [ 0, 1 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs Freedom'
        }; 

         layout['generosity'] = {
         font: {
           size: 12,
           color: axis_color
         },
         plot_bgcolor: "rgba(0,0,0,0)",
         paper_bgcolor: 'rgba(0,0,0,0)',               
         titlefont: {
            size: 24,
            color: axis_color
         },
          hovermode: 'closest',
          xaxis: {
            title: 'Generosity score (higher means more generous)',
            range: [ 0, 1 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs Generosity'
        }; 

         layout['trust'] = {
         font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 24,
            color: axis_color
         },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: 'rgba(0,0,0,0)',  
          hovermode: 'closest',
          xaxis: {
            title: 'Government trust score (higher means more trust in government)',
            range: [ 0, 1 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs Government trustworthiness'
        }; 

         layout['population'] = {
         font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 24,
            color: axis_color
         },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: 'rgba(0,0,0,0)',  
          hovermode: 'closest',
          xaxis: {
            title: 'Population',
            //range: [ 0, 1 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            //range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs Population Size'
        }; 

         layout['land'] = {
         font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 24,
            color: axis_color
         },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: 'rgba(0,0,0,0)',  
          hovermode: 'closest',
          xaxis: {
            title: 'Land Mass (km^2)',
            //range: [ 0, 1 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            //range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs Land Mass Area'
        }; 

         layout['pop_density'] = {
         font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 24,
            color: axis_color
         },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: 'rgba(0,0,0,0)',  
          hovermode: 'closest',
          xaxis: {
            title: 'Population density (people per km^2)',
            //range: [ 0, 1 ]
          },
          yaxis: {
            title: 'Happiness score (higher is happier)',
            //range: [2, 8]
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'white',
            }
          },
          title:'Happiness Score vs Population Density'
        }; 

/*
        layout['gdp_dystopia'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'GDP per capita score (higher means higher gdp per capita)',
            range: [ 0, 2 ]
          },
          yaxis: {
            title: 'dystopia score',
            range: [0, 5]
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
          title:'Dystopia Score vs GDP per capita'
        };
        
         layout['family_dystopia'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'Family score',
            range: [ 0, 2 ]
          },
          yaxis: {
            title: 'dystopia score',
            range: [0, 5]
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
          title:'Dystopia Score vs Family relations'
        }; 

         layout['health_dystopia'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'health (life expectency) score',
            range: [ 0, 1.5 ]
          },
          yaxis: {
            title: 'dystopia score',
            range: [0, 5]
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
          title:'Dystopia Score vs Health(life expectency)'
        }; 

         layout['freedom_dystopia'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'Freedom score',
            range: [ 0, 1 ]
          },
          yaxis: {
            title: 'dystopia score',
            range: [0, 5]
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
          title:'Dystopia Score vs Freedom'
        }; 

         layout['generosity_dystopia'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'Generosity score',
            range: [ 0, 1 ]
          },
          yaxis: {
            title: 'dystopia score',
            range: [0, 5]
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
          title:'Dystopia Score vs Generosity'
        }; 

         layout['trust_dystopia'] = {
          hovermode: 'closest',
          xaxis: {
            title: 'trust(government trustworthiness) score',
            range: [ 0, 1 ]
          },
          yaxis: {
            title: 'dystopia score',
            range: [0, 5]
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
          title:'Dystopia Score vs Government trustworthiness'
        }; 
*/