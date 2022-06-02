import axios from "axios"
import { getId } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = async (content) => {
  const object = {content, id: getId(), votes:0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async(id)=>{
  const anecdotes = await getAll()
  const anecdote = anecdotes.find(n => n.id === id)
  const response = await axios.put(baseUrl + "/" + id, {content: anecdote.content, id: id, votes: anecdote.votes + 1})
  return response.data
}

export default {getAll,newAnecdote, voteAnecdote}