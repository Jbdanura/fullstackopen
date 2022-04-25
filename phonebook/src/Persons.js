import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Person } from './Person'

export const Persons = (props) => {
  const [deleted,setDeleted] = useState("")

  return (
    <ul>{props.persons.map((person) => {
        return person.name.toLowerCase().includes(props.filter) ?
        <Person person={person} handleDelete={props.handleDelete} key={person.id}/>: null
      }
    )}
    </ul>
  )
}
