import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { AuthLayout, PostForm } from "../components/index";

function EditPost()
{
    const { postId } = useParams();
    const posts = useSelector((state) => state.postReducers.posts);
    function getPost()
    {
        for(let i=0; i<posts.length; i++)
        {
            if(posts[i].$id === postId)
                return posts[i];
        }
    }
    const post = getPost();
    return (
        <AuthLayout>
            <PostForm post={post}/>
        </AuthLayout>
    );
}

export default EditPost;