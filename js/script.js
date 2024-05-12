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
        for (let show_all = 0; show_all < class_number; show_all++) {
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
                    <td scope="row">${number}</td>
                    <td>${class_read_bottom}-${class_read - 1}</td>
                    <td>${frequency}</td>
                </tr>`;

            frequencyBody.innerHTML += template;
            number++; // number will be +1 at the end... be cautious!
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
                    <td>${Math.min(...data)}</td>
                </tr>
                <tr>
                    <td>Nilai terbesar</td>
                    <td>${Math.max(...data)}</td>
                </tr>
                <tr>
                    <td>Range kelas</td>
                    <td>${interval}</td>
                </tr>
                <tr>
                    <td>Jumlah kelas</td>
                    <td>${number-1}</td>
                </tr>
                <tr>
                    <td>Kelas terkecil</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>Kelas terbesar</td>
                    <td>${class_read-1}</td>
                </tr>
            </tbody>
        `
    });
});