import React, { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../Service/AuthContext.js";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { login } from "../../Service/apiCalls.js";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({ email, password }, dispatch);
            navigate("/");
        } catch (err) {
            console.error("Login failed:", err);
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            alert(errorMessage);
        }
    };
    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <ArrowBack
                        className="return-icon"
                        onClick={() => navigate("/")}
                    />
                    <img className="logo" src={logo} alt="logo" style={{width: "140px", height: "140px"}}/>
                </div>
            </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />


                            <button type="submit">Login</button>

                            <small>This page is protected by Group 09.</small>
                            <p className="signup-link">
                                New to A09?{" "}
                                <Link to="/register" className="sign-up">
                                    Sign up now
                            </Link>
                        </p>
                    </form>
                </div>
        </div>
    );
};
export default Login;