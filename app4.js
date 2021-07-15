let now = new Date();
console.log(now);

let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
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
dateToday.innerHTML = `${days[now.getDay()]} ${date} ${months[now.getMonth()]} ${year}, ${hour}:${minute}`;

let dayTwo = document.querySelector("#dayTwo");
dayTwo.innerHTML = `${days[now.getDay() +1]}`;

let dayThree = document.querySelector("#dayThree");
dayThree.innerHTML = `${days[now.getDay() +2]}`;

let dayFour = document.querySelector("#dayFour");
dayFour.innerHTML = `${days[now.getDay() +3]}`;

let dayFive = document.querySelector("#dayFive");
dayFive.innerHTML = `${days[now.getDay() + 4]}`;

let daySix = document.querySelector("#daySix");
daySix.innerHTML = `${days[now.getDay() + 5]}`;


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
    let apiKey = `0e9c33a5edf6a3e6f1314bec94912851`;
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(cityTypedTemp);
    }    
}

function cityTypedTemp(response) {
        celsuisTemperature = response.data.main.temp;
        let outputTemp = Math.round(celsuisTemperature);
        console.log(outputTemp);
        let grabTemp = document.querySelector("#mainTempText");
        grabTemp.innerHTML = (outputTemp);
        let mainCity = document.querySelector("#mainCity");
        mainCity.innerHTML = (`${response.data.name}`); 
        let mainHumid = document.querySelector("#todayHumid");
        mainHumid.innerHTML = (`${response.data.main.humidity}%`);
        let mainWind = document.querySelector("#todayWind");
        let mainWindRound = Math.round(response.data.wind.speed);
        mainWind.innerHTML = (`${mainWindRound}mph`);
    }    

function searchCity(city) {
  let apiKey = "0e9c33a5edf6a3e6f1314bec94912851";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTypedTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#mainCity").value;
  searchCity(city);
}

function celciusConversion(event) {
    event.preventDefault();
    let mainTempSelect= document.querySelector("#mainTempText");
    mainTempSelect.innerHTML = Math.round(celsuisTemperature);
}

 function fahrenheitConversion(event) {
    event.preventDefault();
    let mainTempSelect= document.querySelector("#mainTempText");
    let fahrenheit = (celsuisTemperature * 9) / 5 + 32;
    mainTempSelect.innerHTML = Math.round(fahrenheit);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitConversion);

let celsuisTemperature = null;

let form = document.querySelector("#formInput");
form.addEventListener("submit", searchInput);


let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celciusConversion)


searchCity("Milton Keynes");
