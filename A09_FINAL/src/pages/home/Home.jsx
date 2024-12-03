import React, {useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import "./home.scss";
import Footer from "../../components/Footer/Footer.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
const Home = () => {
    const [upcomingMovies] = useState([]);
    const [trendingMovies] = useState([]);
    const [mustSeeMovies] = useState([]);


    return (
        <div className="home">
            <Navbar />
                <SearchBar />
                <div className="content">
                    <List title="Upcoming" movies={upcomingMovies}/>
                    <List title="Trending Now" movies={trendingMovies}/>
                    <List title="Must-See Classics" movies={mustSeeMovies}/>

            </div>
            <Footer/>
        </div>
            );
            };

            export default Home;