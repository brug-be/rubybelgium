google.charts.load('current', { 'packages': ['corechart', 'geochart', 'table'], 'language': 'fr' });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts () {
  var url = 'https://docs.google.com/spreadsheets/d/1HbTDI9uV49zp0Bh1Aei1AP8HtuTnTg9x-ubC0LdZu3g/edit#gid=640667913';
  var firstChartQuery = new google.visualization.Query(url);
  var secondChartQuery = new google.visualization.Query(url);
  var thirdChartQuery = new google.visualization.Query(url);
  var totalQuery = new google.visualization.Query(url);

  // B = role
  // C = years of experience
  // D = company type
  // G = city
  // H = salary

  firstChartQuery.setQuery('select C, avg(H) where(F = "No" and (B = "Mobile developper" or B = "Font-End Developer/Designer" or B = "Full stack developper" or B = "Backend Developer" or B = "Dev/Ops" or B = "Dev/Ops")) group by C pivot B order by C asc label C "Years of Experience"');
  firstChartQuery.send(handlefirstChartQueryResponse);
  secondChartQuery.setQuery('select D, avg(H) where(F = "No" and (B = "Mobile developper" or B = "Font-End Developer/Designer" or B = "Full stack developper" or B = "Backend Developer" or B = "Dev/Ops" or B = "Dev/Ops")) group by D pivot B label D "Service or Product company"');
  secondChartQuery.send(handlesecondChartQueryResponse);
  thirdChartQuery.setQuery('select G, avg(H) group by G label G "City", avg(H) "Average Salary"');
  thirdChartQuery.send(handlethirdChartQueryResponse)
  totalQuery.setQuery('select B');
  totalQuery.send(totalQueryResponse);
}

function handlefirstChartQueryResponse (response) {
  var data = response.getDataTable();
  // var chart = new google.visualization.Table(document.getElementById('chart1'));
  var chart = new google.visualization.ColumnChart(document.getElementById('chart1'));
  var options = {
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    },
    bar: {
      groupWidth: '80%' // Where 100% means that groups have no space between them
    },
    // colors: ['#000000', '#ffbf00', '#c40000'], // The colors to use for the chart elements
    colors: ['#fdec7c', '#f2b154', '#e66c33'], // The colors to use for the chart elements
    fontName: 'Roboto',
    fontSize: 14, // The default font size of all text in the chart, in pixels
    vAxis: {
      format: 'currency'
    },
    height: 400, // Height of the chart, in pixels
    legend: {
      position: 'top'
    }
  };

  chart.draw(data, options);
}

function handlesecondChartQueryResponse (response) {
  var data = response.getDataTable();
  // var chart = new google.visualization.Table(document.getElementById('chart2'));
  var chart = new google.visualization.ColumnChart(document.getElementById('chart2'));
  var options = {
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    },
    backgroundColor: '#f9f9f9',
    colors: ['#fdec7c', '#f2b154', '#e66c33'], // The colors to use for the chart elements
    fontName: 'Roboto',
    fontSize: 14, // The default font size of all text in the chart, in pixels
    height: 400, // Height of the chart, in pixels
    legend: {
      position: 'top'
    },
    vAxis: {
      format: 'currency'
    },
  };

  chart.draw(data, options);
}

function handlethirdChartQueryResponse (response) {
  var data = response.getDataTable();
  var highestSalary = data.getColumnRange(1).max;
  var highestSalaryElements = document.getElementsByClassName('highest');
  // var chart = new google.visualization.Table(document.getElementById('chart3'));
  var chart = new google.visualization.GeoChart(document.getElementById('chart3'));
  var options = {
    colorAxis: {
      colors: ['#fdec7c', '#e66c33']
    },
    datalessRegionColor: '#ffffff',
    displayMode: 'markers',
    fontName: 'Roboto',
    fontSize: 14, // The default font size of all text in the chart, in pixels
    height: 400, // Height of the chart, in pixels
    region: 'BE'
  };


  for (var i = 0; i < highestSalaryElements.length; i++) {
    highestSalaryElements[i].innerHTML = highestSalary;
  }

  chart.draw(data, options);
}

function totalQueryResponse (response) {
  var data = response.getDataTable();
  var total = data.getNumberOfRows();
  var totalElements = document.getElementsByClassName('total');

  for (var i = 0; i < totalElements.length; i++) {
    totalElements[i].innerHTML = total;
  }
}
