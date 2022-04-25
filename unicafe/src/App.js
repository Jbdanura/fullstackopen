import React, { Component } from 'react';
import { useState } from 'react'
import { Statistics } from './Components/Statistics';
import Button from './Components/Button';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
         <h1>give feedback</h1>
         <Button value={() => setGood(good+1)} text="good"/>
         <Button value={() => setNeutral(neutral+1)} text="neutral"/>
         <Button value={() => setBad(bad+1)} text="bad"/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App