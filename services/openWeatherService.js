require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';


async function fetchWeatherByCity(city) {
  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

//Fetch weather data from OpenWeather API
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }
  return response.json();
}

module.exports = {
  fetchWeatherByCity
};
