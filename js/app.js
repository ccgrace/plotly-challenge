d3.json("./data/samples.json").then((data) => {
    dropDown(data.names);   //These functions are used to initialize the dashboard
    barPlot(data.samples[0]);
    bubblePlot(data.samples[0]);
    gaugePlot(data.metadata[0]);
    metaData(data.metadata[0]);
    

    let selectedSubject = d3.select("#selDataset");
    selectedSubject.on("change",function() {        //creates an on-change function to update the visualizations based on subject
    var subject = selectedSubject.property("value") //pulls the subject nuber that is selected
    var sbjIndex = data.names.indexOf(subject)  //uses the value of "names" to identify the index so that it can be referenced in the functions below

    dropDown(data.names);
    barPlot(data.samples[sbjIndex]);
    bubblePlot(data.samples[sbjIndex]);
    gaugePlot(data.metadata[sbjIndex]);
    metaData(data.metadata[sbjIndex]);
    })
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

// Creates bubbleplot using simple refereneces to data elemnts
function bubblePlot(subject) {
    var xValue = subject.otu_ids;
    var yValue = subject.sample_values;

    let trace2 = {
        x: xValue,
        y: yValue,
        text: subject.otu_labels,
        mode: "markers",
        marker: {
            color: subject.otu_ids,
            size: subject.sample_values,
        }
    };

    var data = [trace2]

    var layout = {
        title: "Bacteria Cultures Per Sample"
    };

    Plotly.newPlot("bubble", data, layout);
};

// Creates a gauge plot with stepping color codes for washed per week
function gaugePlot(subject) {
    let trace3 = {
        domain: {x: [0,1], y: [0,1]},
        value: subject.wfreq,
        title: {text: "Scrubs per Week"},
        type: "indicator",
        mode: "gauge",
        gauge: {axis: {range: [null, 9], tickwidth: 1},
                steps: [
                    {range: [0, 1], color: "#ffffff"},
                    {range: [1, 2], color: "#ccffff"},
                    {range: [2, 3], color: "#99ffff"},
                    {range: [3, 4], color: "#66ffff"},
                    {range: [4, 5], color: "#33ffff"},
                    {range: [5, 6], color: "#00ffff"},
                    {range: [6, 7], color: "#00cccc"},
                    {range: [7, 8], color: "#009999"},
                    {range: [8, 9], color: "#006666"}
                    ]
                }
    };

    var data = [trace3];

    var layout = {
        title: "Belly Button Washing Frequency"
    };

    Plotly.newPlot("gauge", data, layout);
};

// Displays metadata by clearing the html of the div then doing a for loop to pass the key and value for the subject
function metaData(subject) {
    sample_metaData = d3.select("#sample-metadata").html("")
    Object.entries(subject).forEach(([key, value])=> {
        let metaData = sample_metaData.append("p").text(`${key}: ${value}`);
    });
};