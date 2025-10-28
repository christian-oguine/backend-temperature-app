# Backend Temperature App

Simple Express backend for a weather UI. Currently exposes a basic endpoint that returns sample weather data by city.

## Requirements
- Node.js (v16+)
- npm

## Install
```bash
npm install
```

## Environment
Create a `.env` file at the project root:
```
PORT=5000
OPENWEATHER_API_KEY=openweather_api_key_here
NODE_ENV=development
```

## Start Server

CMD:
```cmd
    nodemon
```

## API
GET /
- Returns JSON with sample weather data.

Example response:
```json
{
  "city": "Ghent",
  "country": "Belgium",
  "lat": 51.0543,
  "lon": 3.7174,
  "temperature": 15,
  "description": "Partly cloudy"
}
```
