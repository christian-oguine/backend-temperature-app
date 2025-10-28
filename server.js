require('dotenv').config();
const express = require('express');
const cors = require('cors');          

const app = express();
const port = process.env.PORT; 

app.use(cors());                       
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🌤️ Welcome to the Weather API Server',
    usage: {
      info: 'Use the /api/weather endpoint to get live weather data by city name.',
      example: '/api/weather?city=Ghent',
      note: 'You can change the city parameter to any location you want.',
    },
    author: 'Christian Oguine',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
