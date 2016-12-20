var lineData = {};

function fetchLineData(redraw) {
    var ids = jQuery.makeArray($(".custom-checkbox:checked").map(function (x) {
        return $(".custom-checkbox:checked").get(x).value;
    })).reduce(function (x, y) {
        return x + "," + y;
    });

    d3.json("http://localhost:8081/line/" + ids, function (error, data) {
        if (error) throw error;
        lineData = data;
        if (redraw !== undefined) {
            drawSizedLineGraph();
        }
        $("#update").removeClass("disabled");
    });

}

var colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6",
              "#16a085", "#27ae60", "#2980b9", "#8e44ad",
                         "#e67e22", "#e74c3c",
                         "#d35400", "#c0392b"];

var lowestScore = 150, highestScore = 800;

function updateLineRange(event) {
    lowestScore = event.value[0];
    highestScore = event.value[1];
}

function drawLineGraph(width) {
    d3.select("#line-vis").select("svg").remove();

    var height = width * 2 / 3,
        margin = 30,
        startTime = 1465550146,
        endTime = 1478345159,
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

    var colorIndex = 0;

    // Add data to the line graph.
    lineData.forEach(function (system) {
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
        })]).attr("system", system.id).attr("d", line)
            .style("stroke", function() { return colors[colorIndex]; })
            .on("mouseover", onMouseOver).on("mouseout", onMouseOut)
            .attr("system-name", system.name).attr("system-score", averageHealthScore)
            .attr("color-index", colorIndex);

        // Color code the names on the left-side.
        $("label[system=" + system.id + "]").css("color", function () {
            return colors[colorIndex];
        });

        colorIndex += 1;
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
}

function drawSizedLineGraph() {
    drawLineGraph(Math.floor(this.innerWidth * ((this.innerWidth < 768) ? 0.8 : 0.49)));
}

$(fetchLineData(true));
