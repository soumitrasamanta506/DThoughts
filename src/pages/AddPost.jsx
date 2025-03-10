import React from "react";
import { AuthLayout, PostForm } from "../components/index";

function AddPost()
{
    return(
        <div>
            <AuthLayout>
                <PostForm />
            </AuthLayout>
        </div>
    );
}

export default AddPost;