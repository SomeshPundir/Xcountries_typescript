import React from 'react';
import CardCountries from './component/CardCountries';
import styles from './App.module.css';
function App() {
return(
  <div className={styles.mainWrapper}>
  <h1>countries App</h1>
  <CardCountries/>
  </div>
)
}

export default App;
