document.addEventListener('DOMContentLoaded', function () {
    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

    // Load All
    const raw_strings = document.getElementById('inputArea');
    const button = document.getElementById('btn');
    const data = raw_strings.value.split(" ").map(Number).sort((a, b) => a - b);
    
    var histogramData = [
        { range: "0-10", frequency: 5 },
        { range: "11-20", frequency: 8 },
        { range: "21-30", frequency: 12 },
        // Add more data as needed
    ];

    button.addEventListener('click', function () {
        function createHistogram(data) {
        }
        createHistogram(data);
    });
});