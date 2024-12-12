import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

// Load environment variables
dotenv.config();

// Setup app
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Get environment variables
const apiKey = process.env.API_KEY;
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const PORT = process.env.PORT || 5000;

// Routes

// Home route
app.get("/", (req, res) => {
  res.send("Server runs at port 5000");
});

// Weather route
app.get("/weather", async (req, res) => {
  const city = req.query.city || "Utrecht"; // Default to "Utrecht" if no city is provided

  try {
    const weatherData = await getWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper functions

// Fetch weather from OpenWeatherMap API
const getWeather = async (city) => {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Return formatted weather data
    return {
      city: data.name,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      wind: data.wind.speed,
      weather: data.weather[0].main,
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
