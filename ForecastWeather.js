import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForecastWeather = ({ location, onWeatherUpdate }) => {
  const [forecastWeather, setForecastWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,hourly&units=metric&appid=c150ca1e95042509075be027bd959218`
        );
        const forecast = response.data.daily;
        setForecastWeather(forecast);
        onWeatherUpdate(forecast[0]); // Assuming the first entry is for today's forecast
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location, onWeatherUpdate]);

  return (
    <div>
      <p>Weather forecast:</p>
      {forecastWeather &&
        forecastWeather.map((forecast, index) => (
          <div key={index}>
            <p>Date: {new Date(forecast.dt * 1000).toDateString()}</p>
            <p>Temperature: {forecast.temp.day}°C</p>
            <p>Weather: {forecast.weather[0].description}</p>
          </div>
        ))}
    </div>
  );
};

export default ForecastWeather;
