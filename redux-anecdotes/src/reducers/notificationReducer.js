const notificationReducer = (state = "", action) => {
    console.log('state now: ', state)
    console.log('action', action)
    if(action.type === "NEW"){
        return action.message
    }
    return state
}

let timeOut = null

export const newMessage = (message, ms) => {
    return async dispatch =>{

        dispatch({
            type: "NEW",
            message
        })
        if(timeOut){
            clearTimeout(timeOut)
        }
        timeOut = setTimeout(()=>{
            dispatch({
                type:"NEW",
                message: ""
            })
        },ms)
    }
}

export default notificationReducer