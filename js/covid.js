function drawChart(country) {

    // make a get request for the canada spec and draw it when ready
    $.getJSON('https://raw.githubusercontent.com/dungeontiger/covid/master/specs/' + country + '_cases.json', function(spec) {
        Plotly.plot('chartContainer', spec.data, spec.layout);
    });

      function country_handler(country) {
        drawChart(country)
      }
}