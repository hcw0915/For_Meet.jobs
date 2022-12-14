import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  // openweather API
  // const cityName = location; // 下方語法已經限制undefined情況，這裡設置也可以 只是.bold的文字框會出現
  const WEATHER_API_KEY = '4bc0bdc182672cf685b0e5ba29d18ffd'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=zh_tw&units=metric&appid=${WEATHER_API_KEY}`

  // pexel API
  const auth = '563492ad6f9170000100000168f1fdf86c1844deadad76d5a6ea9039'
  const searchUrl = `https://api.pexels.com/v1/search?query=${location}&per_page=20`

  const searchPhoto = async (searchUrl) => {
    const dataFetch = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth,
      },
    })
    let parseData = await dataFetch.json()
    console.log(parseData)
    // 排查如果圖片找不到就不要找 photos.src.....
    if (parseData.photos.length === 0) {
      return
    } else {
      // photoURL = parseData.photos[Math.floor(Math.random() * parseData.photos.length)] => photoURL = "https://..."
      setPhotoURL(
        //console.log(parseData);
        parseData.photos[Math.floor(Math.random() * parseData.photos.length)] // 圖片隨機 不然會固定同一張
        // parseData.photos[0]
      )
    }
  }
  // console.log(cityName);
  // console.log(typeof photoURL);
  // console.log(photoURL)
  // console.log(photoURL.photos[0].src.large2x);

  // Enter事件-撈天氣資料+撈圖片資料
  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      // 天氣
      axios.get(url).then((response) => {
        setData(response.data ? response.data : null)
      })
      // 圖片
      searchPhoto(searchUrl)
      setLocation('')
    }
  }

  // input欄位 資料丟去 location跟searchLocation()去執行
  const getSearchValue = (e) => {
    console.log(e.target.value)
    setLocation(e.target.value) // => location = e.target.value
  }

  return (
    <div
      className="app"
      style={{
        background: `url(${
          photoURL.src
            ? photoURL.src.original
            : './assets/pexels-sasha-prasastika-2695391.jpg'
        })  no-repeat center center/cover`,
        backgroundColor: 'rgba(0, 0, 0, .4)',
      }}
    >
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={getSearchValue}
          //onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Location with Cap First Letter"
        />
      </div>
      {data.name !== undefined && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name ? data.name : null}</p>
            </div>
            <div className="temp">
              <h1>{data.main ? data.main.temp.toFixed(1) : null}°C</h1>
            </div>
            <div className="description">
              <p>
                {data.weather
                  ? data.weather[0].description.toUpperCase()
                  : null}
              </p>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              <p className="bold">
                {data.main ? data.main.feels_like.toFixed(1) : null}°C
              </p>
            </div>
            <div className="humidity">
              <p>Humidity</p>
              <p className="bold">{data.main ? data.main.humidity : null}</p>
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              <p className="bold">{data.wind ? data.wind.speed : null}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
