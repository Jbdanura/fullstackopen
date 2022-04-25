import React from 'react'

export const Person = ({person,handleDelete}) => {
  return (
    <li style={{marginTop: "10px"}}>{person.name} {person.number}<button onClick={() => handleDelete(person)} style={{marginLeft: "10px"}}>Delete</button></li> 
  )
}
