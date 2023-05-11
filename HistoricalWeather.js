import React from 'react';

const HistoricalWeather = ({ temperature, humidity, weather }) => {
  const isForecastAvailable = temperature && humidity && weather;

  return (
    <div>
      {isForecastAvailable ? (
        <div>
          <h2>Past Weather Information:</h2>
          <p>Temp: {temperature}</p>
          <p>Humidity: {humidity}</p>
          <p>Weather Condition: {weather}</p>
        </div>
      ) : (
        <div>Past Weather Forecast: Unavailable</div>
      )}
    </div>
  );
};

export default HistoricalWeather;
