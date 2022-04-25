import React from 'react'

export const Persons = (props) => {
  return (
    <ul>{props.persons.map(person => {
        return person.name.toLowerCase().includes(props.filter) ?
        <li key={person.name}>{person.name} {person.number}</li> : ""
      }
    )}
    </ul>
  )
}
