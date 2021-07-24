function countyTotals(data_year) {
  county_totals = { countytotals: [] };
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
  // console.log(all_county_names);
  // console.log(all_county_CO2_vals);

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

    unique_values.push(emissions_total);
    county_totals["countytotals"].push({
      countyname: `${unique_counties[j]}`,
      co2total: unique_values[j],
    });

    j = j + 1;
  });

  // console.log(unique_values);
  // console.log(unique_counties);
  // console.log(all_county_CO2_vals);
  return county_totals;
}

function parentTotals(data_year) {
  parent_totals = { parenttotals: [] };
  all_parent_names = [];
  all_parent_CO2_vals = [];
  unique_parents = [];
  unique_values = [];
  emissions_total = 0;

  Object.entries(data_year).forEach(([key, object]) => {
    // console.log(`${key}: ${object['COUNTY NAME']}`);
    all_parent_names.push(object["PARENT COMPANIES"]);
    all_parent_CO2_vals.push(object["GHG QUANTITY (METRIC TONS CO2e)"]);
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

    unique_values.push(emissions_total);
    parent_totals["parenttotals"].push({
      parentname: `${unique_parents[j]}`,
      co2total: unique_values[j],
    });

    j = j + 1;
  });

  // console.log(unique_values);
  // console.log(unique_parents);
  // console.log(all_parent_CO2_vals);
  return parent_totals;
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

      console.log(data_2019);
      yearly_county_totals = countyTotals(data_2019);
      yearly_parent_totals = parentTotals(data_2019)
      
      console.log(yearly_county_totals);
      console.log(yearly_parent_totals);

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
buildGHGAnalysis();
buildAirAnalysis();
