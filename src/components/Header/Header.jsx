import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "../index";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function Header(){
    const authStatus = useSelector((state) => state.authReducers.status);
    const navItems = [
        {
            name: "All Posts",
            slug: "/all-posts",
            status: true
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            status: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            status: authStatus
        },
        {
            name: "SignIn",
            slug: "/signin",
            status: !authStatus
        }
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signoutHandler = async () => {
        try{
            const response = await authService.logout();
            if(response)    dispatch(logout());
            navigate("/");
        }
        catch(error){
            console.log("logout :: ", error.message);
        }
    };

    return(
        <nav className="w-full bg-zinc-300 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo Section */}
                <div>
                <img src={logo} alt="logo" className="h-12 w-auto" />
                </div>

                {/* Navigation Items */}
                <div>
                    <ul className="flex space-x-6">
                        {navItems.map((item) =>
                        item.status ? (
                            <li key={item.slug}>
                                <Link to={item.slug}>
                                    <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    {item.name}
                                    </Button>
                                </Link>
                            </li>
                        ) : null
                        )}
                        {authStatus?(
                        <Button 
                        onClick={signoutHandler} 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                        Signout
                        </Button>
                        ):null}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;