import { useSelector, useDispatch } from 'react-redux'
import {createAnecdote, voteAnecdote,initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { newMessage } from './reducers/notificationReducer'
import Notification from './components/Notification'
import { useEffect, useState } from 'react'



const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const [filter, setFilter] = useState("")
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(initializeAnecdotes())
    dispatch({type:"ORDER"})
  },[])

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(newMessage("you voted " + anecdote.content, 5000))
    dispatch({type:"ORDER"})
  }

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(content))
    dispatch(newMessage("you created " + content, 5000))
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
