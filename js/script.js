// Validasi
function validation(elem) {
    const value = elem.value;
    const numVal = value.replace(/[^\d\n]+/g, " ");
    elem.value = numVal;
}

document.addEventListener('DOMContentLoaded', function () {
    // Load All
    const raw_strings = document.getElementById('inputArea');
    const button = document.getElementById('btn');
    const frequencyTable = document.getElementById('frequencyTable');
    const svg = document.getElementById('svg-bar');

    button.addEventListener('click', function () {
        // Clear previous data
        frequencyTable.innerHTML = '';
        moreinfoTable.innerHTML = '';
        svg.innerHTML = '';

        // get user data from inputArea
        const data = raw_strings.value.split(" ").map(Number).sort((a, b) => a - b); // Convert to numbers and sort
        var class_number = data.length;
        // get class number and it's interval
        if(data[0] == ""){
            class_number = 0;
        }else{
            class_number = Math.ceil(Math.sqrt(data.length));
        }
        const interval = data.length === 1 || data[data.length - 1] === data[0] ? data[0] : Math.ceil((data[data.length - 1]) / class_number);

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

        //stylying
        frequencyTable.style.border = "0.5px solid white";
        moreinfoTable.style.border = "0.5px solid white";

        // for loop prep
        let class_read = 1;
        let number = 1;
        let class_read_bottom = 0;
        let max_freq = 0;

        // get class frequency
        for (let show_all = 0; show_all < class_number; show_all++) {
            let frequency = 0;
            for (let j = class_read; j < class_read + interval; j++) {
                if (data.includes(j)) {
                    frequency++;
                }
            }
            if (frequency > max_freq){max_freq=frequency;}
            class_read += interval;
            const template = `
                <tr>
                    <td id=n${number}> ${number} </td>
                    <td id=r${number}> ${class_read_bottom}-${class_read} </td>
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
                    <td>${mean.toFixed(3)}</td>
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
                    <td>Jumlah data</td>
                    <td id=class-total>${data.reduce((a, b) => a + b, 0)}</td>
                </tr>
                <tr>
                    <td>Jumlah kelas</td>
                    <td id=class-total>${class_number}</td>
                </tr>
                <tr>
                    <td>Batas kelas terkecil</td>
                    <td id=class-min>0</td>
                </tr>
                <tr>
                    <td>Batas kelas terbesar</td>
                    <td id=class-max>${class_read -1}</td>
                </tr>
            </tbody>`;
        
        
        // Colorful
        const colours = ['#FBA834', '#333A73', '#387ADF','#50C4ED','#FC4100','#FFC55A','#00215E','#2C4E80'];
        // X-Axis
        svg.innerHTML += `<line x1="40" y1="460px" x2="800px" y2="460px" style="stroke:white;stroke-width:1px" />`;
        // Y-Axis
        svg.innerHTML += `<line x1="40" y1="0" x2="40" y2="460px" style="stroke:white;stroke-width:1px" />`;

        // Draw bars
        let frequency_reader;
        let y_offset;
        let bar_height = 0;
        for (let bars = 0; bars < class_number; bars++){
            frequency_reader = 'f' + (bars +1);
            frequency_reader = parseInt(document.getElementById(frequency_reader).textContent);
            if (frequency_reader === max_freq){
                y_offset = 457-460;
                svg.innerHTML += `<rect width="40px" height="460px" x="${(41+40*(bars))}px" y="${y_offset+2.5}px" style="fill:${colours[bars % colours.length]};" />`;    
            }else{
                frequency_reader = frequency_reader / max_freq;
                bar_height = Math.round(457 * frequency_reader);
                y_offset = 457 - bar_height;
                svg.innerHTML += `<rect width="40px" height="${bar_height}px" x="${(41+40*(bars))}px" y="${y_offset + 2}px" style="fill:${colours[bars % colours.length]};" />`;
            }
        }

        // Draw label
        let class_reader;
        let label_x = [];

        // X AXIS Label
        svg.innerHTML += `<text y="490px" text-anchor="middle" font-size="15" x="35px" fill="white">0</text>`;
        for (let text = 1; text <= class_number; text++){
            class_reader = 'r' + (text);
            label_x = (document.getElementById(class_reader).textContent).split("-").map(Number);
            svg.innerHTML += `<text y="490px" text-anchor="middle" font-size="15" x="${41*(text)+35}px" fill="white">${label_x[1]}</text>`;
        }
        // Y AXIS Label
        svg.innerHTML += `<text y="19px" text-anchor="middle" font-size="15" x="20px" fill="white">${max_freq}</text>`;
        svg.innerHTML += `<text y="114px" text-anchor="middle" font-size="15" x="20px" fill="white">${(max_freq * 0.75).toFixed(1)}</text>`;
        svg.innerHTML += `<text y="224px" text-anchor="middle" font-size="15" x="20px" fill="white">${max_freq * 0.5}</text>`;
        svg.innerHTML += `<text y="334px" text-anchor="middle" font-size="15" x="20px" fill="white">${(max_freq*0.25).toFixed(1)}</text>`;
        svg.innerHTML += `<text y="460px" text-anchor="middle" font-size="15" x="20px" fill="white">0</text>`;
    });
});