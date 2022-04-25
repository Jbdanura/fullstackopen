import React from 'react'

const PersonForm = ({newName, newPhone, handlePhoneChange, handleInputChange}) => {
  return (
    <div>name: <input value={newName} onChange={handleInputChange} />
    phone: <input value={newPhone} onChange={handlePhoneChange}/></div>
  )
}


export default PersonForm