let now = new Date();
console.log(now);

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

let date = now.getDate();
let year = now.getFullYear();
let time = now.getTime()
let hour = now.getHours();
let minute = now.getMinutes();

let dateToday = document.querySelector("#dateHere");
if (minute < 10) {
    dateToday.innerHTML = `${days[now.getDay()]} ${date} ${months[now.getMonth()]} ${year}, ${hour}:0${minute}`;
} else {
    dateToday.innerHTML = `${days[now.getDay()]} ${date} ${months[now.getMonth()]} ${year}, ${hour}:${minute}`;
}

function searchCity(city) {
    let apiKey = "0e9c33a5edf6a3e6f1314bec94912851";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(cityTypedTemp);
}

function cityTypedTemp(response) {
    celsuisTemperature = response.data.main.temp;
    let outputTemp = Math.round(response.data.main.temp);
    console.log(outputTemp);
    let grabTemp = document.querySelector("#mainTempText");
    grabTemp.innerHTML = (outputTemp);
}

function searchInput(event) {
    event.preventDefault();
    let cityTyped = document.querySelector("#searchBarInput");
    let mainCity = document.querySelector("#mainCity");
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    mainCity.innerHTML = capitalizeFirstLetter(`${cityTyped.value}`);
    let apiKey = `0e9c33a5edf6a3e6f1314bec94912851`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTyped.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(cityTypedTemp);
}


let currentLocationClick = document.querySelector("#currentLocation");
currentLocationClick.addEventListener("click", retrievePosition);

function retrievePosition(event) {
    navigator.geolocation.getCurrentPosition(getLocation);
    function getLocation(position) {  
        console.log(position);
        let apiKey = `0e9c33a5edf6a3e6f1314bec94912851`;
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        axios.get(url).then(cityTypedTemp);
    } }


function cityTypedTemp(response) {
    celsuisTemperature = response.data.main.temp;
    let outputTemp = Math.round(celsuisTemperature);
    let grabTemp = document.querySelector("#mainTempText");
    grabTemp.innerHTML = (outputTemp);
    let mainCity = document.querySelector("#mainCity");
    mainCity.innerHTML = (`${response.data.name}`);
    let mainHumid = document.querySelector("#todayHumid");
    mainHumid.innerHTML = (`${response.data.main.humidity}%`);
    let mainWind = document.querySelector("#todayWind");
    let mainWindRound = Math.round(response.data.wind.speed);
    mainWind.innerHTML = (`${mainWindRound}mph`);
    let country = document.querySelector("#country");
    country.innerHTML = (`${response.data.sys.country}`);
    let description = document.querySelector("#todayDescription");
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    description.innerHTML = capitalizeFirstLetter(`${response.data.weather[0].description}`);
    let emoji = document.querySelector("#mainEmoji");

    if (response.data.weather[0].description.includes(`cloud`)) {
        emoji.innerHTML = (`☁`);
    } else if (response.data.weather[0].description.includes(`rain`)) {
        emoji.innerHTML = (`🌧`);
    } else {
        emoji.innerHTML = (`☀`);
    }
  forecastAPI(response.data.coord);
}

function forecastAPI(coordinates) {
    console.log(coordinates);
    let apiKey = "0e9c33a5edf6a3e6f1314bec94912851";
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(forecastApiUrl).then(displayForecast);
}


function displayForecast(response) {
console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;

  response.data.daily.forEach(function (forecastDay, index) {
    if (index < 5) 
    forecastHTML =
      forecastHTML 
      +
      `<div class="col">
        <div class="card">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted day" id="dayTwo">${formatDay(forecastDay.dt)}</h6>
                <h5 class="card-title day iconSun" id="dailyEmoji"><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="100" /></h5>
                <p class="card-text">${Math.round(forecastDay.temp.day)}°C</p>
                <p class="card-link rain">🌫️${Math.round(forecastDay.humidity)}%</p>
                <p class="card-link wind">💨${Math.round(forecastDay.wind_speed)}mph</p>
            </div>
        </div>
    </div>`;
    
});

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#mainCity").value;
    searchCity(city);
}

function celciusConversion(event) {
    event.preventDefault();
    let mainTempSelect = document.querySelector("#mainTempText");
    mainTempSelect.innerHTML = Math.round(celsuisTemperature);
}

function fahrenheitConversion(event) {
    event.preventDefault();
    let mainTempSelect = document.querySelector("#mainTempText");
    let fahrenheit = (celsuisTemperature * 9) / 5 + 32;
    mainTempSelect.innerHTML = Math.round(fahrenheit);
}


let celsuisTemperature = null;

let form = document.querySelector("#formInput");
form.addEventListener("submit", searchInput);






searchCity("Milton Keynes");

displayForecast();