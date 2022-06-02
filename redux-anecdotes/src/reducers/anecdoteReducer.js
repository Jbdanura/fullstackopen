import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.newAnecdote(content)
    dispatch({
      type: "ADD",
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INITIALIZE",
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
      type: "VOTE",
      data: {
        id: id,
      }
    })
  }
}


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case "INITIALIZE":{
      return action.data
    }
    case "VOTE": {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
       ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case "ADD":{
      return [...state, action.data]
    }

    case "ORDER":{
      let orderedState = state
      for(let i = 0; i < orderedState.length; i++){
        for(let j = i; j < orderedState.length; j++){
          if(orderedState[j].votes >= orderedState[i].votes){
            const aux = orderedState[j]
            orderedState[j] = orderedState[i]
            orderedState[i] = aux
          }
        }
      }
      return orderedState
    }
    default:
      return state
  }
}

export default anecdoteReducer