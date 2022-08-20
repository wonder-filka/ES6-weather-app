let h1 = document.querySelector(".currentInfo h1");
let timeNow = document.querySelector(".currentInfo h5");
let Temp = document.querySelector("span#temp");
let inputSearch = document.querySelector(".input-group #search");
let inputCurrent = document.querySelector(".input-group #current");
let inputInfo = document.querySelector(".input-group #formControl");
let cuttentIcon = document.querySelector("#icon");
let currentDescription = document.querySelector(".currentInfo h4");
let currentHumidity = document.querySelector("#humidity");
let currentWind = document.querySelector("#wind");
let currentFeelslike = document.querySelector("#feelslike");
let celsTemp = document.querySelector("#cels");
let farTemp = document.querySelector("#far");
let celsiusTemp = null;
let now = new Date();
let apiKey = "ba322d86c6e375290a924f7f5aba942e";
let newApi = "DPDT2QJYWGH8EYB67YK2R8G99";
inputSearch.addEventListener("click", getSearchInfo);
inputCurrent.addEventListener("click", getCurrentInfo);
celsTemp.addEventListener("click", formatToCell);
farTemp.addEventListener("click", formattoFar);

timeNow.innerHTML = dayTime();

function dayTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day} ${hours}:${minutes}`;
}

function getSearchInfo(event) {
  event.preventDefault();
  let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputInfo.value}?iconSet=icons2&unitGroup=metric&key=${newApi}&contentType=json`;
  axios.get(apiUrl).then(ShowTheTemperature);
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputInfo.value}&appid=${apiKeyCity}`;
  axios.get(apiCity).then(getCityName);
}

function ShowTheTemperature(response) {
  let temperature = Math.round(response.data.currentConditions.temp);
  celsiusTemp = temperature;
  let description = response.data.description;
  let humidity = response.data.currentConditions.humidity;
  let wind = response.data.currentConditions.windspeed;
  let feelslike = Math.round(response.data.currentConditions.feelslike);
  Temp.innerHTML = temperature;
  currentDescription.innerHTML = description;
  currentHumidity.innerHTML = humidity;
  currentWind.innerHTML = wind;
  currentFeelslike.innerHTML = feelslike;
  cuttentIcon.setAttribute(
    "src",
    `img/${response.data.currentConditions.icon}.svg`
  );

  displayForecast(response);
}

function getCurrentInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?iconSet=icons2&unitGroup=metric&key=${newApi}`;
  axios.get(apiUrl).then(ShowTheTemperature);
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}5&lon=${longitude}&appid=${apiKeyCity}`;
  axios.get(apiCity).then(getCityName);
}

function formatToCell(event) {
  event.preventDefault();
}

function formattoFar(event) {
  event.preventDefault();
  let fahrenhei = Math.round((celsiusTemp * 9) / 5 + 32);
  Temp.innerHTML = fahrenhei;
}

function formatToCell(event) {
  event.preventDefault();
  Temp.innerHTML = celsiusTemp;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.days;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        ` <div class="col dayForecast">
            <div class="weekDay">${formatDay(forecastDay.datetimeEpoch)}</div>
            <div>
                <img src="img/${forecastDay.icon}.svg" class="dayIcon">
            </div>
            <div class="minMaxTemp">
                <span id="min">${Math.round(
                  forecastDay.tempmin
                )}</span><span>/</span><span id="max">${Math.round(
          forecastDay.tempmax
        )}</span> <span>°</span>
            </div>
       </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function search(city) {
  let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?iconSet=icons2&unitGroup=metric&key=${newApi}&contentType=json`;
  axios.get(apiUrl).then(ShowTheTemperature);
  let apiKeyCity = "ba322d86c6e375290a924f7f5aba942e";
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKeyCity}`;
  axios.get(apiCity).then(getCityName);
}

formatDay();
search("London");

let apiKeyCity = "ba322d86c6e375290a924f7f5aba942e";

function getCityName(response) {
  console.log(response.data);
  h1.innerHTML = `${response.data.name}`;
}
