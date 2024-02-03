import React, { useEffect, useState } from 'react'
import locationicon from "../images/wired-outline-18-location-pin.png"
import styles from './CardComponent.module.css'
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
    maps:{
        googleMaps: string;
    }

}

export default function CardCountries() {
    const [theData, setThedata] = useState<Country[]>([]);

    const url = "https://restcountries.com/v3.1/all";

    async function apicall(url: string): Promise<Country[]> {
        try {
            const data = await fetch(url);
            const theResult = await data.json();
            return theResult;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apicall(url);
                console.log(data);
                setThedata(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.countryMainWrapper}>
            {theData.map((country, index: number) => (
                <div className={styles.lidiv}>
                    <ul>
                        <li key={index}>
                            <div className={styles.imgeWrapper}>
                                <img src={country.flags.png} alt="" />
                            </div>
                            <strong>Name:</strong> {country.name.common} <br /> <strong>Capital:</strong> {country.capital}
                        </li>
                    </ul>
                    <div className={styles.locationiconwrpper}>  
                      <a href={country.maps.googleMaps}><img src={locationicon} alt="" /></a>
                    </div>
<hr />                </div>

            ))}


        </div>
    )
}

