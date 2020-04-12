function drawChart(country) {
    // make a get request for the canada spec and draw it when ready
    $.getJSON('https://raw.githubusercontent.com/dungeontiger/covid/master/specs/' + country + '_cases.json', function(spec) {
        Plotly.newPlot('chartContainer', spec.data, spec.layout);
        // update the show as image link
        $('#viewImage').attr('href', 'https://github.com/dungeontiger/covid/raw/master/images/' + country + '_cases.png');
    });
}

function onSelectCountry() {
    // get the selected country and draw it
    drawChart($('#countrySelect option:selected').val());
}

function init() {
    // default to World
    var country = 'World'
    // get the current country by looking on the URL, ?country=country_id
    var re = /\?(.*)=(.*)/;
    var groups = re.exec(window.location.href);
    if (groups != null) {
        country = groups[2];
    }
    // get the list of countries and populate a dropdown
    $.getJSON('https://raw.githubusercontent.com/dungeontiger/covid/master/specs/countries.json', function(data) {
        // first add an entry for world at the beginning
        $('#countrySelect').append('<option selected value="World">World</option>\n');
        for (c in data) {
            if (data[c] == country) {
                $('#countrySelect').append('<option selected value="' + data[c].replace(' ', '-') + '">' + data[c] + '</option>\n');
            } else {
                $('#countrySelect').append('<option value="' + data[c].replace(' ', '-')  + '">' + data[c] + '</option>\n');
            }
        }
    });
    if ($('#chartContainer').length){
        // we only want to draw the chart if there is a container on this page
        drawChart(country);
    }
}

// when the page has finished loading, call init
$(document).ready(function () {
    init();
});
