let h1 = document.querySelector(".currentInfo h1");
let h6 = document.querySelector(".currentInfo h6");
let h2Temp = document.querySelector(".currentInfo h2 #temp");
let inputSearch = document.querySelector(".input-group #search");
let inputCurrent = document.querySelector(".input-group #current");
let inputInfo = document.querySelector(".input-group #formControl");
let now = new Date();
let apiKey = "ba322d86c6e375290a924f7f5aba942e";
inputSearch.addEventListener("click", getSearchInfo);
inputCurrent.addEventListener("click", getCurrentInfo);

h6.innerHTML = dayTime();

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputInfo.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(ShowTheTemperature);
}

function ShowTheTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  h2Temp.innerHTML = temperature;
  h1.innerHTML = `${response.data.name}`;
}

function getCurrentInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(ShowTheTemperature);
}
