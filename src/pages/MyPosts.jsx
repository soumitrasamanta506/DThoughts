import React from "react";
import { useSelector } from "react-redux";
import { AuthLayout, PostCard } from "../components/index";

function MyPosts(){
    const userId = useSelector((state) => state.authReducers.userData?.$id);
    const posts = useSelector((state) => state.postReducers.posts).filter((post) => post.userId === userId);

    return(
        <AuthLayout>
            <div className="w-full h-full">
                {
                    posts.length > 0 ? (
                        <div className="flex flex-wrap justify-start">
                            {
                                posts.map((post) => (
                                    <div key={post.$id}>
                                        <PostCard title={post.title} fileId={post.image} documentId={post.$id} />
                                    </div>
                                ))
                            }
                        </div>
                        ) : (<h2>No Post available</h2>)
                }
            </div>
        </AuthLayout>
    )
}

export default MyPosts;