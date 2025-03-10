import React, {useState} from "react";
import { Input, Button } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Signin(){
    const [error, setError] = useState("");
    const { handleSubmit, register, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async({email, password}) => {
        setError("");
        try{
            const session = await authService.login({email, password});
            if(session)
            {
                const user = await authService.getCurrentUser();
                user.sessionId = session;
                if(user)
                    dispatch(login(user));
                navigate("/");
            }
        }
        catch(error){
            setError(error.message);
        }
    };

    return(
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-md">
            <div className="w-[225px] flex flex-col content-center justify-center px-2 py-4 bg-white text-black rounded-lg ">
                <h3 className="mb-[20px] text-blue-500">Sign in to your account</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <Input
                    label="Email:" 
                    placeholder="email" 
                    type="email"
                    className="text-black border-black outline-2 focus:outline-blue-700"
                    {...register("email", {
                        required: true
                    })}
                    />
                    {errors.email && <p className="text-red-500">Enter valid email</p>}
                    <Input 
                    label="Password:" 
                    placeholder="password" 
                    type="password"
                    className="text-black border-black outline-2 focus:outline-blue-700"
                    {...register("password", {
                        required: true,
                        minLength: 4
                    })} 
                    />
                    {errors.password && <p className="text-red-500">Enter valid password</p>} 
                    <Button
                    type="submit"
                    className="text-white mt-[20px]"
                    >login</Button>
                    {error && <p className="text-red-500">Email or password is incorrect</p>}
                </form>
                
                <div>
                    <p>don't have an account?</p>
                    <Link to="/signup">create an account</Link>
                </div>
            </div>
        </div>
    )
};

export default Signin;