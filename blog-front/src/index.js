import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import {Provider} from "react-redux"
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";

const store = configureStore({reducer: combineReducers({message: notificationReducer, blogs: blogReducer})},applyMiddleware(thunk))

ReactDOM.createRoot(document.getElementById("root")).render(<Provider store={store}><App /></Provider>);
