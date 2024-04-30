import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL_DEV } from "../utils/config";
import { IBlog } from "../models/BlogsView";
import { Appbar } from "../components/Misc/Appbar";
import { Loading } from "../components/Misc/Loading";
import { FullBlog } from "../components/Blog/FullBlog";

export const Blog = () => {
    const [blog, setBlog] = useState<IBlog>();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const { id } = useParams();

    const fetchBlog = useCallback(async () => {
        setIsFetching(true);
        try {
            const response = await axios(`${BACKEND_URL_DEV}/api/v1/blog/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            if(response.status === 200 && response.data){
                console.log(response.data);
                setBlog(response.data);
            } else {
                console.error(response.statusText);
            }
            
        } catch (error) {
            console.error(error);
        }
        setIsFetching(false);
    }, [id])

    useEffect(() => {
        fetchBlog();
    }, [fetchBlog]);

    return(
        <div>
            <Appbar/>
            { isFetching && (<Loading/>)}
            { !isFetching && blog && (
                <div className="flex justify-center">
                    <FullBlog
                        blog={blog}
                    />
                </div>
            )}
        </div>
    )
}