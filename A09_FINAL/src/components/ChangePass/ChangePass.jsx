import React, { useState } from "react";
import "./changePass.scss";

import Hamburger from "../Menu/Hamburger.jsx";

const ChangePass = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match!");
            return;
        }

        // doi mat khauu
        fetch("http://localhost:8080/movies-app/user-admin/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ oldPassword, newPassword }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Password changed successfully!");
                } else {
                    return response.text().then((text) => {
                        throw new Error(text);
                    });
                }
            })
            .catch((error) => alert(`Failed to change password: ${error.message}`));
    };

    return (
        <div className="change-pass">

                <div className="hamburger-container">
                    <Hamburger/>
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <h1>Change Password</h1>
                        <input
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit">Change Password</button>
                    </form>
                </div>

        </div>
    );
};

export default ChangePass;