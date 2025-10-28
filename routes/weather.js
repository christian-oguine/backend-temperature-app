const express = require('express');
const router = express.Router();
const openWeatherService = require('../services/openWeatherService');

// Controller to handle GET /weather?city=CityName
router.get('/', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const weatherData = await openWeatherService.fetchWeatherByCity(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
