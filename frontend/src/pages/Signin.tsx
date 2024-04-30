import { SigninForm } from "../components/Auth/SigninForm"
import { Quote } from "../components/Misc/Quote"

export const Signin = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SigninForm/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}
