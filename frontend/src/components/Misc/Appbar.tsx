import { UserAvatar } from "./UserAvatar"

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10">
            <div>
                Medium
            </div>
            <div>
                <UserAvatar name="Aditya"/>
            </div>
        </div>
    )
}
