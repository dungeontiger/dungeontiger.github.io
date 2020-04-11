function drawChart(country) {
    // make a get request for the canada spec and draw it when ready
    $.getJSON('https://raw.githubusercontent.com/dungeontiger/covid/master/specs/' + country + '_cases.json', function(spec) {
        Plotly.newPlot('chartContainer', spec.data, spec.layout);
    });
}

function onSelectCountry() {
    // get the selected country and draw it
    drawChart($('#countrySelect option:selected').val());
}

function init() {
    // get the current country, for now Canada
    var country = 'Canada'
    // get the list of countries and populate a dropdown
    $.getJSON('https://raw.githubusercontent.com/dungeontiger/covid/master/specs/countries.json', function(data) {
        for (c in data) {
            if (data[c] == country) {
                $('#countrySelect').append('<option selected value="' + data[c].replace(' ', '-') + '">' + data[c] + '</option>\n');
            } else {
                $('#countrySelect').append('<option value="' + data[c].replace(' ', '-')  + '">' + data[c] + '</option>\n');
            }
        }
    });
    drawChart(country);
}