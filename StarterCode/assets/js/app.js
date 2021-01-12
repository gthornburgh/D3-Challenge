// @TODO: YOUR CODE HERE!
function makeResponsive() {

    let svgWidth = 960;
    let svgHeight = 500;
    let margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left:100
    };
    

   // svg height / width
   let width = svgWidth - margin.left - margin.right;
   let height = svgHeight - margin.top - margin.bottom;

   // svg wrapper, append group with size
   let svg = d3.select("#scatter")
       .append("svg")
       .attr("width", svgWidth)
       .attr("height", svgHeight);
    
    let chartGroup = svg.append("g")
       .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // import csv
    d3.csv("/assets/data/data.csv")
        .then(function(riskData){

    // retrieve data, convert to string
    riskData.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.abbr = data.abbr;
        data.income = +data.income;
    });