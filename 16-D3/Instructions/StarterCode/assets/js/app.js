// @TODO: YOUR CODE HERE!

var chooseX = "poverty";
var chooseY = "healthcare";

$(document).ready(function() {
    scatterPlot();
});

function scatterPlot() {
    d3.csv("assets/data/data.csv").then(function(cData) {
        console.log(cData);

        $("#scatter").empty();

        var svgW = 1000;
        var svgH = 800;

        var margin = {
            top: 40,
            right: 115,
            bottom: 80,
            left: 80
        };

        var chartW = svgW - margin.left - margin.right;
        var chartH = svgH - margin.top - margin.bottom;


        var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgW)
            .attr("height", svgH)
            .classed("chart", true);

        var chartG = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        cData.forEach(function(row) {
            row.poverty = +row.poverty;
            row.healthcare = +row.healthcare;
            row.age = +row.age;
            row.income = +row.income;
            row.obesity = +row.obesity;
            row.smokes = +row.smokes;
        });

        var xScale = XScale(cData, chartW);
        var yScale = YScale(cData, chartH);
        var lAxis = d3.axisLeft(yScale);
        var bAxis = d3.axisBottom(xScale);

        var xAxis = chartG.append("g")
            .attr("transform", `translate(0, ${chartH})`)
            .call(bAxis);

        var yAxis = chartG.append("g")
            .call(lAxis);

        var textG = chartG.append("g")
            .selectAll("text")
            .data(cData)
            .enter()
            .append("text")
            .text(function(d) { return d.abbr })
            .attr("alignment-baseline", "central")
            .attr("font-size", 12)
            .classed("stateText", true);

        var circlesG = chartG.append("g")
            .selectAll("circle")
            .data(cData)
            .enter()
            .append("circle")
            .style("opacity", .4)
            .attr("stroke-width", "2")
            .classed("stateCircle", true)

        chartG.selectAll("circle")
            .transition()
            .duration(5000)
            .attr("cx", function(d) { return xScale(d[chooseX]) })
            .attr("cy", function(d) { return yScale(d[chooseY]) })
            .attr("r", "15")
            .style("opacity", .4)
            .delay(function(d, i) { return i * 100 });

        chartG.selectAll(".stateText")
            .transition()
            .duration(5000)
            .attr("x", function(d) { return xScale(d[chooseX]) })
            .attr("y", function(d) { return yScale(d[chooseY]) })
            .delay(function(d, i) { return i * 100 });

        //YAxis
        chartG.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 0)
            .attr("x", 0 - (chartH / 2))
            .attr("dy", "1em")
            .attr("class", "axisText active")
            .attr("id", "healthcare")
            .text("Lacks Healthcare %")
            .style("cursor", "pointer")
            .on("click", function() {
                chooseY = "healthcare";

                yScale = YScale(cData, chartH);
                lAxis = d3.axisLeft(yScale);
                yAxis = YAxis(yAxis, lAxis);

                circlesG = updateCir(circlesG, xScale, yScale);
                textG = updateT(textG, xScale, yScale);

                circlesG = createTT(circlesG);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#smokes").classed("active", false);
                d3.select("#smokes").classed("inactive", true);
                d3.select("#obesity").classed("active", false);
                d3.select("#obesity").classed("inactive", true);
            });

        chartG.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (chartH / 2))
            .attr("dy", "1em")
            .attr("class", "axisText inactive")
            .attr("id", "smokes")
            .text("Smokes %")
            .style("cursor", "pointer")
            .on("click", function() {
                chooseY = "smokes";

                yScale = YScale(cData, chartH);
                lAxis = d3.axisLeft(yScale);
                yAxis = YAxis(yAxis, lAxis);

                circlesG = updateCir(circlesG, xScale, yScale);
                textG = updateT(textG, xScale, yScale);

                circlesG = createTT(circlesG);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#healthcare").classed("active", false);
                d3.select("#healthcare").classed("inactive", true);
                d3.select("#obesity").classed("active", false);
                d3.select("#obesity").classed("inactive", true);
            });

        chartG.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (chartH / 2))
            .attr("dy", "1em")
            .attr("class", "axisText inactive")
            .attr("id", "obesity")
            .text("Obesity %")
            .style("cursor", "pointer")
            .on("click", function() {
                chooseY = "obesity";

                yScale = YScale(cData, chartH);
                lAxis = d3.axisLeft(yScale);
                yAxis = YAxis(yAxis, lAxis);

                circlesG = updateCir(circlesG, xScale, yScale);
                textG = updateT(textG, xScale, yScale);

                circlesG = createTT(circlesG);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#smokes").classed("active", false);
                d3.select("#smokes").classed("inactive", true);
                d3.select("#healthcare").classed("active", false);
                d3.select("#healthcare").classed("inactive", true);
            });
        //X Axis
        chartG.append("text")
            .attr("transform", `translate(${chartW / 2}, ${chartH + margin.top - 5})`)
            .attr("class", "axisText active")
            .attr("id", "poverty")
            .text("Poverty %")
            .style("cursor", "pointer")
            .on("click", function() {
                chooseX = "poverty";

                xScale = XScale(cData, chartW);
                bAxis = d3.axisBottom(xScale);
                xAxis = XAxis(xAxis, bAxis);

                circlesG = updateCir(circlesG, xScale, yScale);
                textG = updateT(textG, xScale, yScale);

                circlesG = createTT(circlesG);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#age").classed("active", false);
                d3.select("#age").classed("inactive", true);
                d3.select("#income").classed("active", false);
                d3.select("#income").classed("inactive", true);
            });

        chartG.append("text")
            .attr("transform", `translate(${chartW / 2}, ${chartH + margin.top + 15})`)
            .attr("class", "axisText inactive")
            .attr("id", "age")
            .text("Age (Median)")
            .style("cursor", "pointer")
            .on("click", function() {
                chooseX = "age";

                xScale = XScale(cData, chartW);
                bAxis = d3.axisBottom(xScale);
                xAxis = XAxis(xAxis, bAxis);

                circlesG = updateCir(circlesG, xScale, yScale);
                textG = updateT(textG, xScale, yScale);

                circlesG = createTT(circlesG);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#poverty").classed("active", false);
                d3.select("#poverty").classed("inactive", true);
                d3.select("#income").classed("active", false);
                d3.select("#income").classed("inactive", true);
            });

        chartG.append("text")
            .attr("transform", `translate(${chartW / 2}, ${chartH + margin.top + 35})`)
            .attr("class", "axisText inactive")
            .attr("id", "income")
            .text("Household Income (Median)")
            .style("cursor", "pointer")
            .on("click", function() {
                chooseX = "income";

                xScale = XScale(cData, chartW);
                bAxis = d3.axisBottom(xScale);
                xAxis = XAxis(xAxis, bAxis);

                circlesG = updateCir(circlesG, xScale, yScale);
                textG = updateT(textG, xScale, yScale);

                circlesG = createTT(circlesG);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#poverty").classed("active", false);
                d3.select("#poverty").classed("inactive", true);
                d3.select("#age").classed("active", false);
                d3.select("#age").classed("inactive", true);
            });

        circlesG = createTT(circlesG);

    });

}

function XScale(cData, chartW) {
    var xScale = d3.scaleLinear()
        .domain(d3.extent(cData, function(d) { return d[chooseX] }))
        .range([0, chartW]);

    return xScale;
}

function YScale(cData, chartH) {
    var yScale = d3.scaleLinear()
        .domain(d3.extent(cData, function(d) { return d[chooseY] }))
        .range([chartH, 0]);

    return yScale;
}

function XAxis(xAxis, bAxis) {
    xAxis.transition()
        .duration(1000)
        .call(bAxis);

    return xAxis;
}

function YAxis(yAxis, lAxis) {
    yAxis.transition()
        .duration(1000)
        .call(lAxis);

    return yAxis;
}

function updateCir(circlesG, xScale, yScale) {
    circlesG.transition()
        .duration(1000)
        .attr("cx", function(d) { return xScale(d[chooseX]) })
        .attr("cy", function(d) { return yScale(d[chooseY]) });

    return circlesG;
}

function updateT(textG, xScale, yScale) {
    textG.transition()
        .duration(1000)
        .attr("x", function(d) { return xScale(d[chooseX]) })
        .attr("y", function(d) { return yScale(d[chooseY]) });

    return textG;
}

function createTT(circlesG) {

    var xLabel = "";
    if (chooseX == "poverty") {
        xLabel = "Poverty";
    } else if (chooseX == "income") {
        xLabel = "Household Income";
    } else {
        xLabel = "Age";
    }

    var yLabel = "";
    if (chooseY == "healthcare") {
        yLabel = "Lacks Healthcare"
    } else if (chooseY == "smokes") {
        yLabel = "Smokes"
    } else {
        yLabel = "Obese"
    }


    var toolT = d3.tip()
        .attr("class", "d3-tip")
        .offset([180, -60])
        .html(function(d) {
            return (`<strong>${d.state}</strong><br><strong>${xLabel}: ${d[chooseX]}</strong><br><strong>${yLabel}: ${d[chooseY]}</strong>`);
        });

    circlesG.call(toolT);
    circlesG.on("mouseover", function(event, d) {
        toolT.show(d, this);

        d3.select(this)
            .transition()
            .duration(500)
            .attr("r", 100);
    })

    .on("mouseout", function(event, d) {
        toolT.hide(d);

        d3.select(this)
            .transition()
            .duration(500)
            .attr("r", 15);

    });

    return circlesG;
}