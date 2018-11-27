$(document).ready(function () {
    //Populates select box with items in array which contains sorted countries.
    $('#country-select2').select2({
        data: select2_country_data
    });
    //Runs chartStackedBarChart function whenever the select box choice is changed.
    $('#country-select2').on('change.select2', function (e) {
        chartStackedBarChart($(e.target).select2("val"));
    });
});

//Creates a plotly stacked bar chart for selected country or a blank chart if nothing is selected.
function chartStackedBarChart(country) {
    let country_2015 = data_2015.find(obj => obj.Country === country);
    let country_2016 = data_2016.find(obj => obj.Country === country);
    let country_2017 = data_2017.find(obj => obj.Country === country);
    if (country === "Select a Country" || (country_2015 === undefined && country_2016 === undefined && country_2017 === undefined)) {
        let emptyData = [{
            x: [],
            y: [],
            type: 'bar'
        }];
        let layout1 = {
            title: 'Happiness Breakdown for Single Country',
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
            xaxis: {
                autotick: false,
                title: 'Year'
            },
            yaxis: {
                range: [0, 10],
                title: 'Happiness Score',
                gridcolor: "#A9A9A9"
            },
            font: {
                size: 12,
                color: '#FFFFFF'
            },
            titlefont: {
                size: 16
            }
        }
        Plotly.newPlot('stacked_bar', emptyData, layout1);
    } else {
        let stacked_bar_data;

        if (country_2015 === undefined || country_2016 === undefined || country_2017 === undefined) {
            stacked_bar_data = countryMissingYears(country_2015, country_2016, country_2017);
        } else {
            let economyTrace = {
                x: ['2015', '2016', '2017'],
                y: [country_2015["Economy (GDP per Capita)"], country_2016["Economy (GDP per Capita)"], country_2017["Economy..GDP.per.Capita."]],
                name: 'Economy (GDP per Capita)',
                type: 'bar'
            }
            let familyTrace = {
                x: ['2015', '2016', '2017'],
                y: [country_2015["Family"], country_2016["Family"], country_2017["Family"]],
                name: 'Family',
                type: 'bar'
            }
            let healthTrace = {
                x: ['2015', '2016', '2017'],
                y: [country_2015["Health (Life Expectancy)"], country_2016["Health (Life Expectancy)"], country_2017["Health..Life.Expectancy."]],
                name: 'Health (Life Expectancy)',
                type: 'bar'
            }
            let freedomTrace = {
                x: ['2015', '2016', '2017'],
                y: [country_2015["Freedom"], country_2016["Freedom"], country_2017["Freedom"]],
                name: 'Freedom',
                type: 'bar'
            }
            let trustTrace = {
                x: ['2015', '2016', '2017'],
                y: [country_2015["Trust (Government Corruption)"], country_2016["Trust (Government Corruption)"], country_2017["Trust..Government.Corruption."]],
                name: 'Trust (Government Corruption)',
                type: 'bar'
            }
            let generosityTrace = {
                x: ['2015', '2016', '2017'],
                y: [country_2015["Generosity"], country_2016["Generosity"], country_2017["Generosity"]],
                name: 'Generosity',
                type: 'bar'
            }
            let text_2015 = 'Rank: ' + country_2015["Happiness Rank"] + '<br>Score: ' + country_2015["Happiness Score"];
            let text_2016 = 'Rank: ' + country_2016["Happiness Rank"] + '<br>Score: ' + country_2016["Happiness Score"];
            let text_2017 = 'Rank: ' + country_2017["Happiness Rank"] + '<br>Score: ' + country_2017["Happiness Score"].toFixed(3);
            let dystopiaTrace = {
                x: ['2015', '2016', '2017'],
                y: [country_2015["Dystopia Residual"], country_2016["Dystopia Residual"], country_2017["Dystopia.Residual"]],
                name: 'Dystopia Residual',
                type: 'bar',
                text: [text_2015, text_2016, text_2017],
                textposition: 'outside'
            }
            stacked_bar_data = [economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, dystopiaTrace];
        }

        let layout2 = {
            barmode: 'stack',
            title: country,
            xaxis: {
                autotick: false,
                title: 'Year'
            },
            yaxis: {
                range: [0, 10],
                title: 'Happiness Score',
                gridcolor: "#A9A9A9"
            },
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
            font: {
                size: 12,
                color: '#FFFFFF'
            },
            titlefont: {
                size: 16
            }
        };
        Plotly.newPlot('stacked_bar', stacked_bar_data, layout2);
    } 
}

//Creates data for stacked bar chart if certain years are missing for a country.
function countryMissingYears(country_2015, country_2016, country_2017) {
    if (country_2015 === undefined && country_2016 === undefined) {
        let economyTrace = {
            x: ['2017'],
            y: [country_2017["Economy..GDP.per.Capita."]],
            name: 'Economy (GDP per Capita)',
            type: 'bar',
            width: .3
        }
        let familyTrace = {
            x: ['2017'],
            y: [country_2017["Family"]],
            name: 'Family',
            type: 'bar',
            width: .3
        }
        let healthTrace = {
            x: ['2017'],
            y: [country_2017["Health..Life.Expectancy."]],
            name: 'Health (Life Expectancy)',
            type: 'bar',
            width: .3
        }
        let freedomTrace = {
            x: ['2017'],
            y: [country_2017["Freedom"]],
            name: 'Freedom',
            type: 'bar',
            width: .3
        }
        let trustTrace = {
            x: ['2017'],
            y: [country_2017["Trust..Government.Corruption."]],
            name: 'Trust (Government Corruption)',
            type: 'bar',
            width: .3
        }
        let generosityTrace = {
            x: ['2017'],
            y: [country_2017["Generosity"]],
            name: 'Generosity',
            type: 'bar',
            width: .3
        }
        let text_2017 = "Rank: " + country_2017["Happiness Rank"] + "<br>Score: " + country_2017["Happiness Score"].toFixed(3);
        let dystopiaTrace = {
            x: ['2017'],
            y: [country_2017["Dystopia.Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
            width: .3,
            text: [text_2017],
            textposition: 'outside'
        }
        return stacked_bar_data = [economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, dystopiaTrace];
    } else if (country_2015 === undefined && country_2017 === undefined) {
        let economyTrace = {
            x: ['2016'],
            y: [country_2016["Economy (GDP per Capita)"]],
            name: 'Economy (GDP per Capita)',
            type: 'bar',
            width: .3
        }
        let familyTrace = {
            x: ['2016'],
            y: [country_2016["Family"]],
            name: 'Family',
            type: 'bar',
            width: .3
        }
        let healthTrace = {
            x: ['2016'],
            y: [country_2016["Health (Life Expectancy)"]],
            name: 'Health (Life Expectancy)',
            type: 'bar',
            width: .3
        }
        let freedomTrace = {
            x: ['2016'],
            y: [country_2016["Freedom"]],
            name: 'Freedom',
            type: 'bar',
            width: .3
        }
        let trustTrace = {
            x: ['2016'],
            y: [country_2016["Trust (Government Corruption)"]],
            name: 'Trust (Government Corruption)',
            type: 'bar',
            width: .3
        }
        let generosityTrace = {
            x: ['2016'],
            y: [country_2016["Generosity"]],
            name: 'Generosity',
            type: 'bar',
            width: .3
        }
        let text_2016 = "Rank: " + country_2016["Happiness Rank"] + "<br>Score: " + country_2016["Happiness Score"];
        let dystopiaTrace = {
            x: ['2016'],
            y: [country_2016["Dystopia Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
            width: .3,
            text: [text_2016],
            textposition: 'outside'
        }
        return stacked_bar_data = [economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, dystopiaTrace];
    } else if (country_2016 === undefined && country_2017 === undefined) {
        let economyTrace = {
            x: ['2015'],
            y: [country_2015["Economy (GDP per Capita)"]],
            name: 'Economy (GDP per Capita)',
            type: 'bar',
            width: .3
        }
        let familyTrace = {
            x: ['2015'],
            y: [country_2015["Family"]],
            name: 'Family',
            type: 'bar',
            width: .3
        }
        let healthTrace = {
            x: ['2015'],
            y: [country_2015["Health (Life Expectancy)"]],
            name: 'Health (Life Expectancy)',
            type: 'bar',
            width: .3
        }
        let freedomTrace = {
            x: ['2015'],
            y: [country_2015["Freedom"]],
            name: 'Freedom',
            type: 'bar',
            width: .3
        }
        let trustTrace = {
            x: ['2015'],
            y: [country_2015["Trust (Government Corruption)"]],
            name: 'Trust (Government Corruption)',
            type: 'bar',
            width: .3
        }
        let generosityTrace = {
            x: ['2015'],
            y: [country_2015["Generosity"]],
            name: 'Generosity',
            type: 'bar',
            width: .3
        }
        let text_2015 = "Rank: " + country_2015["Happiness Rank"] + "<br>Score: " + country_2015["Happiness Score"];
        let dystopiaTrace = {
            x: ['2015'],
            y: [country_2015["Dystopia Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
            width: .3,
            text: [text_2015],
            textposition: 'outside'
        }
        return stacked_bar_data = [economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, dystopiaTrace];
    } else if (country_2015 === undefined) {
        let economyTrace = {
            x: ['2016', '2017'],
            y: [country_2016["Economy (GDP per Capita)"], country_2017["Economy..GDP.per.Capita."]],
            name: 'Economy (GDP per Capita)',
            type: 'bar'
        }
        let familyTrace = {
            x: ['2016', '2017'],
            y: [country_2016["Family"], country_2017["Family"]],
            name: 'Family',
            type: 'bar'
        }
        let healthTrace = {
            x: ['2016', '2017'],
            y: [country_2016["Health (Life Expectancy)"], country_2017["Health..Life.Expectancy."]],
            name: 'Health (Life Expectancy)',
            type: 'bar'
        }
        let freedomTrace = {
            x: ['2016', '2017'],
            y: [country_2016["Freedom"], country_2017["Freedom"]],
            name: 'Freedom',
            type: 'bar'
        }
        let trustTrace = {
            x: ['2016', '2017'],
            y: [country_2016["Trust (Government Corruption)"], country_2017["Trust..Government.Corruption."]],
            name: 'Trust (Government Corruption)',
            type: 'bar'
        }
        let generosityTrace = {
            x: ['2016', '2017'],
            y: [country_2016["Generosity"], country_2017["Generosity"]],
            name: 'Generosity',
            type: 'bar'
        }
        let text_2016 = "Rank: " + country_2016["Happiness Rank"] + "<br>Score: " + country_2016["Happiness Score"];
        let text_2017 = "Rank: " + country_2017["Happiness Rank"] + "<br>Score: " + country_2017["Happiness Score"].toFixed(3);
        let dystopiaTrace = {
            x: ['2016', '2017'],
            y: [country_2016["Dystopia Residual"], country_2017["Dystopia.Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
            text: [text_2016, text_2017],
            textposition: 'outside'
        }
        return stacked_bar_data = [economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, dystopiaTrace];
    } else if (country_2016 === undefined) {
        let economyTrace = {
            x: ['2015', '2017'],
            y: [country_2015["Economy (GDP per Capita)"], country_2017["Economy..GDP.per.Capita."]],
            name: 'Economy (GDP per Capita)',
            type: 'bar'
        }
        let familyTrace = {
            x: ['2015', '2017'],
            y: [country_2015["Family"], country_2017["Family"]],
            name: 'Family',
            type: 'bar'
        }
        let healthTrace = {
            x: ['2015', '2017'],
            y: [country_2015["Health (Life Expectancy)"], country_2017["Health..Life.Expectancy."]],
            name: 'Health (Life Expectancy)',
            type: 'bar'
        }
        let freedomTrace = {
            x: ['2015', '2017'],
            y: [country_2015["Freedom"], country_2017["Freedom"]],
            name: 'Freedom',
            type: 'bar'
        }
        let trustTrace = {
            x: ['2015', '2017'],
            y: [country_2015["Trust (Government Corruption)"], country_2017["Trust..Government.Corruption."]],
            name: 'Trust (Government Corruption)',
            type: 'bar'
        }
        let generosityTrace = {
            x: ['2015', '2017'],
            y: [country_2015["Generosity"], country_2017["Generosity"]],
            name: 'Generosity',
            type: 'bar'
        }
        let text_2015 = "Rank: " + country_2015["Happiness Rank"] + "<br>Score: " + country_2015["Happiness Score"];
        let text_2017 = "Rank: " + country_2017["Happiness Rank"] + "<br>Score: " + country_2017["Happiness Score"].toFixed(3);
        let dystopiaTrace = {
            x: ['2015', '2017'],
            y: [country_2015["Dystopia Residual"], country_2017["Dystopia.Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
            text: [text_2015, text_2017],
            textposition: 'outside'
        }
        return stacked_bar_data = [economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, dystopiaTrace];
    } else {
        let economyTrace = {
            x: ['2015', '2016'],
            y: [country_2015["Economy (GDP per Capita)"], country_2016["Economy (GDP per Capita)"]],
            name: 'Economy (GDP per Capita)',
            type: 'bar'
        }
        let familyTrace = {
            x: ['2015', '2016'],
            y: [country_2015["Family"], country_2016["Family"]],
            name: 'Family',
            type: 'bar'
        }
        let healthTrace = {
            x: ['2015', '2016'],
            y: [country_2015["Health (Life Expectancy)"], country_2016["Health (Life Expectancy)"]],
            name: 'Health (Life Expectancy)',
            type: 'bar'
        }
        let freedomTrace = {
            x: ['2015', '2016'],
            y: [country_2015["Freedom"], country_2016["Freedom"]],
            name: 'Freedom',
            type: 'bar'
        }
        let trustTrace = {
            x: ['2015', '2016'],
            y: [country_2015["Trust (Government Corruption)"], country_2016["Trust (Government Corruption)"]],
            name: 'Trust (Government Corruption)',
            type: 'bar'
        }
        let generosityTrace = {
            x: ['2015', '2016'],
            y: [country_2015["Generosity"], country_2016["Generosity"]],
            name: 'Generosity',
            type: 'bar'
        }
        let text_2015 = 'Rank: ' + country_2015["Happiness Rank"] + '<br>Score: ' + country_2015["Happiness Score"];
        let text_2016 = 'Rank: ' + country_2016["Happiness Rank"] + '<br>Score: ' + country_2016["Happiness Score"];
        let dystopiaTrace = {
            x: ['2015', '2016'],
            y: [country_2015["Dystopia Residual"], country_2016["Dystopia Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
            text: [text_2015, text_2016],
            textposition: 'outside'
        }
        return stacked_bar_data = [economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, dystopiaTrace];
    }
}
