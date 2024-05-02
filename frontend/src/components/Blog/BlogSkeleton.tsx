export const BlogSkeleton = () => {
    return(
        <div className="animate-pulse w-4/12 py-4">
            <div className="flex">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div> 
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            </div>
            <div className=" font-thin pt-4">
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
            </div>
        </div>
    );
}
