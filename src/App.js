import './Styles/App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  // an array of components describing countries
  let [view, setView] = useState([]);

  // intitailizes View array
  useEffect(() => {
    setView(old => [])
  }, []);

  return (
    <div id='page-wrapper'>
      <header>
        <nav>
          <h1>Where in the world?</h1>
          <button>
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
          <form action='' className='select-form'>
            <select name='region' id='region'>
              <option value="" disabled selected hidden>Filter by Region</option>
              <option value='Africa'>Africa</option>
              <option value='America'>America</option>
              <option value='Asia'>Asia</option>
              <option value='Europe'>Europe</option>
              <option value='Oceania'>Oceania</option>
            </select>
          </form>
        </section>

        <section className='countries'>

        </section>
      </main>
    </div>
  );
}

export default App;
