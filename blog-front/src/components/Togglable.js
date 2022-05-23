import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
    const [visible,setVisible] = useState(false)

    const buttonNewNoteVisible = {display: visible ? "none" : ""}
    const formVisible = {display: visible ? "" : "none"} 

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
    })

    return (
        <div>
            <button onClick={toggleVisibility} id="new-blog-btn" style={buttonNewNoteVisible}>New note</button>
            <div style={formVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable