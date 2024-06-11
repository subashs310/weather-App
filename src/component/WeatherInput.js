import React from 'react';
// import './App.css'

const WeatherInput = ({ city, setCity, getCityCoordinates, getUserCoordinates }) => {
  return (
    <div className="weather-input">
      <h3>Enter a City Name</h3>
      <input
        className="city-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="E.g., New York, London, Tokyo"
        onKeyUp={(e) => e.key === "Enter" && getCityCoordinates()}
      />
      <button className="search-btn" onClick={getCityCoordinates}>Search</button>
      <div className="separator"></div>
      <button className="location-btn" onClick={getUserCoordinates}>Use Current Location</button>
    </div>
  );
};

export default WeatherInput;
