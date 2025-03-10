import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, RTE, Button } from "./index";
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addPost, updatePost } from "../store/postSlice";

function PostForm({post}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState(false);
    const { handleSubmit, register, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
        }
    })
    const userId = useSelector((state) => state.authReducers.userData?.$id);

    const handle = async (data) => {
        setError(false);
        if(post)
        {
            const { title, content } = data;
            let fileData = null;
            let image = post.image;
            if(data.image.length)   fileData = data.image[0];
            if(fileData){
                const file = await appwriteService.uploadFile(fileData);
                if(!file)
                {
                    setError(true);
                    return;
                }
                image = file.$id;
                const deleteFileResponse = await appwriteService.deleteFile(post.image);
                if(!deleteFileResponse){
                    setError(true);
                    return;
                }                
            }
            post = await appwriteService.updatePost(post.$id, {title, content, image});
            if(!post)
            {
                setError(true);
                return;
            }
            dispatch(updatePost(post));
            navigate(`/post/${post.$id}`);
        }
        else
        {
            const { title, content, image } = data;
            const file = await appwriteService.uploadFile(image[0]);
            if(!file) {
                setError(true);
                return;
            }
            const fileId = file.$id;
            const document = await appwriteService.createPost({title, content, fileId, userId});
            if(!document){
                setError(true);
                return;
            }
            dispatch(addPost(document));
            navigate(`/post/${document.$id}`);
        }
    }

    const [url, setUrl] = useState();
    if(post){
        function getUrl()
        {
            appwriteService.getFilePreview(post.image)
                            .then((result) => setUrl(result));
        }
        useEffect(() => {
            getUrl();
        }, [])
    }

    return(
        <form onSubmit={handleSubmit(handle)}>
            <div className="w-full h-full bg-zinc-300 text-black text-base">
                <div className="flex flex-wrap gap-10 justify-around">
                    <div className="w-3/5">
                        <Input
                        label="title:"
                        className="mb-4"
                        {...register("title", {
                            required: true
                        })}
                        />
                        <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                    <div>
                        <Input 
                        className="mb-4 w-[5px]"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image",{
                            required: {post}
                        })}
                        />
                        {post && (
                            <div className="w-full mb-4">
                                <img
                                    src={url}
                                    alt={post.title}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <Button type="submit" className="text-white">{post?"update":"submit"}</Button>
                {error && <p>unsuccessful...</p>}            
            </div>
        </form>
    );
}

export default PostForm;