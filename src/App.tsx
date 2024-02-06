// App.tsx
import React, { useState } from 'react';
import styles from './App.module.css';
import CardCountries from './component/CardCountries';
import Searchbar from './component/Searchbar';

function App() {
  const [allData, setAllData] = useState<any[]>([]);

  const handleDataReceived = (data: any[]) => {
    setAllData(data);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.searchbarAndH1wrapper}>
        <h1>Countries App</h1>
        <Searchbar onDataReceived={handleDataReceived} />
      </div>
      <CardCountries allData={allData} />
    </div>
  );
}

export default App;
