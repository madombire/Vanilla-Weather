function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind-speed");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity} %,`;
  descriptionElement.innerHTML = `${response.data.condition.description}`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  console.log(response.data);
}
function searchCity(city) {
  let apiKey = "4a2o4dfc38a1eb57a0teddf3b6b7f240";
  let apiUrl = `
  https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric
`;
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-form");
  console.log(searchInput.value);
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Accra");
