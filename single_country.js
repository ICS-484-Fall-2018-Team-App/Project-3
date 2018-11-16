$(document).ready(function () {
    //Populates select box with items in array which contains sorted countries.
    $('#country-select2').select2({
        data: select2_country_data
    });
    //Runs chartIndividualCountry function when the select box choice is changed.
    $('#country-select2').on('change.select2', function (e) {
        chartIndividualCountry($(e.target).select2("val"));
    });
});

//Creates a plotly stacked bar chart for selected country or a blank chart if nothing is selected.
function chartIndividualCountry(country) {
    if (country === "Select a Country") {
        let emptyData = [{
            x: [],
            y: [],
            type: 'bar'
        }];
        let layout1 = {
            title: 'Happiness Breakdown for Single Country'
        }
        Plotly.newPlot('stacked_bar', emptyData, layout1);
    } else {
        country_2015 = data_2015.find(obj => obj.Country === country);
        country_2016 = data_2016.find(obj => obj.Country === country);
        country_2017 = data_2017.find(obj => obj.Country === country);
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
        let stacked_bar_data = [economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, dystopiaTrace];
        let layout2 = {
            barmode: 'stack',
            title: country,
            xaxis: {
                autotick: false
            },
            yaxis: {
                range: [0, 10]
            }
        };
        Plotly.newPlot('stacked_bar', stacked_bar_data, layout2);
    }
    
}