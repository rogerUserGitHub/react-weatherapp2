import React, { useState } from 'react';
import './App.css';

const api = {
  key: 'fa7177ef226bb8654d5c3aa53edcc540',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  //setQuery updates query with each key stroke. Upon enter, API is fired
  const search = (evt: { key: string }) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(resp => resp.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = (d: Date) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    // if search hasnt done, false, so goes to 'app' (line 48)
    // if search done, check whether temp is above 16, else return  'app'
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.weather[0].main === 'Clouds'
            ? 'app cloudy'
            : weather.weather[0].main === 'Clear'
            ? 'app clear'
            : weather.weather[0].main === 'Rain'
            ? 'app rain'
            : weather.weather[0].main === 'Rain'
            ? 'app rain'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Type in the name of a city...'
            // get value of input of types input
            onChange={e => setQuery(e.target.value)}
            // bind value to query
            value={query}
            onKeyPress={search}
          />
        </div>
        {/* checks if weather.main (city name value in object is not undefined)*/}
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())} </div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}</div>
              <div className='weather'>{weather.weather[0].description}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
