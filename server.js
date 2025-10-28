require('dotenv').config();
const express = require('express');
const cors = require('cors');          

const app = express();
const port = process.env.PORT; 

app.use(cors());                       
app.use(express.json());

app.get('/', (req, res) => {
//dummy weather endpoint
 res.json(
    {
        city: "Ghent",
        country: "Belgium",
        lat: 51.0543,
        lon: 3.7174,
        temperature: 15,
        description: "Partly cloudy" 
    }
 )
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
