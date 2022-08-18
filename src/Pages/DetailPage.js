import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import '../Styles/DetailPage.css';
import moon from '../images/moon-solid.svg';
import sun from '../images/sun-solid.svg';
import arrow from '../images/arrow-left-solid.svg';

function DetailPage(props) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(['light-theme', [moon, 'Dark Mode']]);
  const [countryArr, setCountryArr] = useState([]);

  useEffect(() => {
    // follow current theme
    let htmlBG = document.documentElement;
    if (htmlBG.classList.contains('darkBG')) {
      setTheme(old => ['dark-theme', [sun, 'Light Mode']])
    }
    // intitailizes View array on first load
    request(`name/${String(state.name)}`)
      .then(function (result) {
        // console.log(result[0])
        setCountryArr(old => [...Country(result)]);
      })
      .catch(function () {
        console.log('error')
      })

  }, []);


  function backBtn() {
    navigate(-1)
  }


  function request(parem = 'name/USA') {
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
    });
  }


  function border() {
    // Populates Country Components boreder section with Correct Countries. 
    let arr = [];
    if (state.borders.length === 0) {
      arr.push(
        <button className='border-btn'
          key={'border-btn-none'}>
          No Bordering Countries
        </button>
      )
    } else {
      for (let i = 0; i < state.borders.length; i++) {
        arr.push(
          <button className='border-btn'
            key={`border-btn-${state.borders[i]}`}
            onClick={() => {
              request(`name/${state.borders[i]}`)
                .then(function (result) {
                  setCountryArr(old => [...Country(result)]);
                })
                .catch(function () {
                  console.log('error')
                })
            }}>
            {state.borders[i]}
          </button>
        )
      }
    }
    return [...arr];
  }


  function Country(result) {
    // Builds the page main info
    let detail = [];

    detail.push(
      <section key={`detailPage${result[0].name.official}`} className='container'>
        <button
          onClick={backBtn}>
          <img src={arrow} alt='arrow' /> Back
        </button>
        {/* {console.log(result)} */}
        <section className='details'>
          <img src={result[0].flags.png} alt='flag' />
          <div className='details-container'>
            <h2>{result[0].name.official}</h2>
            <div >
              <p><strong>Native Name: </strong>
                {result[0].name.nativeName[Object.keys(result[0].name.nativeName)[0]].official}</p>
              <p><strong>Population:</strong> {parseInt(result[0].population).toLocaleString('en-US')}</p>
              <p><strong>Region:</strong> {result[0].region}</p>
              <p><strong>Sub Region:</strong> {result[0].subregion}</p>
              <p><strong>Capital:</strong> {result[0].capital}</p>
              <p><strong>Top Level Domain:</strong> {result[0].tld[0]}</p>
              <p><strong>Currencies: </strong>
                {result[0].currencies[Object.keys(result[0].currencies)[0]].name}</p>
              <p><strong>Languages: </strong>
                {Object.values(result[0].languages).toString()}</p>
            </div>
            <div className='border-countries'>
              <p>Border Countries</p>
              {border()}
            </div>
          </div>
        </section>
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

      <main className='detail-main'>
        {countryArr}
      </main>
    </div>
  )
}

export default DetailPage;