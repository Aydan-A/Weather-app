import React, { createContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);

  const fetchWeather = async (city) => {
    const API_Key = "4767c92c7510a82fd1314991672cdbba";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather(data);
      setHourlyData(data.hourly)
    } catch (error) {
      setError(error.message);
      console.log("Error fetching weather data:", error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weather, error, setWeather, setError, fetchWeather, hourlyData,setHourlyData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
