import React, { useState, useEffect } from 'react';

const CurrentWeather = ({ weather }) => {
  const [currentTime, setCurrentTime] = useState('');

  const updateTime = () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const formattedHours = hours % 12 || 12; // Handle the case where hours % 12 is 0
    const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    const finalTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
    setCurrentTime(finalTime);
  };

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="current-weather">
      <div className="details">
        <h2>{weather.city} ({weather.date})</h2>
        <h6>Temperature: {weather.temp}°C</h6>
        <h6>Wind: {weather.wind} M/S</h6>
        <h6>Humidity: {weather.humidity}%</h6>
        <h6>Time: {currentTime}</h6> {/* Display the current time */}
      </div>
      <div className="icon">
        <img src={weather.icon} alt="weather icon" />
        <h6>{weather.description}</h6>
      </div>
    </div>
  );
};

export default CurrentWeather;
