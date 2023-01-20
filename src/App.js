import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/App.css';
import moon from './images/moon-solid.svg';
import sun from './images/sun-solid.svg';
import CustomSelect from './Components/CustomSelect';


function App() {
  // an array of components describing countries
  const [view, setView] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [theme, setTheme] = useState(['light-theme', [moon, 'Dark Mode']]);
  const navigate = useNavigate();


  useEffect(() => {
    // follow current theme
    let htmlBG = document.documentElement;
    if (htmlBG.classList.contains('darkBG')) {
      setTheme(old => ['dark-theme', [sun, 'Light Mode']])
    }

    // Only get countrydata from temp sessionstorage (if any) after the first load. 
    if (typeof (Storage) !== "undefined" &&
      sessionStorage.getItem('countryData') !== null) {
      const newJSON = sessionStorage.getItem("countryData");
      const newPLAY = JSON.parse(newJSON);
      setView(old => CountryCard([...newPLAY]));
    } else {
      // intitailizes View array on first load
      request()
        .then(function (result) {
          // SessionStorage
          if (typeof (Storage) !== "undefined") {
            sessionStorage.setItem("countryData", result);
          }
          setView(old => {
            let obj = JSON.parse(result)
            return CountryCard([...obj]);
          });

        })
        .catch(function () {
          console.log('error')
        })
    }
  }, []);


  function request(parem = 'all') {
    // Ajax Promise with then() request
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function (event) {
        // raw unparsed Json data
        resolve(event.target.response);
      }
      xhr.onerror = reject;
      xhr.open("GET", `https://restcountries.com/v3.1/${parem}`);
      xhr.send();
    })
  }


  // Handle navigating and passing info to detail page
  function handleClick(name, border) {
    if (border) {
      request(`alpha?codes=${border.toString()}`)
        .then(function (result) {
          let obj = JSON.parse(result)
          let arr = [];
          for (let i = 0; i < 2; i++) {
            arr.push(obj[i].name.official)
          }
          navigate('details', {
            state: {
              name: name,
              borders: arr,
            }
          })
        })
        .catch(function () {
          console.log('error')
        })
    } else {
      navigate('details', {
        state: {
          name: name,
          borders: [],
        }
      })
    }
  }


  // builds cards for every country
  function CountryCard(result) {
    let card = [];
    for (let i = 0; i < result.length; i++) {
      card.push(
        <div className='country-card'
          key={result[i].name.official}
          onClick={() => handleClick(result[i].name.official, result[i].borders)}>
          <img src={result[i].flags.png} alt='country' />
          <p>{result[i].name.official}</p>
          <div className='country-card-details'>
            <p><strong>Population</strong>: {parseInt(result[i].population).toLocaleString('en-US')}</p>
            <p><strong>Region</strong>: {result[i].region}</p>
            <p><strong>Capital</strong>: {result[i].capital}</p>
          </div>
        </div>
      )
    }
    return [...card]
  }


  // Geting data from Custom Select & making API Region Call
  function childToParent(childData) {
    request(`region/${childData}`)
      .then(function (result) {
        let obj = JSON.parse(result)
        setView(old => CountryCard([...obj]));
      })
      .catch(function () {
        console.log('error')
      })
  }


  function HandleSearchInput(event) {
    setSearchValue(old => event.target.value);
  }


  // getting search input & making API Search Call
  function searchByName(event) {
    event.preventDefault();
    if (searchValue === '') {
      request()
        .then(function (result) {
          let obj = JSON.parse(result)
          if (obj.status !== 404) {
            console.log(result);
            setView(old => CountryCard([...obj]));
            setSearchValue(old => '');
          }
        })
        .catch(function () {
          console.log('error')
        })
    } else {
      request(`name/${searchValue}`)
        .then(function (result) {
          let obj = JSON.parse(result)
          if (obj.status !== 404) {
            console.log(result);
            setView(old => CountryCard([...obj]));
            setSearchValue(old => '');
          }
        })
        .catch(function () {
          console.log('error')
        })
    }
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

    if (theme[0] === 'light-theme') {
      setTheme(old => ['dark-theme', [sun, 'Light Mode']]);
    } else {
      setTheme(old => ['light-theme', [moon, 'Dark Mode']])
    }
  }


  return (
    <div id='page-wrapper' className={theme[0]}>
      <header>
        <nav>
          <h1>Where in the world?</h1>
          <button onClick={DarkMode}>
            <img src={theme[1][0]} alt='moon' /> {theme[1][1]}</button>
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
