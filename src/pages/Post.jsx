import React, {useState, useEffect} from "react";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/index";
import { deletePost } from "../store/postSlice";

function Post(){
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.authReducers.userData?.$id || null);

    function getPost(){
        const allPosts = useSelector((state) => state.postReducers.posts);
        for(let i=0; i<allPosts.length; i++)
            if(allPosts[i].$id === postId)  return allPosts[i];
    }

    const post = getPost();
    const [url, setUrl] = useState();
    const isAuthor = (userId===post.userId);

    function getUrl(){
        if(post)
            appwriteService.getFilePreview(post.image)
                .then((result) => setUrl(result));
        
    }
    useEffect(() => {
        getUrl();
    }, [])

    const deletePostHandle = () => {
        const statusFile = appwriteService.deleteFile(post.image);
        if(!statusFile) return;
        const statusPost = appwriteService.deletePost(post.$id);
        if(!statusPost) return;
        dispatch(deletePost(post.$id));
        navigate("/my-posts");
    }
    return post ? (
        <div className="p-8">
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <img src={url}
                    alt={post.title}
                    className="border rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                className="mr-3 bg-freen-500"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                            className="bg-red-500"
                            onClick={deletePostHandle}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <div className="flex justify-center">

                        <h1 className="text-sm text-black bg-yellow-900">
                            {post.title}
                        </h1>
                    </div>
                </div>
                <div className="browser-css text-black text-justify">
                    {parse(post.content)}
                </div>
        </div>
    ) : null
}

export default Post;