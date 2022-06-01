const notificationReducer = (state = "", action) => {
    console.log('state now: ', state)
    console.log('action', action)
    if(action.type === "NEW"){
        return action.message
    }
    return state
}

export const newMessage = (message) => {
    return {
        type: "NEW",
        message
    }
}

export default notificationReducer