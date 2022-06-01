const AnecdoteForm = (props) => {
    return (
        <div className="form">
            <h2>create new</h2>
            <form onSubmit={props.add}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm