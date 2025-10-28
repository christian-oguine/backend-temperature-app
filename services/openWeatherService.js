// services/openWeatherService.js
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

  // Return a more complete, structured json object
  return {
    city: data.name,
    country: data.sys.country,
    coordinates: {
      lat: data.coord.lat,
      lon: data.coord.lon,
    },
    temperature: {
      current: data.main.temp,
      feels_like: data.main.feels_like,
      min: data.main.temp_min,
      max: data.main.temp_max,
      unit: unit === 'metric' ? '°C' : '°F',
    },
    weather: {
      main: data.weather?.[0]?.main,
      description: data.weather?.[0]?.description,
      icon: `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`,
    },
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
      gust: data.wind.gust,
    },
    clouds: data.clouds.all,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    visibility: data.visibility,
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    timezone: data.timezone / 3600 + "h",
  };
}

module.exports = { fetchWeatherByCity };
