import { useEffect, useState } from "react"
import { BlogCard } from "../components/Blog/BlogCard"
import { IBlogs } from "../models/BlogsView";
import axios from "axios";
import { BACKEND_URL_DEV } from "../utils/config";
import { Appbar } from "../components/Misc/Appbar";

export const Blogs = () => {
    const [blogs, setBlogs] = useState<IBlogs[]>();

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios(`${BACKEND_URL_DEV}/api/v1/blog/bulk`, {
                method: 'GET',
                headers: {
                    Authorization: `${token}`
                }
            });
            if(response.status === 200 && response.data){
                console.log(response.data);
                setBlogs(response.data);
            } else {
                console.error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const showAllBlogs = () => {
        if(blogs){
            return blogs.map((blog) => {
                return (
                    <div className="flex justify-center">
                        <div className="max-w-xl">
                            <BlogCard
                                authorName={blog.authorId.slice(0, 5) + "..."}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={blog.published ? blog.published : "N/A"}
                            />
                        </div>
                    </div>
                )
            })
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div>
            <Appbar/>
            {showAllBlogs()}
        </div>
    )
}
