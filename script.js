import { fetchApi } from "./fetch.js";

let temperatures = [];
let stations = [];

const rgbaRedColor = 'rgba(255, 99, 132, 0.2)'
const rgbRedColor = 'rgb(255, 99, 132)'

const rgbaOrangeColor = 'rgba(255, 159, 64, 0.2)'
const rgbOrangeColor = 'rgb(255, 159, 64)'


async function renderData() {
    const weathers = await fetchApi('https://api.gael.cloud/general/public/clima')

    temperatures = weathers.map(weathers => weathers.Temp)
    stations = weathers.map(weathers => weathers.Estacion)
    console.log(temperatures)
    console.log(stations)

    const backgroundColors = temperatures.map(temperatures => temperatures <20 ? rgbaOrangeColor : rgbaRedColor)
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stations,
            datasets: [{
                label: 'City weather',
                data: temperatures,
                borderWidth: 1,
                backgroundColor: backgroundColors
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
