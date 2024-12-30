import React from "react";
import SearchArea from "./Components/SearchArea";
import { WeatherProvider } from "./Components/WeatherContext";
import WeatherDisplay from "./Components/GeneralInform";
import Forecast from "./Components/HourlyForecast";

function App() {
  return (
    <div className="App">
      <WeatherProvider>
        <SearchArea />
        <WeatherDisplay/>
        <Forecast/>
      </WeatherProvider>
    </div>
  );
}

export default App;
