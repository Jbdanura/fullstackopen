import React from 'react'
import { CoursePart } from '../types'

const Content = ({courseParts} : {courseParts:CoursePart[]}):JSX.Element => {
  return (
    <div>
        {courseParts.map(course=>{
          switch(course.type){
            case "normal":
              return <div><h1>{course.name} {course.exerciseCount}</h1><p>This is the {course.type} course part</p></div>
            case "groupProject":
              return <div><h1>{course.name} {course.exerciseCount}</h1><p>project exercises {course.groupProjectCount}</p></div>
            case "submission":
              return <div>
                  <h1>{course.name} {course.exerciseCount}</h1>
                  <p>{course.description}</p>
                  <p>submit to {course.exerciseSubmissionLink}</p>
                </div>
            case "special":
              return <div>
                  <h3>{course.name} {course.exerciseCount}</h3>
                  <p>{course.description}</p>
                  <p>required skills: {course.requirements.map(skill=>{
                     return <span key={skill}>{skill} </span>
                  })}</p>
                </div>
            default:
              break;
          }
        })}
    </div>
  )
}

export default Content