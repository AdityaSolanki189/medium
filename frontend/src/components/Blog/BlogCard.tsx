import { Link } from "react-router-dom";
import { UserAvatar } from "../Misc/UserAvatar";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to= {`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 pb-4 cursor-pointer">
                <div className="flex">
                    <UserAvatar name={authorName}/>
                    <div className="flex justify-center flex-col text-m font-bold px-2">{authorName}</div>
                    <div className="flex justify-center flex-col text-m text-gray-500"> • {publishedDate}</div> 
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}
