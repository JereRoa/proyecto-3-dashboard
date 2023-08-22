import { fetchApi } from "./fetch.js";

let temperatures = [];
let stations = [];
async function renderData() {
    const weathers = await fetchApi('https://api.gael.cloud/general/public/clima')

    temperatures = weathers.map(weathers => weathers.Temp)
    stations = weathers.map(weathers => weathers.Estacion)
    console.log(temperatures)
    console.log(stations)

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stations,
            datasets: [{
                label: 'City weather',
                data: temperatures,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
renderData()
