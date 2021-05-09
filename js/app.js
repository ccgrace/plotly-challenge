d3.json("./data/samples.json").then((data) => {
    dropDown(data.names)
    barPlot(data.samples[0])
    bubblePlot(data.samples[0])
});


// Populates the dropdown with subject ID
function dropDown(ID) {
    let options = d3.select("#selDataset");
        ID.forEach((id) => {
            let option = options.append("option");
            option.text(id).property("value", id)
        })
    };

// Creates Barplot using slice method to limit to top 10 values
function barPlot(subject) {
    var xValue = subject.sample_values.slice(0, 10);
    var yValue = subject.otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`);
    var hoverText = subject.otu_labels.slice(0, 10)
    let trace1 = {
        type: "bar",
        x: xValue.reverse(),
        y: yValue.reverse(),
        text: hoverText,
        orientation: "h",
    }
    var data = [trace1]
    var layout = {
        title: "Top 10 Bacteria Cultures Found"
    }
    Plotly.newPlot("bar", data, layout);
};

function bubblePlot(subject) {
    var xValue = subject.otu_ids;
    var yValue = subject.sample_values;

    let trace2 = {
        x: xValue,
        y: yValue,
        text: subject.otu_labels
        mode: "markers",
        marker: {
            color: subject.otu_ids,
            size: subject.sample_values,
        };
    };

    var data = [trace2]

    var layout = {
        title: "Bacteria Cultures Per Sample"
    };

    Plotly.newPlot("bubble", data, layout);
};