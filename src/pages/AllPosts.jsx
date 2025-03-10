import React, {useState} from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../components/index";

function AllPosts(){
    const posts = useSelector((state) => state.postReducers.posts);
    return(
        <div className="w-full h-full">
            {
                posts!=undefined && posts.length > 0 ? (
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
    )
};

export default AllPosts;