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


  celsiusTemperature = response.data.main.temp;
  console.log(celsiusTemperature);
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector(`#temperature`);
  temperatureElement.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector(`#description`);
  descriptionElement.innerHTML = (response.data.weather[0].description);
  let humidityElement = document.querySelector(`#humidity`);
  humidityElement.innerHTML =(response.data.main.humidity);
  let windElement = document.querySelector(`#wind`);
  windElement.innerHTML = Math.round(response.data.wind.speed);


  let iconElement = document.querySelector(`#icon`);
  iconElement.setAttribute(
    "src",  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

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


function displayFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}


function displayCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;


let currentLocationButton = document.querySelector("#btn-input");
currentLocationButton.addEventListener("click", showCurrentLocation);

let searchform = document.querySelector(`#formInput`);
searchform.addEventListener("submit", handleSubmit);


searchCity("Minna");

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFarenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);