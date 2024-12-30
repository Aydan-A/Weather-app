import React, { useContext } from "react";
import WeatherContext from "./WeatherContext";

export default function Forecast() {
  const { error, hourlyData } = useContext(WeatherContext);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!hourlyData || hourlyData.length === 0) {
    return <p className="no-data">No hourly forecast data available.</p>;
  }

  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="forecast-container">
        {hourlyData.map((hour, index) => {
            return( 
            <div className="hour" key={index}>
                <p>{new Date(hour.dt*1000).toLocaleTimeString()}</p>
                <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="{hour.weather[0].description}" />
                <p>{hour.temp}</p>
                <p>{hour.weather[0].description}</p>
              </div>)
         
        })}
      </div>
    </div>
  );
}
