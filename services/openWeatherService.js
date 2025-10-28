require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function fetchWeatherByCity(city, unit = 'metric') {
  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    city: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    temperature: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    wind_speed: data.wind.speed,
    description: data.weather?.[0]?.description,
    unit: unit === 'metric' ? '°C' : '°F',
  };
}

module.exports = { fetchWeatherByCity };
