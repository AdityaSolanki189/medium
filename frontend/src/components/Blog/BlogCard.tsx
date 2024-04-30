import { UserAvatar } from "../Misc/UserAvatar";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <div className="p-4 border-b border-slate-200 pb-4">
            <div className="flex justify-left">
                <UserAvatar name={authorName}/>
                <div className="flex justify-center flex-col text-m font-bold px-2">{authorName}</div>
                <div className="flex justify-center flex-col text-m text-gray-500"> • {publishedDate}</div> 
            </div>
            <div className="py-2 text-2xl font-extrabold text-gray-900">
                {title}
            </div>
            <div className="py-2 font-semibold text-l">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="py-4 font-light text-sm">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    )
}
