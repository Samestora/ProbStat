let barVals = [{ lbl: "andaikan", val: 6 }, { lbl: "sajaygy", val: 9 }]; // our values

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
    if (!barVals.length){
        return false;
    }

    const rawVals = barVals.map(q => q.val);
    const min = Math.min(...rawVals) - 1;
    const max = Math.max(...rawVals) + 1;
    const barWidth = chart.clientWidth / barVals.length;

    let currX = 0;
    let lgndStuff = '<h3>Legend:</h3><hr><ul style="list-style:none">';

    for (let i = 0; i < barVals.length; i++) {
        const currHeight = Number(chart.clientHeight) * (barVals[i].val - min) / (max - min);
        const currHue = Math.floor(i * 360 / barVals.length);
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 
        bar.setAttribute("x", currX);
        bar.setAttribute("y", chart.clientHeight - currHeight);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", currHeight);
        bar.setAttribute("fill", `hsl(${currHue}, 100%, 40%)`);
        bar.classList.add("bar");
        chart.appendChild(bar);

        currX = Math.floor(currX + barWidth);
        lgndStuff += `<li><div class='lbl' style='background:hsl(${currHue}, 100%, 40%)'></div>&nbsp;${barVals[i].lbl} &nbsp;<div class='lbl btn-lbl' onclick='removeVal("${barVals[i].lbl}")' title='Remove ${barVals[i].lbl}'>x</div></li>`;
    }
    lgndStuff += '</ul>';
    document.querySelector('#lgnd').innerHTML = lgndStuff;
};

const removeVal = (l) => {
    barVals = barVals.filter(q => q.lbl != l);
    renderChart();
};

renderChart();