import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchWeather from '../utils/fetchWeather';


const Location = ({ onLocationUpdate }) => {
  const [locationName, setLocationName] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          const city =
            response.data.address.city ||
            response.data.address.town ||
            response.data.address.village;
          if (city) {
            setLocationName(city);
            onLocationUpdate({ lat: latitude, lon: longitude, city });
            fetchCurrentWeather(latitude, longitude);
          }
        } catch (error) {
          console.error('Error fetching location details:', error);
        }
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  };

  const fetchCurrentWeather = async (latitude, longitude) => {
    try {
      const weatherData = await fetchWeather(latitude, longitude, new Date());
      if (weatherData.status === 'forecast') {
        setCurrentWeather(weatherData.weather);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [onLocationUpdate]);

  return (
    <div>
      <p>Your current location: <strong>{locationName}</strong></p>
      {currentWeather && (
        <div>
          <p>Your Current Temperature: {currentWeather.temperature}°C</p>
          <p>Your Current Weather Forecast: {currentWeather.weatherDescription}</p>
        </div>
      )}
    </div>
  );
};

export default Location;
