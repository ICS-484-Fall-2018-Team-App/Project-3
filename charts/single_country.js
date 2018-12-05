$(document).ready(function () {
    //Populates select box with items in array which contains sorted countries.
    $('#country-select2').select2({
        data: select2_country_data,
    });
    //Runs chartStackedBarChart function whenever the select box choice is changed.
    $('#country-select2').on('change.select2', function (e) {
        chartStackedBarChart($(e.target).select2("val"));
        chartHistogram($("#category-select-histogram").val().toString(), $("#year-select-histogram").val());
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
            barmode: 'stack',
            title: 'Happiness Breakdown for Single Country',
            xaxis: {
                autotick: false,
                title: 'Year'
            },
            yaxis: {
                range: [0, 10],
                title: 'Happiness Score'
            },
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
            font: {
                color: '#FFFFFF'
            },
        };
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
            }
            
            let annotationsArray = [
                {
                    x: 2015,
                    y: 8.7,
                    xref: 'x',
                    yref: 'y',
                    text: text_2015,
                    showarrow: false
                },
                {
                    x: 2016,
                    y: 8.7,
                    xref: 'x',
                    yref: 'y',
                    text: text_2016,
                    showarrow: false
                },
                {
                    x: 2017,
                    y: 8.7,
                    xref: 'x',
                    yref: 'y',
                    text: text_2017,
                    showarrow: false
                },
            ];
            stacked_bar_data = [dystopiaTrace, economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, annotationsArray];
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
                title: 'Happiness Score'
            },
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
            font: {
                color: '#FFFFFF'
            },
            annotations: stacked_bar_data.pop()
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
            type: 'bar'
        }
        let familyTrace = {
            x: ['2017'],
            y: [country_2017["Family"]],
            name: 'Family',
            type: 'bar'
        }
        let healthTrace = {
            x: ['2017'],
            y: [country_2017["Health..Life.Expectancy."]],
            name: 'Health (Life Expectancy)',
            type: 'bar'
        }
        let freedomTrace = {
            x: ['2017'],
            y: [country_2017["Freedom"]],
            name: 'Freedom',
            type: 'bar'
        }
        let trustTrace = {
            x: ['2017'],
            y: [country_2017["Trust..Government.Corruption."]],
            name: 'Trust (Government Corruption)',
            type: 'bar'
        }
        let generosityTrace = {
            x: ['2017'],
            y: [country_2017["Generosity"]],
            name: 'Generosity',
            type: 'bar'
        }
        let text_2017 = "Rank: " + country_2017["Happiness Rank"] + "<br>Score: " + country_2017["Happiness Score"].toFixed(3);
        let dystopiaTrace = {
            x: ['2017'],
            y: [country_2017["Dystopia.Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
        }
        let annotationsArray = [
            {
                x: 2017,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2017,
                showarrow: false
            }
        ];
        return stacked_bar_data = [dystopiaTrace, economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, annotationsArray];
    } else if (country_2015 === undefined && country_2017 === undefined) {
        let economyTrace = {
            x: ['2016'],
            y: [country_2016["Economy (GDP per Capita)"]],
            name: 'Economy (GDP per Capita)',
            type: 'bar'
        }
        let familyTrace = {
            x: ['2016'],
            y: [country_2016["Family"]],
            name: 'Family',
            type: 'bar'
        }
        let healthTrace = {
            x: ['2016'],
            y: [country_2016["Health (Life Expectancy)"]],
            name: 'Health (Life Expectancy)',
            type: 'bar'
        }
        let freedomTrace = {
            x: ['2016'],
            y: [country_2016["Freedom"]],
            name: 'Freedom',
            type: 'bar'
        }
        let trustTrace = {
            x: ['2016'],
            y: [country_2016["Trust (Government Corruption)"]],
            name: 'Trust (Government Corruption)',
            type: 'bar'
        }
        let generosityTrace = {
            x: ['2016'],
            y: [country_2016["Generosity"]],
            name: 'Generosity',
            type: 'bar'
        }
        let text_2016 = "Rank: " + country_2016["Happiness Rank"] + "<br>Score: " + country_2016["Happiness Score"];
        let dystopiaTrace = {
            x: ['2016'],
            y: [country_2016["Dystopia Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
        }
        let annotationsArray = [
            {
                x: 2016,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2016,
                showarrow: false
            }
        ];
        return stacked_bar_data = [dystopiaTrace, economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, annotationsArray];
    } else if (country_2016 === undefined && country_2017 === undefined) {
        let economyTrace = {
            x: ['2015'],
            y: [country_2015["Economy (GDP per Capita)"]],
            name: 'Economy (GDP per Capita)',
            type: 'bar'
        }
        let familyTrace = {
            x: ['2015'],
            y: [country_2015["Family"]],
            name: 'Family',
            type: 'bar'
        }
        let healthTrace = {
            x: ['2015'],
            y: [country_2015["Health (Life Expectancy)"]],
            name: 'Health (Life Expectancy)',
            type: 'bar'
        }
        let freedomTrace = {
            x: ['2015'],
            y: [country_2015["Freedom"]],
            name: 'Freedom',
            type: 'bar'
        }
        let trustTrace = {
            x: ['2015'],
            y: [country_2015["Trust (Government Corruption)"]],
            name: 'Trust (Government Corruption)',
            type: 'bar'
        }
        let generosityTrace = {
            x: ['2015'],
            y: [country_2015["Generosity"]],
            name: 'Generosity',
            type: 'bar'
        }
        let text_2015 = "Rank: " + country_2015["Happiness Rank"] + "<br>Score: " + country_2015["Happiness Score"];
        let dystopiaTrace = {
            x: ['2015'],
            y: [country_2015["Dystopia Residual"]],
            name: 'Dystopia Residual',
            type: 'bar',
        }
        let annotationsArray = [
            {
                x: 2015,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2015,
                showarrow: false
            }
        ];
        return stacked_bar_data = [dystopiaTrace, economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, annotationsArray];
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
        }
        let annotationsArray = [
            {
                x: 2016,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2016,
                showarrow: false
            },
            {
                x: 2017,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2017,
                showarrow: false
            },
        ];
        return stacked_bar_data = [dystopiaTrace, economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, annotationsArray];
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
        }
        let annotationsArray = [
            {
                x: 2015,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2015,
                showarrow: false
            },
            {
                x: 2017,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2017,
                showarrow: false
            },
        ];
        return stacked_bar_data = [dystopiaTrace, economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, annotationsArray];
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
        }
        let annotationsArray = [
            {
                x: 2015,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2015,
                showarrow: false
            },
            {
                x: 2016,
                y: 8.7,
                xref: 'x',
                yref: 'y',
                text: text_2016,
                showarrow: false
            }
        ];
        return stacked_bar_data = [dystopiaTrace, economyTrace, familyTrace, healthTrace, freedomTrace, trustTrace, generosityTrace, annotationsArray];
    }
}

//Charts a histogram based on a given category and year with an annotation for selected country
function chartHistogram(category, year) {
    let selected_year_data = [];
    let countryName = document.getElementById('country-select2').value;
    let country = [];
    if (year === '2015') {
        selected_year_data = data_2015;
        country = data_2015.find(obj => obj.Country === countryName);
    } else if (year === '2016') {
        selected_year_data = data_2016;
        country = data_2016.find(obj => obj.Country === countryName);
    } else {
        selected_year_data = data_2017;
        country = data_2017.find(obj => obj.Country === countryName);
    }

    let annotation = undefined;
    let x = [];
    if (year === '2015' || year === '2016') {
        if (category === "GDP per Capita") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Economy (GDP per Capita)"]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Economy (GDP per Capita)"]).toFixed(3);
            }
        } else if (category === "Family") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Family"]);
            }
            if (country !== undefined) {
              annotation = parseFloat(country["Family"]).toFixed(3);
            }
        } else if (category === "Health (Life Expectancy)") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Health (Life Expectancy)"]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Health (Life Expectancy)"]).toFixed(3);
            }
        } else if (category === "Freedom") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Freedom"]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Freedom"]).toFixed(3);
            }
        } else if (category === "Trust in Government") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Trust (Government Corruption)"]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Trust (Government Corruption)"]).toFixed(3);
            }
        } else if (category === "Generosity") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Generosity"]);
            }
            if (country !== undefined) {
              annotation = parseFloat(country["Generosity"]).toFixed(3);
            }
        } else {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Dystopia Residual"]);
            }
            if (country !== undefined) {
              annotation = parseFloat(country["Dystopia Residual"]).toFixed(3);
            }
        }
    } else {
        if (category === "GDP per Capita") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Economy..GDP.per.Capita."]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Economy..GDP.per.Capita."]).toFixed(3);
            }
        } else if (category === "Family") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Family"]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Family"]).toFixed(3);
            }
        } else if (category === "Health (Life Expectancy)") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Health..Life.Expectancy."]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Health..Life.Expectancy."]).toFixed(3);
            }
        } else if (category === "Freedom") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Freedom"]);
            }
            if (country !== undefined) {
              annotation = parseFloat(country["Freedom"]).toFixed(3);
            }
        } else if (category === "Trust in Government") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Trust..Government.Corruption."]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Trust..Government.Corruption."]).toFixed(3);
            }
        } else if (category === "Generosity") {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Generosity"]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Generosity"]).toFixed(3);
            }
        } else {
            for (let i = 0; i < selected_year_data.length; i++) {
                x.push(selected_year_data[i]["Dystopia.Residual"]);
            }
            if (country !== undefined) {
                annotation = parseFloat(country["Dystopia.Residual"]).toFixed(3);
            }
        }
    }

    let histogramData = [
        {
            x: x,
            type: 'histogram'
        }
    ];

    let layout3;
    if (annotation !== undefined) {
        let annotation_text = countryName + " (" + year + "): " + annotation;
        layout3 = {
            title: "Category: " + category + " (" + year + ")",
            xaxis: {
                title: category + " Score"
            },
            yaxis: {
                title: 'Amount'
            },
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
            font: {
                color: '#FFFFFF'
            },
            annotations: [
                {
                    x: annotation,
                    xref: 'x',
                    yref: 'y',
                    yanchor: 'top',
                    showarrow: true,
                    text: annotation_text
                }
            ]
        }
    } else {
        layout3 = {
            title: "Category: " + category + " (" + year + ")",
            xaxis: {
                title: category + " Score"
            },
            yaxis: {
                title: 'Amount'
            },
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
            font: {
                color: '#FFFFFF'
            }
        }
    }

    Plotly.newPlot('histogram_chart', histogramData, layout3);
}

function verifyAnnotationYear(category, year, country) {
    let transformedCategory;
    let annotation;
    if (year === '2015' || year === '2016') {
        if (category === "GDP per Capita") {
          for (let i = 0; i < selected_year_data.length; i++) {
            x.push(selected_year_data[i]["Economy (GDP per Capita)"]);
          }
          annotation = country["Economy (GDP per Capita)"];
        } else if (category === "Family") {
          for (let i = 0; i < selected_year_data.length; i++) {
            x.push(selected_year_data[i]["Family"]);
          }
          annotation = country["Family"];
        } else if (category === "Health (Life Expectancy)") {
          for (let i = 0; i < selected_year_data.length; i++) {
            x.push(selected_year_data[i]["Health (Life Expectancy)"]);
          }
          annotation = country["Health (Life Expectancy)"];
        } else if (category === "Freedom") {
          for (let i = 0; i < selected_year_data.length; i++) {
            x.push(selected_year_data[i]["Freedom"]);
          }
          annotation = country["Freedom"];
        } else if (category === "Trust in Government") {
          for (let i = 0; i < selected_year_data.length; i++) {
            x.push(selected_year_data[i]["Trust (Government Corruption)"]);
          }
          annotation = country["Trust (Government Corruption)"];
        } else if (category === "Generosity") {
          for (let i = 0; i < selected_year_data.length; i++) {
            x.push(selected_year_data[i]["Generosity"]);
          }
          annotation = country["Generosity"];
        } else {
          for (let i = 0; i < selected_year_data.length; i++) {
            x.push(selected_year_data[i]["Dystopia Residual"]);
          }
          annotation = country["Dystopia Residual"];
        }
    }
}
