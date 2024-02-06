import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Searchbar.module.css';
import axios from 'axios';

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface SearchbarProps {
  onDataReceived: (data: any[]) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onDataReceived }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
const [ isDataFound , setDataNotFound]= useState<boolean>();
  // Debounce the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // If search term is empty, fetch all countries
  //       if (debouncedSearchTerm.trim() === '') {
  //         const response = await axios.get('https://restcountries.com/v3.1/all');
  //         const data = response.data;
  //         onDataReceived(data);
  //         setdataFetched(false);
  //       } else {
  //         // Otherwise, fetch countries based on search term
  //         const response = await axios.get(`https://restcountries.com/v3.1/name/${debouncedSearchTerm}`);
  //         const data = response.data;
  //         onDataReceived(data);
          
          
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [debouncedSearchTerm, onDataReceived]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debouncedSearchTerm.trim() === '') {
          const response = await axios.get('https://restcountries.com/v3.1/all');
          const data = response.data;
          onDataReceived(data);
          setDataNotFound(false); // Reset data not found flag
        } else {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${debouncedSearchTerm}`);
          const data = response.data;
          onDataReceived(data);
          setDataNotFound(data.length === 0); // Set data not found flag if no results found
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setDataNotFound(true); // Set data not found flag if error occurs
      }
    };
  
    fetchData();
  }, [debouncedSearchTerm, onDataReceived]);

  return (
    <div className={styles.inputwrapper}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search the Country"
      />
      {isDataFound && <p className={styles.thepara}>Country not found. try searching something else</p>}
    </div>
  );
};

export default Searchbar;
