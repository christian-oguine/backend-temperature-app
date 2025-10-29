# 🌤️ Weather API Server (Node.js + Express)

A minimal REST API that fetches current weather data from **OpenWeather** and returns a clean, normalized JSON payload for frontend apps.

- **Stack:** Node.js, Express, CORS, dotenv
- **Endpoints:** `GET /` (health), `GET /api/weather?city=...&unit=metric|imperial`
- **Output:** City, country, coordinates, temperature (current/min/max/feels_like), weather description + icon, wind, clouds, pressure, humidity, visibility, sunrise/sunset, timezone

---

## Features

- Simple REST endpoint: `GET /api/weather`
- **Units**: metric (°C) or imperial (°F)
- Normalized response shape (ready for UI)
- CORS enabled for cross-origin frontends
- Environment-based configuration

---

## Requirements

- **Node.js 18+** (uses the built-in global `fetch`)
- An **OpenWeather API key** (free tier): https://openweathermap.org/

---

## Project Structure

```
backend-temperature-app/
├─ routes/
│  └─ weather.js                  # /api/weather controller (reads ?city & ?unit)
├─ services/
│  └─ openWeatherService.js       # calls OpenWeather & normalizes response
├─ .env                           # environment variables (not committed)
├─ server.js                      # Express app, health route, middleware, boot
├─ package.json
└─ README.md
```

---

## Environment Variables

Create a `.env` file at the project root:

```bash
# .env
PORT=5000
OPENWEATHER_API_KEY=openweather_api_key_here
```

> On cloud hosts (Render, Vercel, etc.) **we do not** commit `.env`. these keys are set in the platform’s dashboard.  
> Render will inject `PORT` automatically — the server already uses `process.env.PORT` and binds to `0.0.0.0`.

---

## Local Development

Install dependencies and run the server:

```bash
# install
npm install

# start (production-style)
npm start

# OR if you have a dev script with nodemon:
npm run dev
```

The server will start at: `http://localhost:5000` (or whatever `PORT` you set).

---

## API Endpoints

### Health
```
GET /
```
Returns a simple JSON with status, usage, and timestamp.

### Weather by City
```
GET /api/weather?city={CityName}&unit={metric|imperial}
```
- **city** *(required)*: e.g., `Ghent`, `Brussels`, `Lagos`
- **unit** *(optional)*: `metric` (default) or `imperial`

#### Example
```
GET /api/weather?city=Ghent&unit=metric
```

#### Example `curl`
```bash
curl "http://localhost:5000/api/weather?city=Ghent&unit=metric"
```

#### Example Response
```json
{
  "city": "Ghent",
  "country": "BE",
  "coordinates": { "lat": 51.05, "lon": 3.7167 },
  "temperature": {
    "current": 13.6,
    "feels_like": 12.9,
    "min": 11.0,
    "max": 16.3,
    "unit": "°C"
  },
  "weather": {
    "main": "Clouds",
    "description": "overcast clouds",
    "icon": "https://openweathermap.org/img/wn/04d@2x.png"
  },
  "wind": { "speed": 5.74, "deg": 198, "gust": 9.22 },
  "clouds": 100,
  "pressure": 1003,
  "humidity": 85,
  "visibility": 10000,
  "sunrise": "07:32:12",
  "sunset": "17:25:17",
  "timezone": "1h"
}
```

#### Error Responses
- `400 { "error": "City name is required" }` (missing `city`)
- `500 { "error": "Error fetching weather data: <message>" }`

---

## CORS

CORS is enabled globally:
```js
app.use(cors())
```
For production, you can restrict it to your frontend domains:
```js
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  methods: ['GET']
}))
```

---

## Deploying to Render 

1. **Push** this backend to GitHub.
2. On **Render Dashboard** → **New** → **Web Service** → pick your repo.
3. Settings:
   - **Environment:** Node
   - **Build Command:** *(empty or)* `npm install`
   - **Start Command:** `npm start`
   - **Instance Type/Plan:** Free
4. Add **Environment Variables** in Render → *Settings → Environment*:
   - `OPENWEATHER_API_KEY=your_key`
   - *(Optional)* `PORT=5000` (Render will set it anyway)
5. Deploy and copy the **public URL**, e.g.:
   `https://weather-backend.onrender.com`
6. Test:
   - `https://weather-backend.onrender.com/`
   - `https://weather-backend.onrender.com/api/weather?city=Ghent&unit=metric`

**Hook it up in your Nuxt frontend** by setting:
```
NUXT_PUBLIC_API_BASE=https://weather-backend.onrender.com/api
```

---

## Notes

- Requires Node 18+ because the service relies on the global `fetch`.  
  If you’re on an older Node, install `node-fetch` and import it in `openWeatherService.js`.
- The API returns **normalized** data so your frontend doesn’t need to know OpenWeather’s raw shape.
---

## Author

**Christian Oguine**  
GitHub: https://github.com/christian-oguine
