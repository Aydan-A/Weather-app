import React, { createContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);

  const fetchWeather = async (city) => {
    const API_Key = "1669695fdb817cab90ecf96bcc7cf662";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather(data);
      const { lat, lon } = data.coord;
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric`;
      const geoResponse = await fetch(geoUrl);
      if (!geoResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const geoData = await geoResponse.json();
      setHourlyData(geoData.hourly);
    } catch (error) {
      setError(error.message);
      console.log("Error fetching weather data:", error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        error,
        setWeather,
        setError,
        fetchWeather,
        hourlyData,
        setHourlyData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
