import React from 'react'

export const Statistics = ({good,neutral,bad}) => {
  const feedback = good + neutral + bad
  if (feedback != 0){
    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <tr>
                        <td>good</td>
                        <td>{good}</td>
                    </tr>
                    <tr>
                        <td>neutral</td>
                        <td>{neutral}</td>
                    </tr>
                    <tr>
                        <td>bad</td>
                        <td>{bad}</td>
                    </tr>
                    <tr>
                        <td>all</td>
                        <td>{feedback}</td>
                    </tr>
                    <tr>
                        <td>average</td>
                        <td>{Math.round((feedback / 3) * 100) / 100}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td>{Math.round((good / feedback) * 100) / 100}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
  } else {
    return (
        <div>
            <h1>statistics</h1>
            <div>No feedback given</div>
        </div>
    )
  }

}
