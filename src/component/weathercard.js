import React from 'react';
// import './App.css'

const WeatherCard = ({ day }) => {
  return (
    <li className="card">
      <h3>({day.date})</h3>
      <img src={day.icon} alt="weather icon" />
      <h6>Temp: {day.temp}°C</h6>
      <h6>Wind: {day.wind} M/S</h6>
      <h6>Humidity: {day.humidity}%</h6>
    </li>
  );
};

export default WeatherCard;
