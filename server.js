require('dotenv').config();
const express = require('express');
const cors = require('cors');          // ✅ import cors

const app = express();
const port = process.env.PORT || 3001; // ✅ fallback

app.use(cors());                       // ✅ now defined
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
