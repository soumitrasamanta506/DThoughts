import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Signup } from "../components/index";

function SignupPage(){
    const navigate = useNavigate();
    const user = useSelector((state) => state.authReducers.userData);
    useEffect(() => {
        if(user)    navigate("/");
    }, [])
    return(
        <div className="h-full w-full">
            <Signup />
        </div>
    )
};

export default SignupPage;