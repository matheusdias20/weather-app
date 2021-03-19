import React, { useState } from 'react';

const api = {
  key: "bb5e9914a5a343fc9f9915e380ef0545",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "April", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
      ? ((weather.main.temp > 16) 
        ? 'app warm' 
        : 'app winter') 
      : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar"
            placeholder="Busque por um cidade..."
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}

          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
      
            <div className="weather-box">
              <div className="temperature">
                {Math.round(weather.main.temp)}ºC
              </div>
              <div className="weather">
                Sensação Térmica: {Math.round(weather.main.feels_like)}ºC 
              </div>
              <div className="temperature_max">
                {Math.round(weather.main.temp_max)}ºC
              </div>
              <div className="temperature_min">
                {Math.round(weather.main.temp_min)}ºC
              </div>
            </div>
          </>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
