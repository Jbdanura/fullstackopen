import { useState, useEffect} from 'react'
import React from 'react';
import { Filter } from './Filter';
import PersonForm from "./PersonForm"
import { Persons } from "./Persons"
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState("")
  const [filter, setNewFilter] = useState("")

  useEffect(() => {
    const promise = axios.get("http://localhost:3001/persons")
    promise.then(response => {
      const persons = response.data
      setPersons(persons)
    }
    )
    
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    for(let i= 0; i < persons.length; i++){
      if (persons[i].name == newName){
        alert(newName + " is already added to the phonebook")
        return
      }
    }
    setPersons([...persons, {name: newName, number: newPhone}])
    setNewPhone("")
    setNewName("")
  }
  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <Filter handleFilter={handleFilter}/>
      <form>
        <div>
          <h1>add a new</h1>
          <PersonForm newName={newName} newPhone={newPhone} handlePhoneChange={handlePhoneChange} handleInputChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}></Persons>
    </div>
  )
}

export default App