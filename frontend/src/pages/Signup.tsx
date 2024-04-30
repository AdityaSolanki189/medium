import { Quote } from "../components/Misc/Quote"
import { SignupForm } from "../components/Auth/SignupForm"

export const Signup = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SignupForm/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}
