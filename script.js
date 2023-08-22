import { fetchApi } from "./fetch.js";

let temperatures = [];
let stations = [];

const rgbaRedColor = 'rgba(255, 99, 132, 0.2)'
const rgbRedColor = 'rgb(255, 99, 132)'

const rgbaOrangeColor = 'rgba(255, 159, 64, 0.2)'
const rgbOrangeColor = 'rgb(255, 159, 64)'

const rgbaBlueColor = 'rgba(54, 162, 235, 0.2)'
const rgbBlueColor = 'rgb(54, 162, 235)'

async function renderData() {
    const weathers = await fetchApi('https://api.gael.cloud/general/public/clima')

    temperatures = weathers.map(weathers => weathers.Temp)
    stations = weathers.map(weathers => weathers.Estacion)
    console.log(temperatures)
    console.log(stations)

    const backgroundColors = temperatures.map(temperatures => {
        if (temperatures <= 5) {
          return rgbaBlueColor; // Color azul para temperaturas menores o iguales a 5
        } else if (temperatures <= 19) {
          return rgbaOrangeColor; // Color naranja para temperaturas entre 6 y 19
        } else {
          return rgbaRedColor; // Color rojo para temperaturas iguales o mayores a 20
        }
      });
      
      const borderColors = temperatures.map(temperatures => {
        if (temperatures <= 5) {
          return rgbBlueColor; // Color azul para temperaturas menores o iguales a 5
        } else if (temperatures <= 19) {
          return rgbOrangeColor; // Color naranja para temperaturas entre 6 y 19
        } else {
          return rgbRedColor; // Color rojo para temperaturas iguales o mayores a 20
        }
      });
      

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stations,
            datasets: [{
                label: 'City weather',
                data: temperatures,
                borderWidth: 1,
                backgroundColor: backgroundColors,
                borderColor: borderColors
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
