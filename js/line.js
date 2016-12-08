!function () {
    var width = 720,
        height = width * 2 / 3,
        margin = 30,
        startTime = 1480535424,
        endTime = 1481140224,
        lowestScore = 0,
        highestScore = 800,
        y = d3.scale.linear().domain([highestScore, lowestScore]).range([0 + margin, height - margin]),
        x = d3.scale.linear().domain([startTime, endTime]).range([6 + margin,  width]),
        times = d3.range(startTime, endTime),
        vis = d3.select("#line-vis").append("svg:svg").attr("width", width).attr("height", height).append("svg:g");

    var line = d3.svg.line().x(function (d, i) {
        return x(d.x);
    }).y(function (d, i) {
        return y(d.y);
    });

    // Add x-axis.
    vis.append("svg:line").attr("x1", x(startTime)).attr("y1", y(lowestScore)).attr("x2", x(endTime)).attr("y2", y(lowestScore)).attr("class", "axis");

    // Add labels for x-axis.
    vis.selectAll(".xLabel").data(x.ticks(5)).enter().append("svg:text").attr("class", "xLabel").text(function (d) {
        return moment.unix(d).format("DD-MM-YYYY");
    }).attr("x", function (d) {
        return x(d);
    }).attr("y", height - 10).attr("text-anchor", "middle");

    // Add ticks for x-axis.
    vis.selectAll(".xTicks").data(x.ticks(5)).enter().append("svg:line").attr("class", "xTicks").attr("x1", function (d) {
        return x(d);
    }).attr("y1", y(lowestScore)).attr("x2", function (d) {
        return x(d);
    }).attr("y2", y(lowestScore) + 8);

    // Add y-axis.
    vis.append("svg:line").attr("x1", x(startTime)).attr("y1", y(lowestScore)).attr("x2", x(startTime)).attr("y2", y(highestScore)).attr("class", "axis");

    // Add labels for y-axis.
    vis.selectAll(".yLabel").data(y.ticks(4)).enter().append("svg:text").attr("class", "yLabel").text(String).attr("x", 0).attr("y", function (d) {
        return y(d);
    }).attr("text-anchor", "right").attr("dy", 3).attr("dx", function (d) {
        if (d === 0) {
            return 17; // this number is totally arbitrary to make the graph look nice.
        } else {
            return 0;
        }
    });

    // Add ticks for y-axis.
    vis.selectAll(".yTicks").data(y.ticks(4)).enter().append("svg:line").attr("class", "yTicks").attr("y1", function (d) {
        return y(d);
    }).attr("x1", x(startTime)).attr("y2", function (d) {
        return y(d);
    }).attr("x2", x(startTime) - 5);

    // Add data to the line graph.
    d3.json("./line.json", function (error, data) {
        if (error) throw error;

        data.forEach(function (system) {
            var averageHealthScore = Math.floor(system.data.map(function (d) {
                return 1 * d.score;
            }).reduce(function (x, y) {
                return x + y;
            }, 0) / system.data.length);

            vis.append("svg:path").data([system.data.map(function (d) {
                return {
                    x: d.time,
                    y: d.score
                };
            })]).attr("system", system.id).attr("d", line).on("mouseover", onMouseOver).on("mouseout", onMouseOut)
                .attr("system-name", system.name).attr("system-score", averageHealthScore);
        });
    });

    function onMouseOver(d, i) {
        $(this).addClass("current");
        $("#line-vis-blurb .system-name").html($(this).attr("system-name"));
        $("#line-vis-blurb .health-score").html($(this).attr("system-score"));
        $("#line-vis-blurb").removeClass("hidden").addClass("visible");
    }

    function onMouseOut(d, i) {
        $(this).removeClass("current");
        $("#line-vis-blurb").removeClass("visible").addClass("hidden");
    }
}();
