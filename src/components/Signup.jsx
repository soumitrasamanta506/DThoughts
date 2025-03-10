import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { Button, Input } from "../components/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Signup(){
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors }} = useForm();
    const navigate = useNavigate();

    const handleSignup = async ({name, email, password, confirmPassword}) => {
        try{
            setError("");
            if(password !== confirmPassword)
            {
                setError("password & confirmPassword are different")
                return;
            }
            const user = await authService.createAccount({email, password, name});
            if(user)
            {
                navigate("/signin");
            }
            
            navigate("/");
        }
        catch(error){
            console.log("Signup :: ", error.message);
        }
    };

    return(
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-md">
            <div className="w-[225px] px-2 py-4 flex flex-col content-center justify-center bg-white text-black rouded-lg">
                <h3 className="text-blue-500 mb-[20px]">Create an account</h3>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <Input 
                    label="Name:"
                    placeholder="name"
                    className="text-black border-black outline-2 focus:outline-blue-700"
                    {...register("name", {
                        required: true
                    })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">write name</p>}
                    <Input 
                    label="Email:"
                    placeholder="email"
                    type="email"
                    className="text-black border-black outline-2 focus:outline-blue-700"
                    {...register("email", {
                        required: true
                    })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">write email</p>}
                    <Input 
                    label="password:"
                    placeholder="new password"
                    type="password"
                    className="text-black border-black outline-2 focus:outline-blue-700"
                    {...register("password", {
                        required: true,
                        minLength: 4
                    })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">write password</p>}
                    <Input 
                    label="Cofirm password:"
                    placeholder="confirm password.."
                    type="password"
                    className="text-black border-black outline-2 focus:outline-blue-700"
                    {...register("confirmPassword", {
                        required: true,
                        minLength: 4
                    })}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">confirm password</p>}
                    <Button 
                    type="submit"
                    className="text-white mt-[20px]"
                    >create</Button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;