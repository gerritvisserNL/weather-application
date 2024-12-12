const apiUrl = "http://localhost:5000/weather";

const searchBox = document.querySelector(".input-group input");
const searchBtn = document.querySelector(".input-group button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");

const checkWeather = async (city = "Utrecht") => {
  try {
    const response = await fetch(`${apiUrl}?city=${city}`);

    if (!response.ok) {
      if (response.status === 404) {
        errorDiv.classList.add("visible");
      } else {
        console.error("Something went wrong during API call.");
      }
      return;
    }
    const data = await response.json();

    // Update weather information
    document.querySelector(".city").innerHTML = data.city;
    document.querySelector(".temp").innerHTML = Math.round(data.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind + " km/h";

    // Update icon
    switch (data.weather) {
      case "Clouds":
        weatherIcon.src = "img/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "img/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "img/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "img/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "img/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "img/snow.png";
        break;
      default:
        weatherIcon.src = "img/default.png";
    }
  } catch (error) {
    console.error("An error occurred during fetching weather data", error);
  }
};

// Add Evenlistener to input field
searchBox.addEventListener("input", () => {
  errorDiv.classList.remove("visible");
});

// Add Eventlistener to search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
    searchBox.value = "";
  }
});

// Add Eventlistener to input field for Enter key
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) {
      checkWeather(city);
      searchBox.value = "";
    }
  }
});

checkWeather();
