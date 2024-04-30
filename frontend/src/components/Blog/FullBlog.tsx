import { IBlog } from "../../models/BlogsView";
import { UserAvatar } from "../Misc/UserAvatar";

export const FullBlog = ({blog} : {blog : IBlog}) => {

    return(
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
            <div className="col-span-8 px-10">
                <div className="text-5xl font-bold">
                    {blog.title}
                </div>
                <div className="pt-6 text-slate-600">
                    Posted on August 24, 2023
                </div>
                <div className="pt-2 text-lg">
                    {blog.content}
                </div>
            </div>
            <div className=" col-span-4">
                <div className="text-slate-600 text-lg">
                    Author
                </div>
                <div className="flex flex-row py-2">
                    <div className="pr-4 flex justify-center flex-col">
                        <UserAvatar name={blog.author.name || "Anonymous"} size={8}/>
                    </div>
                    <div className="">
                        <div className="text-xl font-bold flex flex-col justify-center">
                            {blog.author.name}
                        </div>
                        <div className="text-sm text-slate-500">
                            I love coding and writing blogs.
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
