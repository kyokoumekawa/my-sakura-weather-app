function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function displayForecast() {
  let forcastElement = document.querySelector("#forecast");

  let forcastHTML = `<div class="row">`;
  let days = ["Wednesday", "Thursday", "Friday", "Saturday"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
              <div class="col-2">
                <div class="weather-forcast-date">
                 ${day}
                  <br />
                  <i class="fa fa-regular fa-sun fa-2x"></i>
                  <br />
                  <div class="weather-forcast-temperatures">
                    <span class="weather-forecast-temperature-max">18° </span>
                    <span class="weather-forecast-temperature-min">12° </span>
                  </div>
                </div>
            </div>
  `;
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "4f9d9019043feea9282c5c56f740cfa9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "4f9d9019043feea9282c5c56f740cfa9";
  let apiUrl = `https://api.openweather.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longtitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElemet = document.querySelector("#temperature");
  temperatureElemet.innerHTML = Math.round(celsiusTemperature);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElemet = document.querySelector("#temperature");
  temperatureElemet.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElemet = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElemet.innerHTML = Math.round(fahrenheitTemperature);
}

displayForecast();
