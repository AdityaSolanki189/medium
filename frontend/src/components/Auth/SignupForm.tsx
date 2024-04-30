import { Link } from "react-router-dom";
import { LabelledInput } from "../Misc/LabelledInput";
import { useState } from "react";
import { SignupInput } from "@adi_solanki21/medium-common-module";

export const SignupForm = () => {

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });

    return(
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10"> 
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-slate-500 flex justify-center pt-2">
                            Already have an account?
                            <Link className="pl-2 underline hover:to-indigo-700" to={"/signin"}>Login</Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        <LabelledInput 
                            label="Name"
                            placeholder="your name here"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value,
                                });
                            }}
                        />
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
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-8 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
                    </div>
                        
                </div>
            </div>
        </div>
    );
}
