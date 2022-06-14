import blogService from "../services/blogs";
import { newMessage } from "../reducers/notificationReducer";

export const initializeBlogs = () => {
    return async dispatch => {

        const blogs = await blogService.getAll()
        console.log("blogs:" + blogs);
        dispatch({
            type: "INITIALIZE",
            blogs
        })
    }
}

export const addBlog = (title,author,url) => {
    return async dispatch => {
        blogService.create({ title, author, url }).then((response) => {
            dispatch(newMessage("Successfully created " + title  + " by " + author));
            setTimeout(() => {
              dispatch(newMessage(""));
            }, 4000);
            dispatch({
                type:"ADD",
                blog: response
            })
          });
    }
}

export const likeBlog = (title,likes) => {
    return async dispatch => {
        blogService.like(title,likes).then((response) => {
            dispatch({
                type:"LIKE",
                title
            })
        });
    }
}

export const removeBlog = (title) =>{
    return async dispatch => {
        blogService.remove(title).then((response) => dispatch({type:"REMOVE",title}));
    }
}

const blogReducer = (state = [], action) => {
    switch(action.type){
        case "INITIALIZE":{
            return action.blogs
        }
        case "ADD":{
            return [...state,action.blog]
        }
        case "LIKE":{
            const blog = state.find(b => b.title === action.title)
            const changedBlog = {
                ...blog, likes : blog.likes + 1
            }
            return state.map(b => b.title !== action.title ? b : changedBlog )
        }
        case "REMOVE":{
            return state.filter(b => b.title !== action.title)
        }
        default:
            return state
    }
}

export default blogReducer