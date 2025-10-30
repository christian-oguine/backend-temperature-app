// routes/weather.js
const express = require('express');
const router = express.Router();
const { fetchWeatherByCity } = require('../services/openWeatherService');

// GET /api/weather?city=Ghent&units=imperial
router.get('/', async (req, res) => {
  const city = req.query.city;
  const units = req.query.units || 'metric'; 

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // pass units through
    const weatherData = await fetchWeatherByCity(city, units);
    res.json(weatherData);
  } catch (error) {
    console.error('Weather route error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch weather' });
  }
});

module.exports = router;
