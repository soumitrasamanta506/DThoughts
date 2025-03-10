import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthLayout({children})
{
    const userId = useSelector((state) => state.authReducers.userData);
    const navigate = useNavigate();
    useEffect(() => {
        if(!userId) navigate("/signin");
    }, [])
    return(<div>{children}</div>);

}

export default AuthLayout;