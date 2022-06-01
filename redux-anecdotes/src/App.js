import { useSelector, useDispatch } from 'react-redux'
import {createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { newMessage } from './reducers/notificationReducer'
import Notification from './components/Notification'
import { useState } from 'react'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const [filter, setFilter] = useState("")
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    console.log(anecdote)
    dispatch(newMessage("you voted " + anecdote.content))
    dispatch({type:"ORDER"})
    setTimeout(()=>{
      dispatch(newMessage(""))
    },5000)
    
  }

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(content))
    dispatch(newMessage("you created " + content))
    setTimeout(()=>{
      dispatch(newMessage(""))
    },5000)
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      <div className="filter">
        <p>filter</p>
        <input name="filter" onChange={(event) => setFilter(event.target.value)}></input>
      </div>
      <Notification/>
      <AnecdoteList filter={filter} vote={vote}/>
      <AnecdoteForm add={add}/>
      </div>
  )
}

export default App
