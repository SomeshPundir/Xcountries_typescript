// CardCountries.tsx
import React, { useEffect, useState } from 'react';
import locationicon from '../images/wired-outline-18-location-pin.png';
import styles from './CardComponent.module.css';

interface Country {
  name: {
    common: string;
  };
  capital: string;
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
  maps: {
    googleMaps: string;
  };
}

interface CardCountriesProps {
  allData: Country[];
}

const CardCountries: React.FC<CardCountriesProps> = ({ allData }) => {
  const [filteredData, setFilteredData] = useState<Country[]>(allData);

  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);

  // // Separate useEffect for the initial API call
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Perform the initial API call if necessary
  //       if (allData.length === 0) {
  //         const response = await fetch('https://restcountries.com/v3.1/all');
  //         const data = await response.json();
  //         setFilteredData(data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [allData]);

  return (
    <div className={styles.countryMainWrapper}>
      {filteredData.map((country, index: number) => (
        <div className={styles.lidiv} key={index}>
          <ul>
            <li>
              <div className={styles.imgeWrapper}>
                <img src={country.flags.png} alt="" />
              </div>
              <strong>Name:</strong> {country.name.common} <br />
              <strong>Capital:</strong> {country.capital}
            </li>
          </ul>
          <div className={styles.locationiconwrpper}>
            <a href={country.maps.googleMaps}>
              <img src={locationicon} alt="" />
            </a>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CardCountries;
