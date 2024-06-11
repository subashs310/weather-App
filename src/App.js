
import React, { useState, useEffect } from 'react';
import WeatherInput from './component/WeatherInput';
import CurrentWeather from './component/currentweather';
import WeatherCard from './component/weathercard';
import Icon from './images/icon.1.png'
import './App.css'

const API_KEY = "bef823d8b25a23e5171b766b892cad8f"; // API key for OpenWeatherMap API
console.log("apiley",API_KEY)
const App = () => {
  const [city, setCity] = useState('London'); // Default city set to London
  const [weather, setWeather] = useState({
    city: 'London',
    date: '',
    temp: 0,
    wind: 0,
    humidity: 0,
    icon: '',
    description: '',
  });
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getCityCoordinates('London'); // Fetch weather for London when the app loads
  }, []);

  const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(WEATHER_API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Forecast data:', data); // Log the full forecast data
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
          }
        });

        const updatedWeather = {
          city: cityName,
          date: fiveDaysForecast[0].dt_txt.split(" ")[0],
          temp: (fiveDaysForecast[0].main.temp - 273.15).toFixed(2),
          wind: fiveDaysForecast[0].wind.speed,
          humidity: fiveDaysForecast[0].main.humidity,
          icon: `https://openweathermap.org/img/wn/${fiveDaysForecast[0].weather[0].icon}@4x.png`,
          description: fiveDaysForecast[0].weather[0].description,
        };
        setWeather(updatedWeather);
        console.log('Current weather:', updatedWeather); // Log the current weather data

        const updatedForecast = fiveDaysForecast.slice(1).map(day => ({
          date: day.dt_txt.split(" ")[0],
          temp: (day.main.temp - 273.15).toFixed(2),
          wind: day.wind.speed,
          humidity: day.main.humidity,
          icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`,
        }));
        setForecast(updatedForecast);
        console.log('5-Day forecast:', updatedForecast); // Log the 5-day forecast data
      })
      .catch(() => {
        alert("An error occurred while fetching the weather forecast!");
      });
  };

  const getCityCoordinates = (cityName = city) => {
    const cityNameTrimmed = cityName.trim();
    if (cityNameTrimmed === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityNameTrimmed}&limit=1&appid=${API_KEY}`;
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityNameTrimmed}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
        console.log('City coordinates:', { lat, lon, name }); // Log the city coordinates
      })
      .catch(() => {
        alert("An error occurred while fetching the coordinates!");
      });
  };

  const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
        fetch(API_URL)
          .then(response => response.json())
          .then(data => {
            const { name } = data[0];
            getWeatherDetails(name, latitude, longitude);
            console.log('User coordinates:', { latitude, longitude, name }); // Log the user's coordinates
          })
          .catch(() => {
            alert("An error occurred while fetching the city name!");
          });
      },
      error => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Geolocation request denied. Please reset location permission to grant access again.");
        } else {
          alert("Geolocation request error. Please reset location permission.");
        }
      }
    );
  };

  return (
    <div className="App">
      <div className='header'>
      <img className=" weather_icon" src={Icon}></img>
      <h1>Weather Dashboard</h1>
      <img className=" weather_icon2" src={Icon}></img>
      
      </div>
      <div className="container">
        <WeatherInput
          city={city}
          
          setCity={setCity}
          getCityCoordinates={getCityCoordinates}
          getUserCoordinates={getUserCoordinates}
        />
        <div className="weather-data">
          <CurrentWeather weather={weather} />
          <div className="days-forecast">
            <h2>5-Day Forecast</h2>
            <ul className="weather-cards">
              {forecast.map((day, index) => (
                <WeatherCard key={index} day={day} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
