const apiKey = "cf2c85fbc01cf37e2b97a0bd7fc1666c"; // Your OpenWeatherMap API key

// Mapping weather conditions to background colors and icons
const weatherBackgrounds = {
  Clear: "#87CEEB",
  Clouds: "#B0C4DE",
  Rain: "#4682B4",
  Snow: "#FFFFFF",
  Thunderstorm: "#2F4F4F",
  Default: "#f7f9fc"
};

const weatherIcons = {
  Clear: "images/clear.gif", // Replace with actual image paths
  Clouds: "images/clouds.gif",
  Rain: "images/rain.gif",
  Snow: "images/snow.gif",
  Thunderstorm: "images/thunderstorm.gif",
  Default: "images/default.gif"
};

async function fetchWeather(city) {
  const weatherContainer = document.getElementById("weather-container");
  weatherContainer.innerHTML = `<p>Loading weather data for ${city}...</p>`;
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    displayWeather(data, city);
  } catch (error) {
    weatherContainer.innerHTML = `<p>Error: Unable to fetch data (${error.message})</p>`;
  }
}

function displayWeather(data, city) {
  const condition = data.weather[0].main;
  const bgColor = weatherBackgrounds[condition] || weatherBackgrounds.Default;
  const icon = weatherIcons[condition] || weatherIcons.Default;

  // Update page background color
  document.body.style.backgroundColor = bgColor;

  const weatherInfo = `
    <div class="weather-info">
      <h3>${city} Weather</h3>
      <img class="weather-image" src="${icon}" alt="${condition}">
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    </div>
  `;

  document.getElementById("weather-container").innerHTML = weatherInfo;
}
