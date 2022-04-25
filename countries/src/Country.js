import React from 'react'
import axios from 'axios'
import { useEffect } from "react"
import { useState } from 'react'

export const Country = ({country}) => {
  const [temperature,setTemperature] = useState("")
  const [icon,setIcon] = useState("")
  const [wind,setWind] = useState()
  const languages = []
  for(let l in country.languages){
      languages.push(country.languages[l])
  }
  useEffect(()=>{
      const promise = axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + country.name.common + "&appid=4517b7137373eb93c8b5f61849b8f94a&units=metric")
      promise.then(response => {
          setTemperature(response.data.main.temp)
          setIcon("https://openweathermap.org/img/wn/" + response.data.weather[0].icon + ".png")
          setWind(response.data.wind.speed)
      },[])
  })
  return (
    <div>
        <h1>{country.name.common}</h1>
        <br></br>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <br></br>
        <h2>languages:</h2>
        <ul>
        {languages.map(language=>
            <li>{language}</li>
        )}
        </ul>
        <img src={country.flags.png}></img>
        <h2>Weather in {country.name.common}</h2>
        <p>temperature {temperature} celcius</p>
        <img src={icon}></img>
        <p>wind {wind} m/s</p>
    </div>
  )
}
