d3.json("./data/samples.json").then((data) => {
    dropDown(data.names)
});


// Populates the dropdown with subject ID
function dropDown(ID) {
    let options = d3.select("#selDataset");
        ID.forEach((id) => {
            let option = options.append("option");
            option.text(id).property("value", id)
        })
    };

function barPlot(subject) {
    var xValue = subject.sample_values.slice(0, 10);
    var yValue = subject.otu_ids.slice(0, 10).map(otu => `OTU ${otu_id}`);
    var hoverText = subject.otu_labels.slice(0, 10)
    let trace1 = {
        type: "bar",
        x: xValue,
        y: yValue,
    }
    var data = [trace1]
    var layout = {
        title: "Top 10 Bacteria Cultures Found"
    }

};