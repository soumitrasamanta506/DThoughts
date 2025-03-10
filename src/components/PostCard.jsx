import React, {useState, useEffect} from "react";
import { Link } from "react-router";
import appwriteService from "../appwrite/config"; 

function PostCard({title, fileId, documentId}){
    const [url, setUrl] = useState();
    async function geturl(){
        await appwriteService.getFilePreview(fileId).then((result) => setUrl(result));
    }
    useEffect(() => {
        geturl();
    }, [])

    return(
        <Link to={`/post/${documentId}`}>
            <div className='w-72 h-60 bg-gray-100 rounded-xl p-4 mr-3 mb-3 overflow-hidden'>
                <div className='w-full h-2/3 justify-center mb-4 overflow-hidden'>
                    <img src={url} alt={title}
                    className="rounded-xl" />

                </div>
                <h2
                className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;