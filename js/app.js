d3.json("./data/samples.json").then((data) => {
    dropDown(data.names);
    barPlot(data.samples[0]);
    bubblePlot(data.samples[0]);
    metaData(data.metadata[0])
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

// Displays metadata by clearing the html of the div then doing a for loop to pass the key and value for the subject
function metaData(subject) {
    sample_metaData = d3.select("#sample-metadata").html("")
    Object.entries(subject).forEach(([key, value])=> {
        let metaData = sample_metaData.append("p").text(`${key}: ${value}`);
    });
}

// Creates an on-change function to perform data functions based on chosen Subject ID
let selectedSubject = d3.select("#selDataset");
selectedSubject.on("change",function() {
    var subject = selectedSubject.property("value")
    // console.log(subject)
});

let sbjIndex = data.names.indexOf(subject);
console.log(sbjIndex);