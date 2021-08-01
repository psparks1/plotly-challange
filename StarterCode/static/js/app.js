
var dropMenu=d3.select("#selDataset")

function init(){

    d3.json("data/samples.json").then((data)=>{

        data.names.forEach((x)=>{

            dropMenu.append("option").text(x).property("value");

        });
        selectPlot(data.names[0]);
        selectDemographics(data.names[0]);
    });


};

function selectPlot(id) {


    d3.json("samples.json").then((data)=>{

            //setting variables for plot
        var sample=data.samples.filter(b=>b.id==id)[0];

        ///console.log(`Sample: ${sample.sample_values}`) testing

        var sampleValues= sample.sample_values.slice(0,10).reverse()
        var otuIDs=sample.otu_ids.slice(0,10).reverse()
        var otuLables=sample.otu_labels.slice(1,10);
        console.log(`Sample: ${otuIDs}`)

        ///setting plot 1 data
        var trace1 = {
            type:"bar",
            orientation: "h",
            x: sampleValues,
            y: otuIDs,
            text: otuLables,
        };

        var data=[trace1];

        //creating plot 1 layout
        var layout = {
            title: "Top 10 Bacteria Cultures Found",
            yaxis: {tickmode:"linear"},
            width: 800,
            height: 600,
            margin: {
                l: 80,
                r: 10,
                t: 50,
                b: 30
            }
        };

        Plotly.newPlot("bar",data,layout)

        var trace2 = {
            
            x: sample.otu_ids,
            y: sample.sample_values,
            mode:'markers',
            marker:{
                size: sample.sample_values,
                color: sample.otu_ids
            },
            text: sample.otu_labels,
        };
        var data=[trace2];

        var layout = {
            title: "Bacteria Cultures by Sample",
            yaxis: {tickmode:"linear"},
            width: 1100,
            height: 700,
            
        };

        Plotly.newPlot('bubble',data,layout)


    });


};


function selectDemographics(id) {

    d3.json("data/samples.json").then((data)=> {
            
        var metadata = data.metadata.filter(d => d.id == id)[0];
    
        var demographics = d3.select("#sample-metadata");
            
        demographics.html("");
    
        Object.entries(metadata).forEach(([key,value]) => {   
                    demographics.append("h5").text(`${key}: ${value}`);   
        });
    });
};
    
function optionChanged(id) {
    selectPlot(id);
    selectDemographics(id);
};
    
init();
