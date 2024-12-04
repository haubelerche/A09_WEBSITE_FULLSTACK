import React, { useState, useEffect } from "react";
import "./hamburger.scss";
import { Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Hamburger = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // tam dac cua hau hu hu hu
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:8080/movies-app/user-admin/role", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch role");
                    }
                    return response.json();
                })
                .then((data) => {
                    setIsAdmin(data.role === "ADMIN");
                })
                .catch((error) => {
                    console.error("Error fetching role:", error);
                });
        }
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
                    {isAdmin ? (
                        <>
                            <Link to="/admin/film-management" className="link" onClick={() => setIsSidebarOpen(false)}>
                                <span>Manage Films</span>
                            </Link>
                            <Link to="/admin/series-management" className="link" onClick={() => setIsSidebarOpen(false)}>
                                <span>Manage Series</span>
                            </Link>
                            <Link to="/admin/report-details" className="link" onClick={() => setIsSidebarOpen(false)}>
                                <span>Report Details</span>
                            </Link>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hamburger;
