function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#day-and-time");
  let temperature = response.data.temperature.current;
  let city = response.data.city;
  let humidity = response.data.temperature.humidity;
  let description = response.data.condition.description;
  let windSpeed = response.data.wind.speed;
  let timestamp = response.data.time * 1000;
  let date = new Date(timestamp);
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${humidity}%`;
  descriptionElement.innerHTML = description;
  windElement.innerHTML = `${Math.round(windSpeed)} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class = "weather-app-icon"/>`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}, `;
}

function searchCity(city) {
  let apiKey = "4a2o4dfc38a1eb57a0teddf3b6b7f240";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-form");
  if (searchInput.value.trim()) {
    searchCity(searchInput.value);
  } else {
    alert("Please enter a valid city name!");
  }
}

// Attach event listener to form
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Initial call to display weather for "Accra"
searchCity("Accra");
