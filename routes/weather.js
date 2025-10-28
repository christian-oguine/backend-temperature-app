// routes/weather.js
const express = require('express');
const router = express.Router();
const { fetchWeatherByCity } = require('../services/openWeatherService');

// Controller to handle GET /weather?city=CityName
router.get('/', async (req, res) => {
  const city = req.query.city;
  const unit = req.query.unit || 'metric'; 

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const weatherData = await fetchWeatherByCity(city, unit);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
