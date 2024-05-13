// Validasi
function validation(elem) {
    const value = elem.value;
    const numVal = value.replace(/[^\d\n]+/g, " ");
    elem.value = numVal;
}

//  On click tampilin :
//      frekuensi     [v]
//      mean          [v]
//      nilai min/max [v]
//      kelas min/max [v]
//      range         [v]
//      jmlh kelas    [v]

document.addEventListener('DOMContentLoaded', function () {
    // Load All
    const raw_strings = document.getElementById('inputArea');
    const button = document.getElementById('btn');
    const frequencyTable = document.getElementById('frequencyTable');

    button.addEventListener('click', function () {
        // Clear previous data
        frequencyTable.innerHTML = ''; 
        moreinfoTable.innerHTML = '';

        // get user data from inputArea
        const data = raw_strings.value.split(" ").map(Number).sort((a, b) => a - b); // Convert to numbers and sort
        
        // get class number and it's interval
        const class_number = Math.sqrt(data.length);
        const interval = data.length === 1 || data[data.length - 1] === data[0] ? data[0] : Math.round((data[data.length - 1] - data[0]) / class_number);

        // show table head
        frequencyTable.innerHTML += `
        <thead>
            <tr>
                <th colspan="3">Tabel Frekuensi</th>
            </tr>
            <tr>
                <th>N</th>
                <th>Kelas</th>
                <th>Frekuensi</th>
            </tr>
        </thead>
        <tbody id="frequencyBody">
        </tbody>
        `
        // read frequencyBody (or data if you will...)
        const frequencyBody = document.getElementById('frequencyBody');

        //stylying yeeahhh
        frequencyTable.style.border = "0.5px solid black";
        moreinfoTable.style.border = "0.5px solid black";

        // for loop prep
        let class_read = 0;
        let number = 1;
        let class_read_bottom = 0;

        // get class frequency
        for (let show_all = 0; show_all < Math.round(class_number); show_all++) {
            let frequency = 0;
            for (let j = class_read; j < class_read + interval; j++) {
                if (data.includes(j)) {
                    frequency++;
                }
            }
            class_read += interval;
            if (class_read === 0){class_read = 1}
            const template = `
                <tr>
                    <td id=n${number}> ${number} </td>
                    <td id=r${number}> ${class_read_bottom}-${class_read - 1} </td>
                    <td id=f${number}> ${frequency} </td>
                </tr>`;

            frequencyBody.innerHTML += template;
            number++;
            class_read_bottom = class_read;
        }
        // get mean for moreinfo
        const mean = data.reduce((a, b) => a + b, 0) / data.length;

        // moreinfo show all
        moreinfoTable.innerHTML += `
            <thead>
                <tr>
                    <th colspan="7">Informasi tambahan</th>
                </tr>
            </thead>
            
            <tbody id="moreinfoBody">
                <tr>
                    <td>Mean</td>
                    <td>${mean.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Nilai terkecil</td>
                    <td id=min-val>${Math.min(...data)}</td>
                </tr>
                <tr>
                    <td>Nilai terbesar</td>
                    <td id=max-val>${Math.max(...data)}</td>
                </tr>
                <tr>
                    <td>Range kelas</td>
                    <td id=class-range>${interval}</td>
                </tr>
                <tr>
                    <td>Jumlah kelas</td>
                    <td id=class-total>${number-1}</td>
                </tr>
                <tr>
                    <td>Kelas terkecil</td>
                    <td id=class-min>0</td>
                </tr>
                <tr>
                    <td>Kelas terbesar</td>
                    <td id=class-max>${class_read-1}</td>
                </tr>
            </tbody>`;
        
        const colours = ['#377eb8', '#ff7f00', '#4daf4a','#f781bf', '#a65628', '#984ea3','#999999', '#e41a1c', '#dede00'];
        const svg = document.getElementById('svg-bar');
        let gajelas = "";
        svg.innerHTML = '';
        for (let bars = 1; bars <= class_number; bars++){
            gajelas = 'f' + bars;
            svg.innerHTML += `<rect width="20" height="${parseInt(document.getElementById(gajelas).textContent)*20}" x="${20*(bars-1)}" y="0" style="fill:${colours[bars % colours.length]};" />`;
        }
    });
});