import { useSelector } from 'react-redux'

const AnecdoteList = ({filter,vote}) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filtered = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return (
        <div className="anecdotes">
        {filtered.map(anecdote => 
              <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div> 
            )
            }
          
        </div>
    )
}

export default AnecdoteList