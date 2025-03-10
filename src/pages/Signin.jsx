import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Signin } from "../components/index";

function SigninPage(){
    const navigate = useNavigate();
    const user = useSelector((state) => state.authReducers.userData);
    useEffect(() => {
        if(user)    navigate("/");
    }, [])
    return(
        <div>
            <Signin />
        </div>
    )
};

export default SigninPage;