import React from 'react'
import { Country } from './Country'
import { useState } from "react"

const Countries = ({countries,setCountries}) => {
    if(countries.length > 10){
        return <div>Too many matches, specify another filter</div>
    } else if(countries.length > 1){
        return (
            <ul>
                {countries.map((country,i)=>{
                    return <li key={i} >{country.name.common} <button onClick={()=> setCountries([country])}>show</button></li>
                })}
            </ul>
        )
    } else if(countries.length == 1){
        return <Country country={countries[0]}></Country>
    } else{
        return null
    }
}

export default Countries