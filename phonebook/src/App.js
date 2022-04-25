import { useState, useEffect} from 'react'
import React from 'react';
import { Filter } from './Filter';
import PersonForm from "./PersonForm"
import { Persons } from "./Persons"
import axios from 'axios';
import { Notification } from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState("")
  const [filter, setNewFilter] = useState("")
  const [message,setMessage] = useState()

  useEffect(() => {
    const promise = axios.get("http://localhost:3001/persons")
    promise.then(response => {
      const persons = response.data
      setPersons(persons)
    })
    
  })

  const addPerson = (e) => {
    e.preventDefault()
    const person = persons.filter(p => p.name == newName)[0]
    if(person){
      if(person.phone != newPhone){
        if(confirm(person.name + " is already added to the phonebook, replace the old number with a new one?")){
          axios.put("http://localhost:3001/persons/" + person.id, {name: person.name, number: newPhone}).then(()=>{
            const newPersons = persons
            setPersons(newPersons)
            setNewPhone("")
            setNewName("")
            
          })
        } return
      } else {
          alert(person.name + " is already added to the phonebook")
          return
      }
    }
    if(newName.length > 0){
      axios.post("http://localhost:3001/persons", {name: newName, number: newPhone}).then(()=>{
        setPersons([...persons, {name: newName, number: newPhone}])
        setNewPhone("")
        setNewName("")
        setMessage("success")   
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }

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
  const handleDelete = (person) => {  
    if (confirm("Delete " + person.name + "?")){
      try{
        axios.delete("http://localhost:3001/persons/" + person.id).then(()=>{
        const newPersons = persons.filter(p => p.id !== person.id)
        setPersons(newPersons)})
      } catch {
          setMessage("error")   
          setTimeout(() => {
            setMessage(null)
          }, 3000)
      }
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}></Persons>
    </div>
  )
}

export default App