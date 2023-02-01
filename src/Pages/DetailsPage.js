import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/DetailPage.css';
import moon from '../images/moon-solid.svg';
import sun from '../images/sun-solid.svg';
import arrow from '../images/arrow-left-solid.svg';

function DetailsPage(props) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState();
  const [themeBtn, setThemeBtn] = useState([moon, 'Dark Mode']);

  const [countryArr, setCountryArr] = useState([]);
  const [pageState, setPageState] = useState(state.infoArr);


  useEffect(() => {
    // follow current theme
    let htmlBG = document.documentElement;
    if (htmlBG.classList.contains('darkBG') &&
      theme !== 'dark-theme') {
      setTheme(old => 'dark-theme')
      setThemeBtn(old => [sun, 'Light Mode'])
    } else {
      setTheme(old => 'light-theme')
      setThemeBtn(old => [moon, 'Dark Mode'])
    }

    // intializes View array on first load 
    // & rehydrates with new pagestate info when border button triggered
    if (pageState[10].length > 0) {
      request(`${pageState[10].toLocaleString()}`)
        .then(function (result) {
          let arr = []
          for (let i = 0; i < pageState[10].length; i++) {
            arr.push(
              <button className='border-btn'
                key={`border-btn-${i}`}
                onClick={() => {
                  setPageState(old => [
                    result[i].flags.png,
                    result[i].name.official,
                    result[i].name.nativeName[Object.keys(result[i].name.nativeName)[0]].official,
                    result[i].population,
                    result[i].region,
                    result[i].subregion,
                    result[i].capital,
                    result[i].tld[0],
                    result[i].currencies ? result[i].currencies[Object.keys(result[i].currencies)[0]].name : 'None',
                    Object.values(result[i].languages).join(', '),
                    result[i].borders ? result[i].borders : []
                  ])
                }}>
                {result[i].name.common}
              </button>
            )
          }
          setCountryArr(old => {
            return [...Country(pageState, arr)]
          });
        })
    } else {
      setCountryArr(old => {
        return [...Country(pageState,
          [
            <button className='border-btn'
              key={'border-btn-none'}>
              No Bordering Countries
            </button>
          ])
        ]
      });
    }

  }, [pageState]);


  function request(parem = 'USA') {
    // Ajax Promise with then() request
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function (event) {
        let obj1 = JSON.parse(event.target.response);
        resolve(obj1);
      }
      xhr.onerror = reject;
      xhr.open("GET", `https://restcountries.com/v3.1/alpha?codes=${parem}`);
      xhr.send();
    });
  }


  function Country(countryState, borderState) {
    // Builds the page main info
    let detail = [];

    detail.push(
      <section key='Detail Info' className='details'>
        <img src={countryState[0]} alt='flag' />
        <div className='details-container'>
          <h2>{countryState[1]}</h2>
          <div className='info-container'>
            <div className='info'>
              <p><strong>Native Name: </strong>{countryState[2]}</p>
              <p><strong>Population:</strong> {parseInt(countryState[3]).toLocaleString('en-US')}</p>
              <p><strong>Region:</strong> {countryState[4]}</p>
              <p><strong>Sub Region:</strong> {countryState[5]}</p>
              <p><strong>Capital:</strong> {countryState[6]}</p>
            </div>

            <div className='info info--special'>
              <p><strong>Top Level Domain:</strong> {countryState[7]}</p>
              <p><strong>Currencies: </strong> {countryState[8]} </p>
              <p><strong>Languages: </strong> {countryState[9]} </p>
            </div>
          </div>

          <div className='border-countries'>
            <p>Border Countries:</p>
            {[...borderState]}
          </div>
        </div>
      </section>);

    return detail
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
      setTheme(old => 'dark-theme')
      setThemeBtn(old => [sun, 'Light Mode'])
    } else {
      setTheme(old => 'light-theme')
      setThemeBtn(old => [moon, 'Dark Mode'])
    }
  }


  return (
    <div id='page-wrapper' className={theme}>
      <header>
        <nav>
          <h1>Where in the world?</h1>
          <button onClick={DarkMode}>
            <img src={themeBtn[0]} alt='moon' /> {themeBtn[1]}</button>
        </nav>
      </header>

      <main className='detail-main'>
        <section className='container'>
          <button
            onClick={() => navigate(-1)}>
            <img src={arrow} alt='arrow' />
            Back
          </button>
          {countryArr}
        </section>
      </main>
    </div>
  )
}

export default DetailsPage;

