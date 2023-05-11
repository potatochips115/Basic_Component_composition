import React, { useState, useEffect } from 'react';

const RentalInfo = ({ location, holidayDate }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSampleRentals = () => {
      setLoading(true);

      if (holidayDate < new Date()) {
        // If holiday date is in the past, show "No Accommodation Available"
        setRentals([]);
        setLoading(false);
      } else {
        // Generate random rental data
        const rentalData = Array.from({ length: Math.floor(Math.random() * 6) + 3 }, (_, index) => {
          const hotelName = generateRandomHotelName();
          const address = generateRandomAddress();
          const countryName = location.countryName;

          return {
            name: hotelName,
            ratePlan: {
              price: {
                current: Math.floor(Math.random() * 1151) + 50,
                currency: '$',
              },
            },
            address: {
              streetAddress: address.streetAddress,
              locality: address.locality,
              region: address.region,
              postalCode: address.postalCode,
              countryName: countryName,
            },
          };
        });

        setRentals(rentalData);
        setLoading(false);
      }
    };

    if (location) {
      generateSampleRentals();
    }
  }, [location, holidayDate]);

  const generateRandomHotelName = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabets.length);
    const hotelName = alphabets.charAt(randomIndex) + ' Hotel';

    return hotelName;
  };

  const generateRandomAddress = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomStreetNumber = Math.floor(Math.random() * 100) + 1;
    const randomStreetLetter1 = alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    const randomStreetLetter2 = alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    const randomLocality = alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    const randomRegion = alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    const randomPostalCode = Math.floor(Math.random() * 900000) + 100000;

    const address = {
      streetAddress: `${randomStreetNumber}${randomStreetLetter1}${randomStreetLetter2} Street`,
      locality: randomLocality,
      region: randomRegion,
      postalCode: randomPostalCode,
    };

    return address;
  };

  if (loading) {
    return <p>Loading rental information...</p>;
  }

  if (!rentals.length) {
    return <p>No Accommodation Available.</p>;
  }

  return (
    <div>
      <h4>Rental Information</h4>
      {rentals.map((rental, index) => (
        <div key={index}>
          <h5>{rental.name}</h5>
          <p>Price: {rental.ratePlan.price.current} {rental.ratePlan.price.currency} per night</p>
          <p>Address: {rental.address.streetAddress}, {rental.address.locality}, {rental.address.region}, {rental.address.postalCode}, {rental.address.countryName}</p>
        </div>
      ))}
    </div>
  );
};

export default RentalInfo;
