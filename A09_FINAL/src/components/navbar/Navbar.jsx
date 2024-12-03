import React, { useContext,useEffect, useState } from "react";
import "./navbar.scss";
import logo from "../../images/logo.png";
import one from "../../images/one.png";
import two from "../../images/two.png";
import three from "../../images/three.png";
import four from "../../images/four.png";
import five from "../../images/five.png";
import avatar from "../../images/avatar.png";
import { ArrowDropDown, Menu } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {AuthContext} from "../../Service/AuthContext.js";

import Hamburger from "../../components/Menu/Hamburger.jsx";

const images = [
    `url(${one})`,
    `url(${two})`,
    `url(${three})`,
    `url(${four})`,
    `url(${five})`
];

const Navbar = () => {
    const [backgroundImage, setBackgroundImage] = useState(images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate
    const { isAuthenticated, dispatch } = useContext(AuthContext);

    const handleSignOut = () => {
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        setBackgroundImage(images[currentIndex]);
    }, [currentIndex]);

    const [searchResults, setSearchResults] = useState([]);
    const handleSearchResults = (results) => {
        setSearchResults(results);
        console.log("Search results:", results);
    };
    return (
        <div className="navbar" style={{ backgroundImage }}>
            <div className="container">
                <div className="left">
                    {isAuthenticated && <Hamburger />}
                </div>

                <div className="center">
                    <img className="logo" src={logo} alt="logo" style={{ width: "180px", height: "180px" }} />
                </div>

                <div className="right">

                    {!isAuthenticated ? (
                        <>
                            <div className="auth-btn">
                                <div className="dropdown">
                                    <ArrowDropDown className="icon dropdown-icon" />
                                    <div className="dropdown-content">
                                        <span onClick={() => navigate("/login")}>Sign in</span>
                                        <span onClick={() => navigate("/register")}>Sign up</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="profile">
                            <ArrowDropDown className="icon dropdown-icon"/>
                            <div className="options dropdown-content">
                            <span onClick={handleSignOut}>Sign out</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;