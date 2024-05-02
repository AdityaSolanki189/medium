import { Link } from "react-router-dom"
import { UserAvatar } from "./UserAvatar"

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            
            <div className="text-2xl flex justify-center items-center cursor-pointer">
                <Link to="/blogs"> 
                    Medium
                </Link>
            </div>
            
            <div className="flex justify-center flex-row items-center">
                <Link to="/publish">
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center">New</button>
                </Link>

                <UserAvatar name="Aditya" size={10}/>
            </div>
        </div>
    )
}
