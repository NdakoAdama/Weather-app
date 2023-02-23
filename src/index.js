function displayDate(currentDate) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let theDay = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[theDay];
  return `${day}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector(`#date`);
let currentTime = new Date();
dateElement.innerHTML = displayDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector(`#city`);
  let searchBar = document.querySelector(`#searchInput`);
  cityElement.innerHTML = searchBar.value;
}

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(`#temperature`);
  temperatureElement.innerHTML = `${temperature}`;
}

function searchCity(city) {
  let apiKey = `806822236a205c516940bf3338b739e0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = `806822236a205c516940bf3338b739e0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(`${apiUrl}`).then(showTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#btn-input");
currentLocationButton.addEventListener("click", showCurrentLocation);

let searchform = document.querySelector(`#formInput`);
searchform.addEventListener("submit", handleSubmit);

searchCity("Minna");
