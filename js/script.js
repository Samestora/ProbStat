let barVals = [{ lbl: "andaikan", val: 6 }, { lbl: "saja", val: 9 }]; // dummy

const chart = document.querySelector("#chart");

const addVal = () => {
    const theLbl = document.querySelector("#lbl").value;
    const theVal = document.querySelector("#val").value;
    if (!theLbl || theVal === "") return false;
    if (!!barVals.find(n => n.lbl == theLbl)) {
        return alert("Duplicate!");
    }
    barVals.push({ lbl: theLbl, val: Number(theVal) });
    renderChart();
};

const renderChart = () => {
    // Clear!
    chart.innerHTML = '';

    const rawVals = barVals.map(q => q.val);
    const min = Math.min(...rawVals);
    const max = Math.max(...rawVals);
    const barWidth = 50;
    
    let currX = 0;
    let lgndStuff = `
    <h3>Legend</h3>
    <h3>============</h3>
    <hr>
    <ul style="list-style:none">`;

    for (let i = 0; i < barVals.length; i++) {
        const currHeight = 500*(barVals[i].val/max);
        const currHue = Math.floor(i * 360 / barVals.length);
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 
        bar.setAttribute("x", currX + 50);
        bar.setAttribute("y", chart.clientHeight - currHeight - 40);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", currHeight);
        bar.setAttribute("fill", `hsl(${currHue}, 100%, 40%)`);
        bar.classList.add("bar");
        chart.appendChild(bar);

        currX = currX + barWidth + 10;
        lgndStuff += `
        <li>
            <div class='lbl' style='background:hsl(${currHue}, 100%, 40%)'>
            </div>&nbsp;${barVals[i].lbl} &nbsp;
            <div class='lbl btn-lbl' onclick='removeVal("${barVals[i].lbl}")' title='Remove ${barVals[i].lbl}'>
                x
            </div>
        </li>`;

        let category = `<text text-anchor="middle" font-size="15" x=${(Number(bar.getAttribute('x')) + (Number(bar.getAttribute('x'))+ Number(bar.getAttribute('width'))))/2} y='580' fill="white" >${barVals[i].lbl}</text>`;
        let currentVal = `<text text-anchor="middle" font-size="15" x=${(Number(bar.getAttribute('x')) + (Number(bar.getAttribute('x'))+ Number(bar.getAttribute('width'))))/2} y='${Number(bar.getAttribute('y'))-10}' fill="white" >${barVals[i].val}</text>`;
        chart.innerHTML += currentVal;
        chart.innerHTML += category;
    }
    lgndStuff += '</ul>';
    document.querySelector('#lgnd').innerHTML = lgndStuff;

    // Y-Axis Label
    chart.innerHTML += `<text text-anchor="middle" font-size="15" x='20' y= 60px fill="white" >${max}</text>`;
    chart.innerHTML += `<text text-anchor="middle" font-size="15" x='20' y= 185px fill="white" >${max*0.75}</text>`;
    chart.innerHTML += `<text text-anchor="middle" font-size="15" x='20' y= 310px fill="white" >${max*0.5}</text>`;
    chart.innerHTML += `<text text-anchor="middle" font-size="15" x='20' y= 435px fill="white" >${max*0.25}</text>`;
    chart.innerHTML += `<text text-anchor="middle" font-size="15" x='20' y= 560px fill="white" >0</text>`;


    // X-Axis Line
    const xaxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xaxis.setAttribute("x1", 49);
    xaxis.setAttribute("x2", 800);
    xaxis.setAttribute("y1", 560);
    xaxis.setAttribute("y2", 560);
    xaxis.setAttribute("stroke", "white");
    xaxis.setAttribute("stroke-width", "5");
    xaxis.classList.add("xaxis");
    chart.appendChild(xaxis);

    // Y-Axis Line
    const yaxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yaxis.setAttribute("x1", 50);
    yaxis.setAttribute("x2", 50);
    yaxis.setAttribute("y1", 60);
    yaxis.setAttribute("y2", 562);
    yaxis.setAttribute("stroke", "white");
    yaxis.setAttribute("stroke-width", "5");
    yaxis.classList.add("yaxis");
    chart.appendChild(yaxis);
};

const removeVal = (l) => {
    barVals = barVals.filter(q => q.lbl != l);
    renderChart();
};

renderChart();