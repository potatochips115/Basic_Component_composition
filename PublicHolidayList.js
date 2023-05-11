import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Holiday from './Holiday';

const PublicHolidayList = ({ countryCode, location }) => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(`https://date.nager.at/Api/v2/PublicHolidays/${new Date().getFullYear()}/${countryCode}`);
        setHolidays(response.data);
      } catch (error) {
        console.error('Error fetching public holidays:', error);
      }
    };

    if (countryCode) {
      fetchHolidays();
    }
  }, [countryCode]);

  return (
    <div>
      <h2>List of Public Holidays</h2>
      <div className="holiday-container">
        {holidays.map((holiday) => (
          <Holiday key={holiday.date} holiday={holiday} location={location} />
        ))}
      </div>
    </div>
  );
};

export default PublicHolidayList;
