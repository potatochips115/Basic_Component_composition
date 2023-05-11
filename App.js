import CountrySelector from './components/CountrySelector';
import PublicHolidayList from './components/PublicHolidayList';
import Location from './components/Location';
import React, { useState } from 'react';
import './App.css';

const  App=()=> {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [location, setLocation] = useState(null);

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    console.log(countryCode);
  };
  return (
    <div className="App">
      <Location onLocationUpdate={setLocation} />
      <CountrySelector onCountryChange={handleCountryChange} />
      {selectedCountry && <PublicHolidayList countryCode={selectedCountry} location={location} />}
    </div>
  );
}

export default App;