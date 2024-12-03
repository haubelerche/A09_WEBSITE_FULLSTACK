import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Watch from "./pages/Watch/Watch.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Service/AuthContext.js";
import Film from "./pages/Film/Film.jsx";
import Series from "./pages/Series/Series.jsx";
import WishList from "./pages/WishList/WishList.jsx";
import ChangePass from "./components/ChangePass/ChangePass.jsx";

const App = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Home />} />
                <Route path="/register" element={!isAuthenticated ? <Register /> : <Home />} />
                <Route path="/movie/:movieId" element={<Watch />} />
                <Route path="/film" element={<Film />} />
                <Route path="/series" element={<Series />} />
                <Route path="/wishlist" element={<WishList />} />
               <Route path="/setting" element={<ChangePass />} />
            </Routes>
        </Router>
    );
};

export default App;