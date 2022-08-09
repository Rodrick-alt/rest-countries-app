import './Styles/App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import CustomSelect from './Components/CustomSelect';

function App() {
  // an array of components describing countries
  let [view, setView] = useState([]);

  // intitailizes View array
  useEffect(() => {
    request()
      .then(function (result) {
        setView(old => CountryCard([...result]));
      })
      .catch(function () {
        console.log('error')
      })
  }, []);

  function request() {
    // Ajax Promise with then() request
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function (event) {
        let obj1 = JSON.parse(event.target.response);
        resolve(obj1);
      }
      xhr.onerror = reject;
      xhr.open("GET", 'https://restcountries.com/v3.1/all');
      xhr.send();
    })
  }

  function CountryCard(result) {
    let card = [];
    for (let i = 0; i < result.length; i++) {
      card.push(
        <div className='country-card'>
          <img src={result[i].flags.png} alt='country' />
          <p>{result[i].name.official}</p>
          <div className='country-card-details'>
            <p><strong>Population</strong>: {result[i].population}</p>
            <p><strong>Region</strong>: {result[i].region}</p>
            <p><strong>Capital</strong>: {result[i].capital}</p>
          </div>
        </div>
      )
    }

    return [...card]
  }

  function DarkMode() {
    let page = document.getElementById('page-wrapper');
    if (page.classList.contains('light-theme')) {
      page.classList.remove('light-theme');
      page.classList.add('dark-theme')
    } else {
      page.classList.remove('dark-theme');
      page.classList.add('light-theme')
    }
  }

  return (
    <div id='page-wrapper' className='light-theme'>
      <header>
        <nav>
          <h1>Where in the world?</h1>
          <button onClick={DarkMode}>
            <img src={require('./images/moon-solid.svg').default} alt='moon' /> Dark Mode</button>
        </nav>
      </header>

      <main>
        <section className='form-section'>
          <form action='' className='search-form'>
            <button type='submit'>
              <img src={require('./images/search-solid.svg').default} alt='search' />
            </button>
            <input type={'search'}
              id='country-search'
              name='country-search'
              placeholder='Search for a country...' />
          </form>
          <CustomSelect />
        </section>

        <section className='countries-container'>
          {view}
        </section>
      </main>
    </div>
  );
}

export default App;
