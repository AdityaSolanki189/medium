import { useEffect, useState } from "react"
import { BlogCard } from "../components/Blog/BlogCard"
import { IBlog } from "../models/BlogsView";
import axios from "axios";
import { BACKEND_URL_DEV } from "../utils/config";
import { Appbar } from "../components/Misc/Appbar";
import { BlogSkeleton } from "../components/Blog/BlogSkeleton";

export const Blogs = () => {
    const [blogs, setBlogs] = useState<IBlog[]>();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const fetchBlogs = async () => {
        setIsFetching(true);
        try {
            const token = localStorage.getItem('token');

            const response = await axios(`${BACKEND_URL_DEV}/api/v1/blog/bulk`, {
                method: 'GET',
                headers: {
                    Authorization: `${token}`
                }
            });
            setIsFetching(false);
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
                    <div className="flex justify-center" key={blog.id}>
                        <div className="w-10/12 lg:w-6/12">
                            <BlogCard
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"N/A"}
                            />
                        </div>
                    </div>
                )
            })
        }
    }

    const showBlogSkeleton = () => {
        return (
            <div className="flex justify-center items-center flex-col">
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
            </div>
        )
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div>
            <Appbar/>
            { isFetching ? showBlogSkeleton() : showAllBlogs() }
        </div>
    )
}
