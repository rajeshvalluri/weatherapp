var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');

const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');


const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
dateElement.textContent = new Date().getDate() + ', ' + monthNames[new Date().getMonth()].substring(0,3) + '\n' + new Date().toLocaleTimeString();



weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    locationElement.textContent = "loading....";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value; 
    fetch(locationApi).then(response => {
       response.json().then(data => {
           if (data.error) {
            locationElement.textContent = data.error;
            tempElement.textContent = "";
            weatherCondition.textContent = ""; 
           } else {
               console.log(data.description)
                if(data.description.includes("rain") || data.description.includes("clouds") || data.description.includes("fog") || data.description.includes("haze")  ) {
                    weatherIcon.className = "wi wi-day-cloudy" ;// + data.description
                } else {
                    weatherIcon.className = "wi wi-day-sunny" ;
                }
            locationElement.textContent = data.city;
            tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) +'C';
            weatherCondition.textContent = data.description.toUpperCase();   
           }
       }) 
    })
})
