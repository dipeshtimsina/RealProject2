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
  
  function buildCountyAnalysis() {
    /* data route */
    const url = "/api/data";
    d3.json(url).then(function (countydata) {

      console.log(countydata);
  
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

    });
  }
  console.log("app.js is accessed.");
  buildCountyAnalysis();
  