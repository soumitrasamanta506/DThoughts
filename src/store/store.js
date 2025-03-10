import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice";
import postReducers from "./postSlice";

export default configureStore({
    reducer: {
        authReducers,
        postReducers
    }
})