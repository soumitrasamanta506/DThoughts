import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";

function Footer(){

    return(
        <footer className="w-full bg-gray-900 text-white py-2">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo Section */}
                <div>
                    <img src={logo} alt="logo" className="h-8 w-auto mb-1" />
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4">
                    <Link to="https://www.linkedin.com/in/soumitra-samanta-7aa119230/">
                        <img src={linkedin} alt="Linkedin" className="h-5 w-5 hover:opacity-80" />
                    </Link>
                    <Link to="https://github.com/soumitrasamanta506">
                        <img src={github} alt="Github" className="h-5 w-5 hover:opacity-80" />
                    </Link>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-1 text-center border-t border-gray-700 pt-2">
                <p className="text-sm">&copy; 2025 DThoughts. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;