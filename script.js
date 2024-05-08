// Validasi
function validation(elem) {
    const value = elem.value;
    const numVal = value.replace(/[^\d\n]+/g, " ");
    elem.value = numVal;
}

document.addEventListener('DOMContentLoaded', function () {
    const raw_strings = document.getElementById('data_raw');
    const button = document.getElementById('btn');
    const tableBody = document.getElementById('tableBody');

    button.addEventListener('click', function () {
        tableBody.innerHTML = ''; // Clear previous data
        const data = raw_strings.value.split(" ").map(Number).sort((a, b) => a - b); // Convert to numbers and sort
        const class_number = Math.round(Math.sqrt(data.length));
        const interval = data.length === 1 || data[data.length - 1] === data[0] ? data[0] : Math.round((data[data.length - 1] - data[0]) / class_number);

        let class_read = 0;
        let number = 1;

        for (let show_all = 0; show_all < class_number; show_all++) {
            let frequency = 0;

            for (let j = class_read; j < class_read + interval; j++) {
                if (data.includes(j)) {
                    frequency++;
                }
            }

            class_read += interval;

            const template = `
                <tr>
                    <td scope="row">${number}</td>
                    <td>${class_read}</td>
                    <td>${frequency}</td>
                </tr>`;
            tableBody.innerHTML += template;
            number++;
        }
    });
});