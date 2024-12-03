import React, { useState, useEffect } from "react";
import "./hamburger.scss"; // Create this SCSS file for styling
import { Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Hamburger = ({ isAuthenticated }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest(".sidebar") && !event.target.closest(".hamburger-btn")) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isSidebarOpen]);

    return (
        <div className="hamburger">
            <button className="hamburger-btn" onClick={toggleSidebar}>
                <Menu />
            </button>
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-content">
                    <Link to="/" className="link" onClick={() => setIsSidebarOpen(false)}>
                        <span>Home</span>
                    </Link>
                    <Link to="/film" className="link" onClick={() => setIsSidebarOpen(false)}>
                        <span>Films</span>
                    </Link>
                    <Link to="/series" className="link" onClick={() => setIsSidebarOpen(false)}>
                        <span>Series</span>
                    </Link>
                        <Link to="/wishlist" className="link" onClick={() => setIsSidebarOpen(false)}>
                                <span>WishList</span>
                            </Link>
                            <Link to="/setting" className="link" onClick={() => setIsSidebarOpen(false)}>
                                <span>Setting</span>
                            </Link>
                </div>
            </div>
        </div>
    );
};

export default Hamburger;