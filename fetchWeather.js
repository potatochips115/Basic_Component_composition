import axios from 'axios';

const fetchWeather = async (latitude, longitude, date) => {
  const currentDate = new Date();
  const holidayDate = new Date(date);
  const diffInDays = Math.ceil((holidayDate - currentDate) / (1000 * 60 * 60 * 24));

  if (diffInDays < -16) {
    console.log('Historical data is not available');
    return { status: 'historical' };
  }

  if (diffInDays > 16) {
    console.log('Future data is not available');
    return { status: 'future' };
  }

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  try {
    if (diffInDays < 0) {
      // Historical weather data
      const timestamp = Math.floor(holidayDate.getTime() / 1000);
      const response = await axios.get(
        `${BASE_URL}/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${timestamp}&appid=${API_KEY}&units=metric`
      );
      console.log('Historical weather data:', response.data.current);
      return { status: 'historical', weather: response.data.current };
    } else {
      // Forecast weather data
      const response = await axios.get(
        `${BASE_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
      );
      const dailyData = response.data.daily;
      const forecast = dailyData.find((day) => 
        new Date(day.dt * 1000).toDateString() === holidayDate.toDateString()
      );
      console.log('Forecast weather data:', forecast);
      return { status: 'forecast', weather: forecast };
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};


export default fetchWeather;
