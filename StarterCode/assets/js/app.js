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

    // x / y scales
        let xLinearScale = d3.scaleLinear()
            .domain([8.5, d3.max(riskData, d => d.poverty)])
            .range([0, width]);

        let yLinearScale = d3.scaleLinear()
            .domain([3.5, d3.max(riskData, d => d.healthcare)])
            .range([height, 0]);

    // x / axis
        let xAxis = d3.axisBottom(xLinearScale);
        let yAxis = d3.axisLeft(yLinearScale);

    // append to chart group
        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

        chartGroup.append("g")
        .call(yAxis);
        
        let circlesGroup = chartGroup.selectAll("circle")
            .data(riskData)
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", 10)
            .attr("fill", "lightblue")
            .attr("opacity", ".6")
            .attr("stroke-width", "1")
            .attr("stroke", "black");

            chartGroup.select("g")
            .selectAll("circle")
            .data(riskData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .attr("dy",-395)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black");
            
            console.log(riskData);

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 50)
            .attr("x", 0 -250)
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Healthcare (%)");