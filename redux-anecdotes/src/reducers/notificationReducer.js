const notificationReducer = (state = "", action) => {
    console.log('state now: ', state)
    console.log('action', action)
    if(action.type === "NEW"){
        return action.message
    }
    return state
}

export const newMessage = (message, ms) => {
    return async dispatch =>{
        dispatch({
            type: "NEW",
            message
        })
        setTimeout(()=>{
            dispatch({
                type:"NEW",
                message: ""
            })
        },ms)
    }
}

export default notificationReducer