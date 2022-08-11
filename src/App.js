import { useState } from 'react';
import { useEffect } from 'react';
import './Styles/App.css';
import CustomSelect from './Components/CustomSelect';
import moon from './images/moon-solid.svg';
import sun from './images/sun-solid.svg';

function App() {
  // an array of components describing countries
  const [view, setView] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [modeBTN, setModeBTN] = useState([moon, 'Dark Mode']);
  const [theme, setTheme] = useState('light-theme');

  // intitailizes View array on first load
  useEffect(() => {
    request()
      .then(function (result) {
        setView(old => CountryCard([...result]));
      })
      .catch(function () {
        console.log('error')
      })
  }, []);

  function request(parem = 'all') {
    // Ajax Promise with then() request
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function (event) {
        let obj1 = JSON.parse(event.target.response);
        resolve(obj1);
      }
      xhr.onerror = reject;
      xhr.open("GET", `https://restcountries.com/v3.1/${parem}`);
      xhr.send();
    })
  }

  function CountryCard(result) {
    let card = [];
    for (let i = 0; i < result.length; i++) {
      card.push(
        <div className='country-card'
          key={result[i].name.official}>
          <a href='./public/Detail.html' target={'_blank'}>
            <img src={result[i].flags.png} alt='country' />
          </a>
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
    let htmlBG = document.documentElement;
    if (htmlBG.classList.contains('lightBG')) {
      htmlBG.classList.remove('lightBG');
      htmlBG.classList.add('darkBG');
    } else {
      htmlBG.classList.remove('darkBG');
      htmlBG.classList.add('lightBG');
    }

    if (theme === 'light-theme') {
      setTheme(old => 'dark-theme');
      setModeBTN(old => [sun, 'Light Mode']);
    } else {
      setTheme(old => 'light-theme')
      setModeBTN(old => [moon, 'Dark Mode']);
    }
  }

  // Geting data Custom Select + Region Call
  function childToParent(childData) {
    request(`region/${childData}`)
      .then(function (result) {
        setView(old => CountryCard([...result]));
      })
      .catch(function () {
        console.log('error')
      })
  }

  function HandleSearchInput(event) {
    setSearchValue(old => event.target.value);
  }

  function searchByName(event) {
    event.preventDefault();
    if (searchValue === '') {
      request()
        .then(function (result) {
          if (result.status !== 404) {
            console.log(result);
            setView(old => CountryCard([...result]));
            setSearchValue(old => '');
          }
        })
        .catch(function () {
          console.log('error')
        })
    } else {
      request(`name/${searchValue}`)
        .then(function (result) {
          if (result.status !== 404) {
            console.log(result);
            setView(old => CountryCard([...result]));
            setSearchValue(old => '');
          }
        })
        .catch(function () {
          console.log('error')
        })
    }
  }


  return (
    <div id='page-wrapper' className={theme}>
      <header>
        <nav>
          <h1>Where in the world?</h1>
          <button onClick={DarkMode}>
            <img src={modeBTN[0]} alt='moon' /> {modeBTN[1]}</button>
        </nav>
      </header>

      <main>
        <section className='form-section'>
          <form className='search-form'>
            <button type='submit'
              onClick={searchByName}>
              <img src={require('./images/search-solid.svg').default} alt='search' />
            </button>
            <input type={'search'}
              autoComplete='country-name'
              onChange={HandleSearchInput}
              id='country-search'
              name='country-search'
              placeholder='Search for a country...' />
          </form>
          {/*Geting data Custom Select */}
          <CustomSelect childToParent={childToParent} />
        </section>

        <section className='countries-container'>
          {view}
        </section>
      </main>
    </div >
  );
}

export default App;
