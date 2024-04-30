import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "../Misc/LabelledInput";
import { SigninInput } from "@adi_solanki21/medium-common-module";
import { useState } from "react";
import { BACKEND_URL_PROD } from "../../utils/config";
import axios from "axios";

export const SigninForm = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: "",
    });

    async function handleSignin() {
        console.log(postInputs);
        try {
            const response = await axios.post(`${BACKEND_URL_PROD}/api/v1/user/signin`, postInputs);
            if(response.data.token && response.status === 200){
                console.log(response.data);
                const jwt = response.data.token;
                localStorage.setItem("token", jwt);
                navigate("/blogs");
            } else if(response.status === 400){
                alert(response.statusText);
                console.error(response.data);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again later.");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10 flex justify-center flex-col"> 
                        <div className="text-3xl font-extrabold">
                            Login to your account
                        </div>
                        <div className="text-slate-500 flex justify-center pt-2">
                            New Here?
                            <Link className="pl-2 underline hover:to-indigo-700" to={"/signup"}>Create an account</Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        <LabelledInput 
                            label="Email"
                            type="email"
                            placeholder="your email here"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setPostInputs({
                                    ...postInputs,
                                    email: e.target.value,
                                });
                            }}
                        />
                        <LabelledInput 
                            label="Password"
                            type="password"
                            placeholder="your password here"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-8 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={handleSignin}>Sign In</button>
                    </div>
                        
                </div>
            </div>
        </div>
    );
}
