import React from 'react'
import { ReactDOM } from 'react-dom/client';
import { useState } from 'react';
import moon from '../images/moon-solid.svg';
import sun from '../images/sun-solid.svg';

function DetailPage() {
  const [modeBTN, setModeBTN] = useState([moon, 'Dark Mode']);
  const [theme, setTheme] = useState('light-theme');

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

  return (
    <div id='page-wrapper' className={theme}>
      <header>
        <nav>
          <h1>Where in the world?</h1>
          <button onClick={DarkMode}>
            <img src={modeBTN[0]} alt='moon' /> {modeBTN[1]}</button>
        </nav>
      </header>

      <main className='Detail-Main'>
        <button>Back</button>
        <section>
          <img src='' alt='flag' />
          <div>
            <h2>Country</h2>
            <div>
              <p><strong>Native Name:</strong></p>
              <p><strong>Population:</strong></p>
              <p><strong>Region:</strong></p>
              <p><strong>Sub Region:</strong></p>
              <p><strong>Capital:</strong></p>
              <p><strong>Top Level Domain:</strong></p>
              <p><strong>Currencies:</strong></p>
              <p><strong>Languages:</strong></p>
            </div>
            <div>
              <p>Border Countries</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DetailPage