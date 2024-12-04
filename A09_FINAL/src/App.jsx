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
import FilmManagement from "./pages/FilmManagement/FilmManagement.jsx"
import SeriesManagement from "./pages/SeriesManagement/SeriesManagement.jsx";
import ReportDetails from "./pages/ReportDetails/ReportDetails.jsx";

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
                <Route path="/admin/film-management" element={<FilmManagement/>} />
                <Route path="/admin/series-management" element={<SeriesManagement/>} />
                <Route path="/admin/report-details" element={<ReportDetails/>} />
            </Routes>
        </Router>
    );
};

export default App;


//this website was created by noobs so there's a lot of redundant stuffs I know, but still didn't want to delete 'em...