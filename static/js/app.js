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

function buildStaticBarCounties() { }

function buildStaticBarParents() { }

function buildStaticPie() { }

function buildCountySummary() { }

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
  d3.json(url).then(function (data) {
    console.log(data);

    var countiesAll = [];
    var NAAQSAll = [];

    Object.entries(data).forEach(([key, object]) => {
      countiesAll.push(object["county"]);
      NAAQSAll.push(object["NAAQS"]);
    });

    //console.log(NAAQSAll);

    var testdict = countiesAll.map((county, i) => ({ county, NAAQS: NAAQSAll[i] }));
    console.log(testdict);

    var countyair = [];
    testdict.reduce(function (res, value) {
      if (!res[value.county]) {
        res[value.county] = { county: value.county, NAAQS: 0 };
        countyair.push(res[value.county])
      }
      res[value.county].NAAQS += value.NAAQS;
      return res;
    }, {});

    console.log(countyair);

    var airsort = countyair.sort((a, b) => (a.NAAQS > b.NAAQS) ? -1 : 1);
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
        xaxis: { title: "County" },
        yaxis: { title: "Days over NAAQS" }
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

/////Megan Scatter/Bubble Chart Air GHG//////
///Reference: https://www.d3-graph-gallery.com/graph/bubble_tooltip.html///

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#bubble")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

//Add x axis label
svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width -400)
  .attr("y", height +30)
  .text("2018 Total GHG Emissions (CO2e)");

// Add y axis label
svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -40)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Air Pollution: # of Days Over Standard (NAAQS)");

//Read the data
d3.csv("https://raw.githubusercontent.com/mspriest/bubblechart2018/main/2018_bubbledata.csv").then( function(data) {

  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 19000000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 20])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  const z = d3.scaleLinear()
    .domain([20000, 16000000])
    .range([10, 40]);

  // Add a scale for bubble color
  // const myColor = d3.scaleOrdinal()
  //   .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
  //   .range(d3.schemeSet2);

  // -1- Create a tooltip div that is hidden by default:
  const tooltip = d3.select("#bubble")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "purple")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  const showTooltip = function(event, d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html(`County: ${d.County}<br>Person Days: ${d.PersonDays}`)
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2+30 + "px")
  }
  const moveTooltip = function(event, d) {
    tooltip
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2+30 + "px")
  }
  const hideTooltip = function(event, d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("class", "bubbles")
      .attr("cx", d => x(d.GHG_2018))
      .attr("cy", d => y(d.NAAQS))
      .attr("r", d => z(d.PersonDays))
        // .style("fill", d => myColor(d.continent))
  
    // -3- Trigger the functions
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

  })  

