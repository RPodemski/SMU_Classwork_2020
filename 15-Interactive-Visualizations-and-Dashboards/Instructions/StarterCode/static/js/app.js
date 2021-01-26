worldData = [];

$(document).ready(function() {
    readData();

    $('#selDataset').change(function() {
        work();
    });
});

function readData() {
    d3.json("samples.json").then(function(data) {
        worldData = data;

        filter(data);
        work();
    });
}

function work() {
    var sample = parseInt($("#selDataset").val());
    var mData = worldData.metadata.filter(x => x.id === sample)[0];
    var sampData = worldData.samples.filter(x => x.id == sample)[0];
    panel(mData);
    plots(sampData, mData);
}

function plots(sampData, mData) {
    $('#plots').show();

    bar(sampData);
    bubble(sampData);
    guage(mData);
}

function filter(data) {
    data.names.forEach(function(val) {
        var nOption = `<option>${val}</option>`;
        $('#selDataset').append(nOption);
    });
}

function panel(mData) {
    $("#sample-metadata").empty();

    Object.entries(mData).forEach(function(d, i) {
        var entry = `<span><b>${d[0]}:</b> ${d[1]}</span><br>`;
        $("#sample-metadata").append(entry);
    });
}

function bar(sampData) {
    var yLabel = sampData.otu_ids.slice(0, 10).reverse().map(x => `OTU ID: ${x}`);
    var trace1 = {
        x: sampData.sample_values.slice(0, 10).reverse(),
        y: yLabel,
        text: sampData.otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: "h",
        marker: { color: '#2E0014' }

    };

    var layout = {
        title: "Top Bacteria in Subjects Belly Button",
        xaxis: { title: "Amount of Bacteria" },
        yaxis: {
            title: "ID of Bacteria",
            tickangle: -40,
        }
    }

    var trace = [trace1];

    Plotly.newPlot('bar', trace, layout);
}

function bubble(sampData) {
    var trace1 = {
        x: sampData.otu_ids,
        y: sampData.sample_values,
        mode: 'markers',
        marker: {
            size: sampData.sample_values,
            color: "#2E0014"
        },

        text: sampData.otu_labels

    };

    var trace = [trace1];

    var layout = {
        title: "Amount of Bacteria in Subjects Belly Button",
        xaxis: { title: "ID of Bacteria" },
        yaxis: { title: "Amount of Bacteria" }
    }

    Plotly.newPlot('bubble', trace, layout);
}

function guage(mData) {
    var max_wfreq = 10;

    var trace1 = {
        domain: { x: [0, 1], y: [0, 1] },
        value: mData.wfreq,
        title: { text: "Frequency of Washing Belly Button" },
        type: "indicator",
        gauge: {
            axis: { range: [null, max_wfreq] },
            bar: { color: "#2E0014" },
            steps: [
                { range: [0, 7], color: "#E1E2EF" },
                { range: [7, 10], color: "#AD9BAA" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 2
            }
        },
        mode: "gauge+number"
    };
    var trace = [trace1];

    var layout = {
        font: { color: "Black" }
    }
    Plotly.newPlot('gauge', trace, layout);
}