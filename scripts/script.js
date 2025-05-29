var cityInput = document.getElementById("searchCity");

var backgroundsList = [
  "day1.jpg",
  "day2.jpg",
  "day3.jpg",
  "day4.jpg",
  "day5.jpg",
  // "night1.jpg",
  // "night2.jpg",
  // "night3.jpg",
  // "night4.jpg",
  // "night5.jpg",
  "cloudy1.jpg",
  "cloudy2.jpg",
  "cloudy3.jpg",
  "cloudy4.jpg",
  "cloudy5.jpg",
  // "rainy1.jpg",
  // "rainy2.jpg",
  // "rainy3.jpg",
  // "rainy4.jpg",
  // "rainy5.jpg",
];

var randomBackground = backgroundsList[Math.floor(Math.random() * backgroundsList.length)];

document.body.style.background = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) , url('media/" + randomBackground + "')";

cityInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    loader();
    function loader() {

      document.getElementById("locationName").innerHTML = "";
      document.getElementById("temperatureValue").innerHTML = "";
      document.getElementById("weatherType").innerHTML = "";

      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      const img3 = document.createElement("img");

      img1.id = "loader1";
      img2.id = "loader2";
      img3.id = "loader3";

      img1.src = "icons/loader.gif";
      img2.src = "icons/loader.gif";
      img3.src = "icons/loader.gif";

      const parentElement1 = document.getElementById("locationName");
      const parentElement2 = document.getElementById("temperatureValue");
      const parentElement3 = document.getElementById("weatherType");

      parentElement1.appendChild(img1);
      parentElement2.appendChild(img2);
      parentElement3.appendChild(img3);

      // document.getElementById("loader1").src = "icons/loader.gif";
      // document.getElementById("loader2").src = "icons/loader.gif";
      // document.getElementById("loader3").src = "icons/loader.gif";
    }

    var cityInputValue = cityInput.value;

    var apiKey = "3354f68d0f0dda602b17f028869260a5"; // Default
    var unit = "metric";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;

    if (cityInputValue != "") {
      async function getWeather() {
        var response = await fetch(apiUrl);
        var data = await response.json();

        if (data.message != "city not found" && data.cod != "404") {
          var location = data.name;
          var temperature = data.main.temp;
          var weatherType = data.weather[0].description;
          var realFeel = data.main.feels_like;
          var windSpeed = data.wind.speed;
          var windDirection = data.wind.deg;
          var visibility = data.visibility / 1000;
          var pressure = data.main.pressure;
          var maxTemperature = data.main.temp_max;
          var minTemperature = data.main.temp_min;
          var humidity = data.main.humidity;
          var sunrise = data.sys.sunrise;
          var sunset = data.sys.sunset;

          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInputValue}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
              const forecastContainer = document.getElementById('forecast-container');

              forecastContainer.innerHTML = '';

              const dailyForecasts = {};
              data.list.forEach(entry => {
                const dateTime = new Date(entry.dt * 1000);
                const date = dateTime.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
                if (!dailyForecasts[date]) {
                  dailyForecasts[date] = {
                    date: date,
                    icon: `https://openweathermap.org/img/w/${entry.weather[0].icon}.png`,
                    maxTemp: -Infinity,
                    minTemp: Infinity,
                    weatherType: entry.weather[0].main
                  };
                }

                if (entry.main.temp_max > dailyForecasts[date].maxTemp) {
                  dailyForecasts[date].maxTemp = entry.main.temp_max;
                }
                if (entry.main.temp_min < dailyForecasts[date].minTemp) {
                  dailyForecasts[date].minTemp = entry.main.temp_min;
                }
              });

              Object.values(dailyForecasts).forEach(day => {
                const forecastCard = document.createElement('div');
                forecastCard.classList.add('daily-forecast-card');

                forecastCard.innerHTML = `
        <p class="daily-forecast-date">${day.date}</p>
        <div class="daily-forecast-logo"><img class="imgs-as-icons" src="${day.icon}"></div>
        <div class="max-min-temperature-daily-forecast">
          <span class="max-daily-forecast">${Math.round(day.maxTemp - 273.15)}<sup>o</sup>C</span>
          <span class="min-daily-forecast">${Math.round(day.minTemp - 273.15)}<sup>o</sup>C</span>
        </div>
        <p class="weather-type-daily-forecast">${day.weatherType}</p>
      `;

                forecastContainer.appendChild(forecastCard);
              });
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });



          document.getElementById("locationName").innerHTML = location;
          document.getElementById("temperatureValue").innerHTML = temperature + "<sup>o</sup>C";
          document.getElementById("weatherType").innerHTML = weatherType;
          document.getElementById("realFeelAdditionalValue").innerHTML = realFeel + "<sup>o</sup>C";
          document.getElementById("windSpeedAdditionalValue").innerHTML = windSpeed + " km/h";
          document.getElementById("windDirectionAdditionalValue").innerHTML = windDirection;
          document.getElementById("visibilityAdditionalValue").innerHTML = visibility + " km";
          document.getElementById("pressureAdditionalValue").innerHTML = pressure;
          document.getElementById("maxTemperatureAdditionalValue").innerHTML = maxTemperature + "<sup>o</sup>C";
          document.getElementById("minTemperatureAdditionalValue").innerHTML = minTemperature + "<sup>o</sup>C";
          document.getElementById("humidityAdditionalValue").innerHTML = humidity;
          document.getElementById("sunriseAdditionalValue").innerHTML = sunrise;
          document.getElementById("sunsetAdditionalValue").innerHTML = sunset;
        }
        else {
          document.getElementById("locationName").innerHTML = "City Not Found";
          document.getElementById("temperatureValue").innerHTML = "";
          document.getElementById("weatherType").innerHTML = "";
        }
      }

      getWeather();
    }
    else document.getElementById("locationName").innerHTML = "Enter a city name...";
  }
});

// DOM Elements
const searchInput = document.getElementById('searchCity');
const locationName = document.getElementById('locationName');
const temperatureValue = document.getElementById('temperatureValue');
const weatherType = document.getElementById('weatherType');
const forecastContainer = document.getElementById('forecast-container');

// Weather details elements
const realFeelValue = document.getElementById('realFeelAdditionalValue');
const humidityValue = document.getElementById('humidityAdditionalValue');
const maxTempValue = document.getElementById('maxTemperatureAdditionalValue');
const minTempValue = document.getElementById('minTemperatureAdditionalValue');
const windSpeedValue = document.getElementById('windSpeedAdditionalValue');
const windDirectionValue = document.getElementById('windDirectionAdditionalValue');
const visibilityValue = document.getElementById('visibilityAdditionalValue');
const pressureValue = document.getElementById('pressureAdditionalValue');
const sunriseValue = document.getElementById('sunriseAdditionalValue');
const sunsetValue = document.getElementById('sunsetAdditionalValue');

// Animation helper
const animateElement = (element, animation) => {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = animation;
};

// Update UI with weather data
const updateUI = (data) => {
    // Animate main weather info
    animateElement(locationName, 'fadeIn 0.5s ease-out');
    animateElement(temperatureValue, 'fadeIn 0.5s ease-out');
    animateElement(weatherType, 'fadeIn 0.5s ease-out');

    // Update main weather info
    locationName.textContent = data.name;
    temperatureValue.textContent = `${Math.round(data.main.temp)}°C`;
    weatherType.textContent = data.weather[0].description;

    // Update weather details with staggered animation
    const details = [
        { element: realFeelValue, value: `${Math.round(data.main.feels_like)}°C` },
        { element: humidityValue, value: `${data.main.humidity}%` },
        { element: maxTempValue, value: `${Math.round(data.main.temp_max)}°C` },
        { element: minTempValue, value: `${Math.round(data.main.temp_min)}°C` },
        { element: windSpeedValue, value: `${data.wind.speed} m/s` },
        { element: windDirectionValue, value: `${data.wind.deg}°` },
        { element: visibilityValue, value: `${(data.visibility / 1000).toFixed(1)} km` },
        { element: pressureValue, value: `${data.main.pressure} hPa` },
        { element: sunriseValue, value: new Date(data.sys.sunrise * 1000).toLocaleTimeString() },
        { element: sunsetValue, value: new Date(data.sys.sunset * 1000).toLocaleTimeString() }
    ];

    details.forEach((detail, index) => {
        setTimeout(() => {
            detail.element.textContent = detail.value;
            animateElement(detail.element, 'fadeIn 0.3s ease-out');
        }, index * 100);
    });

    // Update background based on weather and time
    updateBackground(data.weather[0].main, data.sys.sunrise, data.sys.sunset);
};

// Update background based on weather condition and time
const updateBackground = (weatherCondition, sunrise, sunset) => {
    const body = document.body;
    const currentTime = new Date().getTime() / 1000; // Current time in seconds
    const isDaytime = currentTime > sunrise && currentTime < sunset;
    
    // Base conditions for different weather types
    const conditions = {
        'Clear': isDaytime ? 'day' : 'night',
        'Clouds': 'cloudy',
        'Rain': 'rainy',
        'Snow': 'snowy',
        'Thunderstorm': 'thunder',
        'Drizzle': 'rainy',
        'Mist': 'foggy'
    };

    // Get the base condition
    const baseCondition = conditions[weatherCondition] || 'day';
    
    // Add a random number (1-5) to get variety in backgrounds
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    const image = `${baseCondition}${randomNumber}.jpg`;
    
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('media/${image}')`;
};

// Create forecast card
const createForecastCard = (forecast) => {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayDate = date.getDate();

    card.innerHTML = `
        <div class="forecast-date">${dayName} ${dayDate}</div>
        <img class="forecast-icon" src="icons/${forecast.weather[0].main.toLowerCase()}.png" alt="${forecast.weather[0].description}">
        <div class="forecast-temp">
            <span class="max-temp">${Math.round(forecast.temp.max)}°</span>
            <span class="min-temp">${Math.round(forecast.temp.min)}°</span>
        </div>
        <div class="forecast-type">${forecast.weather[0].description}</div>
    `;

    return card;
};

// Update forecast
const updateForecast = (forecastData) => {
    forecastContainer.innerHTML = '';
    
    forecastData.daily.slice(1, 7).forEach((forecast, index) => {
        const card = createForecastCard(forecast);
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeIn 0.5s ease-out forwards';
        card.style.opacity = '0';
        forecastContainer.appendChild(card);
    });
};

// Handle search
const handleSearch = async (city) => {
    try {
        // Show loading state
        locationName.textContent = 'Loading...';
        temperatureValue.textContent = '';
        weatherType.textContent = '';

        const apiKey = "b1fd6e14799699504191b6bdbcadfc35"; // Using existing API key

        // Fetch current weather
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === '404') {
            throw new Error('City not found');
        }

        // Fetch forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();

        // Update UI
        updateUI(weatherData);
        updateForecast(forecastData);

    } catch (error) {
        locationName.textContent = 'City not found';
        temperatureValue.textContent = '';
        weatherType.textContent = '';
        console.error('Error:', error);
    }
};

// Event listeners
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            handleSearch(city);
        }
    }
});

// Initialize with default city
handleSearch('London');