// src/App.js
import './App.css';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import countriesJson from './countries.json';
import { useEffect, useState } from 'react';
import axios from "axios"


function App() {
  const [countriesList, setCountriesList] = useState(null);

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then(({data}) => {
        setCountriesList(data)
      })
      .catch((error) => {console.error(error)})

  }, [])

  if (!countriesList) {
		return <div className="loading">Loading....</div>
	}

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <CountriesList countriesList={countriesList} />
          <Routes>
            <Route
              path="/:id"
              element={<CountryDetails countriesList={countriesList} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
