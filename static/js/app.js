
//Reference: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
  return str.replace(
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

//Reference: https://medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9
function sortBy(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return -1;    
      } else if (a[prop] < b[prop]) {    
          return 1;    
      }    
      return 0;    
  }    
} 

function countyTotals(data_year) {
  county_totals = {"countytotals":[]};
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

  // console.log(all_county_names);
  // console.log(all_county_CO2_vals);

  // Reference: https://stackoverflow.com/questions/35355920/how-can-i-check-that-a-string-does-not-include-the-text-of-another-string/35355946
  all_county_names.forEach((county) => {
    if (!unique_counties.includes(county)) {
      unique_counties.push(county);
    }
  });

  // console.log(data_year);
  // console.log(unique_counties);
  // console.log(all_county_names);
  // console.log(all_county_CO2_vals);

  //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  unique_counties.sort();
  j = 0;
  unique_counties.forEach((county) => {
    // console.log(`Iteration for ${county}`);
    i = 0;
    emissions_total = 0;

    all_county_names.forEach((currentname) => {
      // console.log(`Current name is: ${currentname}`);
      if (currentname === county) {
        i = all_county_names.indexOf(county, i);
        // console.log(`Name match at ${county} and ${currentname}`);
        // console.log(`Index of current ${currentname} is ${i}`);
        emissions_total = emissions_total + all_county_CO2_vals[i];
        i = i + 1;
      }
    });

    // Reference: https://www.jsdiaries.com/how-to-add-an-array-element-to-json-object-in-javascript/
    unique_values.push(emissions_total);
    county_totals["countytotals"].push({
      "countyname": `${unique_counties[j]}`,
      "co2total": unique_values[j],
    });

    j = j + 1;
  });

  // console.log(unique_values);
  // console.log(unique_counties);
  // console.log(all_county_CO2_vals);
  // console.log(county_totals);
  // console.log(county_totals instanceof Object);
  // console.log(county_totals["countytotals"].sort(sortBy("co2total")));
  county_totals["countytotals"] = county_totals["countytotals"].sort(sortBy("co2total"));
  return county_totals;
}

function parentTotals(data_year) {
  parent_totals = {"parenttotals": []};
  all_parent_names = [];
  all_parent_CO2_vals = [];
  all_parent_counties = [];
  unique_parents = [];
  unique_values = [];
  emissions_total = 0;

  Object.entries(data_year).forEach(([key, object]) => {
    // console.log(`${key}: ${object['COUNTY NAME']}`);
    all_parent_names.push(object["PARENT COMPANIES"]);
    all_parent_CO2_vals.push(object["GHG QUANTITY (METRIC TONS CO2e)"]);
    all_parent_counties.push(object["COUNTY NAME"]);
  });

  // console.log(all_county_names);
  // console.log(all_county_CO2_vals);

  // Reference: https://stackoverflow.com/questions/35355920/how-can-i-check-that-a-string-does-not-include-the-text-of-another-string/35355946
  all_parent_names.forEach((parent) => {
    if (!unique_parents.includes(parent)) {
      unique_parents.push(parent);
    }
  });

  unique_parents.sort();
  // console.log(all_county_names);
  // console.log(all_county_CO2_vals);

  //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  j = 0;
  unique_parents.forEach((parent) => {
    // console.log(`Iteration for ${county}`);
    i = 0;
    emissions_total = 0;

    all_parent_names.forEach((currentparent) => {
      // console.log(`Current name is: ${currentname}`);
      if (currentparent === parent) {
        i = all_parent_names.indexOf(parent, i);
        // console.log(`Name match at ${county} and ${currentname}`);
        // console.log(`Index of current ${currentname} is ${i}`);
        emissions_total = emissions_total + all_parent_CO2_vals[i];
        i = i + 1;
      }
    });

    // Reference: https://www.jsdiaries.com/how-to-add-an-array-element-to-json-object-in-javascript/
    unique_values.push(emissions_total);
    parent_totals["parenttotals"].push({
      "parentname": `${unique_parents[j]}`,
      "co2total": unique_values[j],
    });

    j = j + 1;
  });

  // console.log(unique_values);
  // console.log(unique_parents);
  // console.log(all_parent_CO2_vals);
  console.log(all_parent_counties);
  parent_totals["parenttotals"] = parent_totals["parenttotals"].sort(sortBy("co2total"));
  return parent_totals;
}


function buildStaticBarCounties(county_totals) {

  //Construct horizontal bar chart
  //Reference: https://plotly.com/javascript/hover-text-and-formatting/
  //Reference: https://plotly.com/javascript/horizontal-bar-charts/
  //Reference: https://community.plotly.com/t/flipping-horizontal-bar-chart-to-descending-order/15456

  // console.log(county_totals);

  x_values = [];
  y_values = [];
  chart_labels = [];

  for(let i = 0; i < 10; i++){

    x_values.push(county_totals["countytotals"][i]["co2total"]);
    y_values.push(county_totals["countytotals"][i]["countyname"].toString().toUpperCase());

  }

  // console.log(x_values);
  // console.log(y_values);

  var trace = {
    x: x_values,
    y: y_values,
    orientation: "h",
    marker: {
      color: "rgb(215,180,243)",
    },
    type: "bar",
  };

  var data = [trace];

  var layout = {
    title: `Top 10 Counties in CO2 Emissions for 2019`,
    xaxis: {
      title: "CO2 Emissions in (Metric Tons)",
    },
    yaxis: {
      autorange: "reversed",
      title: "",
    },
    autosize: false,
    width: 1000,
    height: 500,
    margin: {
      l: 200,
      r: 50,
      b: 100,
      t: 100,
      pad: 4 }
  };

  Plotly.newPlot("countybar", data, layout);


}

function buildStaticBarParents(parent_totals) {

  //Construct horizontal bar chart
  //Reference: https://plotly.com/javascript/hover-text-and-formatting/
  //Reference: https://plotly.com/javascript/horizontal-bar-charts/
  //Reference: https://community.plotly.com/t/flipping-horizontal-bar-chart-to-descending-order/15456

  // console.log(parent_totals);

  x_values = [];
  y_values = [];
  chart_labels = [];

  for(let i = 0; i < 5; i++){

    x_values.push(parent_totals["parenttotals"][i]["co2total"]);
    y_values.push(parent_totals["parenttotals"][i]["parentname"]);

  }

  // console.log(x_values);
  // console.log(y_values);

  var trace = {
    x: y_values,
    y: x_values,
    marker: {
      color: "palevioletred",
    },
    type: "bar",
  };

  var data = [trace];

  var layout = {
    title: `Top 5 Parent Companies' CO2 Emissions for 2019`,
    xaxis: {
      title: "",
    },
    yaxis: {
      title: "CO2 Emissions in (Metric Tons)",
    },
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4 }
  };

  Plotly.newPlot("parentbar", data, layout);

}

function buildStaticPie() {}

function buildCountySummary() {}

function buildGHGAnalysis() {
  /* data route */
  const url = "/api/GHGdata";
  d3.json(url)
    .then(function (ghgcountydata) {
      // console.log(ghgcountydata);

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

      // For loop to push data specific variables for access by year
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

      
      county_totals_2019 = countyTotals(data_2019);
      parent_totals_2019 = parentTotals(data_2019);
      // county_totals_2018 = countyTotals(data_2018);
      // parent_totals_2018 = parentTotals(data_2018);
      // county_totals_2017 = countyTotals(data_2017);
      // parent_totals_2017 = parentTotals(data_2017);
      // county_totals_2016 = countyTotals(data_2016);
      // parent_totals_2016 = parentTotals(data_2016);
      // county_totals_2015 = countyTotals(data_2015);
      // parent_totals_2015 = parentTotals(data_2015);
      // county_totals_2014 = countyTotals(data_2014);
      // parent_totals_2014 = parentTotals(data_2014);
      // county_totals_2013 = countyTotals(data_2013);
      // parent_totals_2013 = parentTotals(data_2013);
      // county_totals_2012 = countyTotals(data_2012);
      // parent_totals_2012 = parentTotals(data_2012);
      // county_totals_2011 = countyTotals(data_2011);
      // parent_totals_2011 = parentTotals(data_2011);
      // county_totals_2010 = countyTotals(data_2010);
      // parent_totals_2010 = parentTotals(data_2010);

      // console.log(county_totals_2019);
      // console.log(parent_totals_2019);
      buildStaticBarCounties(county_totals_2019);
      buildStaticBarParents(parent_totals_2019);



    })
    .catch((e) => {
      console.log(e);
    });
}

function buildAirAnalysis() {
  /* data route */
  const url = "/api/AIRdata";
    d3.json(url).then(function (data) {
    // console.log(data);

      var countiesAll = [];
      var NAAQSAll = [];

    Object.entries(data).forEach(([key, object]) => {
      countiesAll.push(object["county"]);
      NAAQSAll.push(object["NAAQS"]);
    });
  
    //console.log(NAAQSAll);

    var testdict = countiesAll.map((county,i) => ({county, NAAQS: NAAQSAll[i] }));
    // console.log(testdict);

    var countyair = [];
    testdict.reduce(function(res, value) {
      if (!res[value.county]) {
        res[value.county] = { county: value.county, NAAQS: 0 };
        countyair.push(res[value.county])
      }
      res[value.county].NAAQS += value.NAAQS;
      return res;
    }, {});
    
    // console.log(countyair);

    var airsort = countyair.sort((a,b) => (a.NAAQS > b.NAAQS) ? -1 : 1);
    //console.log(airsort);

    var countiesUnique = [];
    var NAAQSSum = [];

    Object.entries(airsort).forEach(([key, object]) => {
      countiesUnique.push(object["county"]);
      NAAQSSum.push(object["NAAQS"]);

    var trace1 = {
      x: countiesUnique,
      y: NAAQSSum,
      type: "bar"
    };

    var data = [trace1];

    var layout = {
      title: "Air Quality by County, 2009-2018",
      xaxis: { title: "County"},
      yaxis: { title: "Days over NAAQS"}
    };

    Plotly.newPlot("bar", data, layout);
    });
    })
    .catch((e) => {
      console.log(e);
    });
}

console.log("app.js is accessed.");
buildGHGAnalysis();
buildAirAnalysis();

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
// buildChoropleth();
