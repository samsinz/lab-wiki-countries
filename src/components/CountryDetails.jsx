import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function CountryDetail({ countriesList }) {
  const params = useParams();
  const id = params.id;
  const [soloCountry, setSoloCountry] = useState(null);
  const [borderedCountries, setBorderedCountries] = useState(null);

//   const [singleCountry] = countriesList.filter((x) => x.alpha3Code === id);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${id}`)
      .then(({ data }) => {
        setSoloCountry(data);
        setBorderedCountries(
          countriesList.filter((x) =>
            data.borders.includes(x.alpha3Code)
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!soloCountry) {
    return <div className="loading">Loading....</div>;
  }

  return (
    <div className="col-7">
      <h1>{soloCountry.name.common}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{soloCountry.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {soloCountry.area} km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {borderedCountries.map((borderedCountry) => {
                  return (
                    <li key={borderedCountry.alpha3Code}>
                      <Link to={`/${borderedCountry.alpha3Code}`}>
                        {borderedCountry.name.common}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetail;
