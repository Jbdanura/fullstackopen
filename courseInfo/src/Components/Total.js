import React from 'react'

const Total = ({course}) => {
  const parts = course.parts
  const exercises = parts.reduce((accumulator,current) => accumulator + current.exercises, 0)
  return (
    <h2>total of {exercises} exercises</h2>
  )
}

export default Total