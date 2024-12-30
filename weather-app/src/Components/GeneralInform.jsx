import React, { useContext } from "react";
import WeatherContext from "./WeatherContext";

export default function WeatherDisplay() {
  const { weather, error } = useContext(WeatherContext);
  if (error) {
    return <p className="error"> ⚠️{error}</p>;
  }

  //Important
  if (!weather) {
    return <p className="Loading"></p>;
  }

  return (
    <div className="displayWeather">
      <h3>{weather.name}</h3>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
      <p className="temp">Temperature: {weather.main.temp}°C</p>
      <p className="description">{weather.weather[0].description}</p>
      <p>Feels like :{weather.main.feels_like} °C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>
        Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
      </p>
      <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>
  );
}
