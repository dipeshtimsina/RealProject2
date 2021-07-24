function countyTotals(data_year) {
  county_totals = { Totals: [] };
  all_county_names = [];
  all_county_CO2_vals = [];
  unique_counties = [];
  unique_values = [];
  emissions_total = 0;

  Object.entries(data_year).forEach(([key, object]) => {
    // console.log(`${key}: ${object['COUNTY NAME']}`);
    all_county_names.push(object["COUNTY NAME"]);
    all_county_CO2_vals.push(object["GHG QUANTITY (METRIC TONS CO2e)"]);
  });

  console.log(all_county_names);
  console.log(all_county_CO2_vals);

  // Reference: https://stackoverflow.com/questions/35355920/how-can-i-check-that-a-string-does-not-include-the-text-of-another-string/35355946
  all_county_names.forEach((county) => {
    if (!unique_counties.includes(county)) {
      unique_counties.push(county);
    }
  });

  unique_counties.sort();
  console.log(unique_counties);

  unique_counties.forEach((county) => {
    all_county_names.forEach((currentname) => {
      if (currentname === county) {
        i = all_county_names.findIndex(currentname === county);
        emissions_total = emissions_total + all_county_CO2_vals[i];
        unique_values.push(emissions_total);
      }
    });
  });

  return county_totals;
}


function buildStaticBarCounties() {}

function buildStaticBarParents() {}

function buildStaticPie() {}

function buildCountySummary() {}

function buildGHGAnalysis() {
  /* data route */
  const url = "/api/GHGdata";
  d3.json(url)
    .then(function (ghgcountydata) {
      console.log(ghgcountydata);

      data_2019 = [];
      data_2018 = [];
      data_2017 = [];
      data_2016 = [];
      data_2015 = [];
      data_2014 = [];
      data_2013 = [];
      data_2012 = [];
      data_2011 = [];
      data_2010 = [];

      Object.entries(ghgcountydata).forEach((object, key) => {
        switch (ghgcountydata[key]["REPORTING YEAR"]) {
          case 2010:
            data_2010.push(ghgcountydata[key]);
            break;

          case 2011:
            data_2011.push(ghgcountydata[key]);
            break;

          case 2012:
            data_2012.push(ghgcountydata[key]);
            break;

          case 2013:
            data_2013.push(ghgcountydata[key]);
            break;

          case 2014:
            data_2014.push(ghgcountydata[key]);
            break;

          case 2015:
            data_2015.push(ghgcountydata[key]);
            break;

          case 2016:
            data_2016.push(ghgcountydata[key]);
            break;

          case 2017:
            data_2017.push(ghgcountydata[key]);
            break;

          case 2018:
            data_2018.push(ghgcountydata[key]);
            break;

          case 2019:
            data_2019.push(ghgcountydata[key]);
            break;
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

function buildAirAnalysis() {
  /* data route */
  const url = "/api/AIRdata";
  d3.json(url)
    .then(function (airdata) {
      console.log(airdata);

      // data_2019 = countydata[2019][0];
      // data_2018 = countydata[2018][0];
      // data_2017 = countydata[2017][0];
      // data_2016 = countydata[2016][0];
      // data_2015 = countydata[2015][0];
      // data_2014 = countydata[2014][0];
      // data_2013 = countydata[2013][0];
      // data_2012 = countydata[2012][0];
      // data_2011 = countydata[2011][0];
      // data_2010 = countydata[2010][0];
      // countyTotals(data_2018);
    })
    .catch((e) => {
      console.log(e);
    });
}

console.log("app.js is accessed.");
// buildGHGAnalysis();
// buildAirAnalysis();
// countyTotals();

/////////////Build Choropleth - Megan///////////
function buildChoropleth () {

  anychart.onDocumentReady(function () {
    
      // load json data
      anychart.data.loadJsonFile("/api/GHGdata", function (data) {
    
        // Variables
        // go into the records section of the data
        var geoData = data.records
        console.log(geoData)
        // sum of all cases per country
        var sumCases = 0;
    
        // convert cases to numbers
        var numC;
    
        // create a new array with the resulting data
        var data = [];
    
        // Go through the initial data
        for (var i = 0; i < geoData.length; i++) {
          // convert strings to numbers and save them to new variables
          numC = parseInt(geoData[i].cases);
    
          // check if we are in the same country by comparing the geoId
          // if the country is the same, add cases to the appropriate variables
          if ((geoData[i + 1]) != null && (geoData[i].geoId == geoData[i + 1].geoId)) {
            sumCases = sumCases + numC;
          }
          else {
    
            // add last day cases of the same country
            sumCases = sumCases + numC;
    
            // insert the resulting data in the array using the AnyChart keywords 
            data.push({ id: geoData[i].geoId, value: sumCases, title: geoData[i].countriesAndTerritories })
    
            // reset the variables to start over
            sumCases = 0;
    
          }
        };
    
        // connect the data with the map
        var chart = anychart.map(data);
        chart.geoData(anychart.maps.world);
    
        // specify the chart type and set the series 
        var series = chart.choropleth(data);
    
        // set the chart title
        chart.title("COVID-19 Global Cases");
    
        // color scale ranges
        ocs = anychart.scales.ordinalColor([
          { less: 99 },
          { from: 100, to: 999 },
          { from: 1000, to: 9999 },
          { from: 10000, to: 29999 },
          { from: 30000, to: 39000 },
          { from: 40000, to: 59000 },
          { from: 60000, to: 99999 },
          { greater: 100000 }
        ]);
    
        // set scale colors
        ocs.colors(["rgb(252,245,245)", "rgb(241,219,216)", "rgb(229,190,185)", "rgb(211,152,145)", "rgb(192,117,109)", "rgb(178,93,86)", "rgb(152,50,48)", "rgb(150,33,31)"]);
    
        // tell the series what to use as a colorRange (colorScale)
        series.colorScale(ocs);
        
        // enable the legend
        chart.legend(true);
    
        // set the source mode of the legend and add styles
        chart.legend()
          .itemsSourceMode("categories") 
          .position('right')
          .align('top')
          .itemsLayout('vertical')
          .padding(50, 0, 0, 20)
          .paginator(false);
    
        // set the container id
        chart.container('container');
    
        // draw the chart
        chart.draw();
      });
    
    });
  }
buildChoropleth()

