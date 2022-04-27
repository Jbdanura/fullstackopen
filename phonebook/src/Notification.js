import React from 'react'

export const Notification = ({message}) => {
  if(message == null){
      return null
  }else if(message == "success"){  
      return <div className="success">Added succesfully</div>
  } else {
      return <div className="error">{message.charAt(0).toUpperCase() + message.slice(1)}</div>
  }
}
