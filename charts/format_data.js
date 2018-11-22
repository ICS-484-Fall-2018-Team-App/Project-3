
function country_by_key(){
    let countries_by_year = [];
    let country_2015 = [];
    let country_2016 = [];
    let country_2017 = [];
    
    for(let i=0; i<data_2015.length; i++) {
        country_2015[data_2015[i]["Country"]] = data_2015[i];
    }    
    for(let i=0; i<data_2016.length; i++) {
        country_2016[data_2016[i]["Country"]] = data_2016[i];
    }
    for(let i=0; i<data_2017.length; i++) {
        country_2017[data_2017[i]["Country"]] = data_2017[i];
    }
    
    countries_by_year.push(country_2015);
    countries_by_year.push(country_2016);
    countries_by_year.push(country_2017);
    
    console.log(country_2015);
    
    return countries_by_year;
}