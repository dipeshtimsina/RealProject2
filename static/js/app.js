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

  // console.log(all_county_names);
  // console.log(all_county_CO2_vals);

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
      //console.log(ghgcountydata);

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

function buildAirAnalysis() {
  /* data route */
  const url = "/api/AIRdata";
  d3.json(url)
    .then(function (data) {
      //console.log(data);

      var countiesAll = [];
      var NAAQSAll = [];

      Object.entries(data).forEach(([key, object]) => {
        countiesAll.push(object["county"]);
        NAAQSAll.push(object["NAAQS"]);
      });

      //console.log(NAAQSAll);

      var testdict = countiesAll.map((county, i) => ({
        county,
        NAAQS: Number(NAAQSAll[i]),
      }));

      var countyair = [];

      //https://www.codegrepper.com/code-examples/javascript/javascript+group+by+sum+array+reduce
      testdict.reduce(function (res, value) {
        if (!res[value.county]) {
          res[value.county] = { county: value.county, NAAQS: 0 };
          countyair.push(res[value.county]);
        }
        res[value.county].NAAQS += value.NAAQS;
        return res;
      }, {});

      
      var airsort = countyair.sort((a, b) => (a.NAAQS > b.NAAQS ? -1 : 1));
      //console.log(airsort);


      //countyair.map(({ NAAQS }) => NAAQS).sort().reverse()
      var countiesUnique = [];
      var NAAQSSum = [];

      Object.entries(airsort).forEach(([key, object]) => {
        countiesUnique.push(object["county"]);
        NAAQSSum.push(object["NAAQS"]);
      });

      var countyX = countiesUnique.reverse().slice(23).reverse();
      var countyY = NAAQSSum.reverse().slice(23).reverse();

      var trace1 = {
        x: countyX,
        y: countyY,
        type: "bar",
      };

      var data = [trace1];

      var layout = {
        title: "Air Quality by County, 2009-2018",
        xaxis: { title: "County" },
        yaxis: { title: "Days over NAAQS" },
      };

      Plotly.newPlot("bar", data, layout);

      // var unique_counties = [...new Set(all_counties)];
      // console.log(unique_counties);
    })
    .catch((e) => {
      console.log(e);
    });
}
  
  
console.log("app.js is accessed.");
buildGHGAnalysis();
buildAirAnalysis();
