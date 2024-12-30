import React, { useState, useContext, useEffect } from "react";
import WeatherContext from "./WeatherContext";

export default function SearchArea() {
  const [city, setCity] = useState("");

  const { weather, setWeather, error, setError, fetchWeather } = useContext(WeatherContext);

  const handleChange = (e) => {
    setCity(e.target.value);
  };


  const handleWeather = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  const fetchWeatherByLocation = async (lat, lon) => {
    const API_Key = "4767c92c7510a82fd1314991672cdbba";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        throw new Error("Failed to fetch weather data");
      }
    } catch (error) {
      setError(error.message);
      console.log("Error fetching weather data:", error);
    }
  };

  const getLocationAndFetchWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          setError(error.message);
          console.log("Error retrieving your location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="search-section">
      <form action="" className="search-form">
        <span>Search</span>
        <input
          type="text"
          value={city}
          placeholder="Enter a city name"
          className="search-input"
          onChange={handleChange}
          required
        />
      </form>
      <button className="search button" onClick={handleWeather}>
        {" "}
        <i className="fas fa-search"></i> Search
      </button>
      <button className="location button" onClick={getLocationAndFetchWeather}>
        {" "}
        <i className="fas fa-location-arrow"></i> My Location
      </button>
    </div>
  );
}
