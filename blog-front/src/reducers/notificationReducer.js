const notificationReducer = (state = "", action) => {
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
