const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const createAnecdote = (content) => {
  return {
    type: "ADD",
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: {
      id: id,
    }
  }
}



const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
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
          if(orderedState[j].votes > orderedState[i].votes){
            const aux = orderedState[j]
            orderedState[j] = orderedState[i]
            orderedState[i] = aux
          }
        }
      }
    }
    default:
      return state
  }
}

export default anecdoteReducer