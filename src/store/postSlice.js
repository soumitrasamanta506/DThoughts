import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        putPosts: (state, action)=>{
            state.posts = action.payload.documents;
        },
        addPost: (state, action) => {
            const post = action.payload;
            state.posts.push(post);
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map((post) => post.$id===action.payload.$id ? ({...post, ...action.payload}) : post);
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.$id != action.payload);
        }
    }
});

export default postSlice.reducer;

export const { putPosts, addPost, updatePost, deletePost } = postSlice.actions;