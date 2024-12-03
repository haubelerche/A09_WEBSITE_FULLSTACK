import { useState, useRef } from "react";
import "./register.scss";
import logo from "../../images/logo.png";
import { register } from "../../Service/apiCalls.js";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

const Register = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nameRef = useRef();
    const navigate = useNavigate();

    const handleStart = (e) => {
        e.preventDefault();
        const enteredName = nameRef.current.value.trim();
        if (!enteredName) {
            alert("Name cannot be empty!");
            return;
        }
        setName(enteredName); // Lưu tên vào state
        setEmail(""); // Xóa giá trị email nếu có
        setPassword(""); // Xóa giá trị password nếu có
        setStep(2); // Chuyển sang bước tiếp theo
    };

    const handleFinish = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Email and password are required!");
            return;
        }

        try {
            // Gọi API đăng ký
            const res = await register({ name, email, password });
            alert(res.message || "Registration successful!");
            localStorage.setItem("token", res.token);
            navigate("/login"); // Chuyển tới trang Login sau khi đăng ký thành công
        } catch (err) {
            console.error("Register failed:", err.response?.data || err);
            alert(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <ArrowBack className="return-icon" onClick={() => navigate("/")} />
                    <img className="logo" src={logo} alt="logo" style={{ width: "140px", height: "140px" }} />
                </div>
            </div>
            <div className="container">
                <h1>Xin chào, we're Group 09</h1>
                <h2>Our cinematic world is waiting for you!</h2>
                <p>Enter your details to create an account.</p>
                {step === 1 ? (
                    <form className="input" onSubmit={handleStart}>
                        <input
                            type="text"
                            placeholder="Name"
                            ref={nameRef}
                            required
                        />
                        <button type="submit" className="registerButton">
                            Next
                        </button>
                    </form>
                ) : (
                    <form className="input" onSubmit={handleFinish}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email} // Quản lý giá trị email
                            onChange={(e) => setEmail(e.target.value)} // Cập nhật email
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password} // Quản lý giá trị password
                            onChange={(e) => setPassword(e.target.value)} // Cập nhật password
                            required
                        />
                        <button type="submit" className="registerButton">
                            Sign up
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;