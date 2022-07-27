import React, { useState, useEffect } from 'react';

import './App.css';

//https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ab261c0036f195f71a5dfcda95109b0e


function App() {

  const [cityName, setCityName] = useState('dallas');
  const [errorMessage, setErrorMessage] = useState(false);
  const [weatherData, setWeatherData] = useState({
    name: '',
    temperature: '',
    feels_like: '',
    pressure: '',
    humidity: ''
  })

  const toFarenheight = (value) => {
    return (value * 1.8) + 32
  }

  const fetchData = async () => {
    const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=dallas&units=metric&appid=ab261c0036f195f71a5dfcda95109b0e');
    const weatherData = await data.json();
    console.log(weatherData);

    

    setWeatherData({
      name: weatherData.name,
      country: weatherData.sys.country,
      temperature: Math.round(toFarenheight(weatherData.main.temp)),
      feels_like: Math.round(toFarenheight(weatherData.main.feels_like)),
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity
    })
  }

  useEffect(() => {
    
    fetchData()

    return() => {}
  }, [])

  async function changeHandler(e) {

      if (e.key === 'Enter'){
        
        console.log(cityName)

        try {
          const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ab261c0036f195f71a5dfcda95109b0e`);
          const weatherData = await data.json();
          console.log(weatherData);

          setWeatherData({
            name: weatherData.name,
            country: weatherData.sys.country,
            temperature: Math.round(toFarenheight(weatherData.main.temp)),
            feels_like: Math.round(toFarenheight(weatherData.main.feels_like)),
            pressure: weatherData.main.pressure,
            humidity: weatherData.main.humidity
          })

          setErrorMessage(false);
          e.target.value = ''
        }
        catch(error) {
          setErrorMessage(true);
        }
    }
  }
  return (
    <div className='container'>
      <input onChange={(e) => setCityName(e.target.value)} onKeyDown={changeHandler} placeholder='search city'/>
      {
        errorMessage ? <p className='error-message'>* Please enter a valid city name</p> : null
        // <p className='error-message'>* Please enter a valid city name</p>
      }
      
      <h1>{weatherData.name}, {weatherData.country}</h1>
      <h3>{weatherData.temperature} °F</h3>

      <div className='card'>
        <div>
          <p className='title'>Feels like</p>
          <p>{weatherData.feels_like} °F</p>
        </div>

        <div>
          <p className='title'>Pressure</p>
          <p>{weatherData.pressure}</p>
        </div>

        <div>
          <p className='title'>Humidity</p>
          <p>{weatherData.humidity}</p>
        </div>
      </div>
    </div>
  );
}

export default App;