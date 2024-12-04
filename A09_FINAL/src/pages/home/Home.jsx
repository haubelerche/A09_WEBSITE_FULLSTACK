import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import Footer from "../../components/Footer/Footer.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import "./home.scss";

const Home = () => {
    const [lists, setLists] = useState({
        recommendations: [],
        topReviewed: [],
        mostViewed: [],
        wishlist: [],
        recentReleases: [],
    });
    const [error, setError] = useState(null);

    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const headers = isLoggedIn
                    ? {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                    : { "Content-Type": "application/json" };

                const requests = [
                    fetch("http://localhost:8080/movies-app/top-reviews?limit=10", { headers }),
                    fetch("http://localhost:8080/movies-app/top-views?limit=10", { headers }),
                    fetch("http://localhost:8080/movies-app/top-wishlist?limit=10", { headers }),
                    fetch("http://localhost:8080/movies-app/top-recent-release?limit=10", { headers }),
                ];

                if (isLoggedIn) {
                    requests.push(
                        fetch("http://localhost:8080/movies-app/recommendations?limit=20", {
                            headers,
                        })
                    );
                }

                const responses = await Promise.all(requests);

                if (responses.some((res) => !res.ok)) {
                    throw new Error("Failed to fetch some data");
                }

                const [
                    topReviewed,
                    mostViewed,
                    wishlist,
                    recentReleases,
                    recommendations = [],
                ] = await Promise.all(responses.map((res) => res.json()));

                setLists({
                    recommendations,
                    topReviewed,
                    mostViewed,
                    wishlist,
                    recentReleases,
                });
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError(err.message || "Failed to load data. Please try again later.");
            }
        };

        fetchMovies();
    }, [isLoggedIn]);

    return (
        <div className="home">
            <Navbar />
            <SearchBar />
            <div className="content">
                {error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        {isLoggedIn && (
                            <List
                                title="Our Recommendations Today"
                                movies={lists.recommendations}
                            />
                        )}
                        <List
                            title="Top 10 Most-Popular Movies That Everyone Keeps Talking About"
                            movies={lists.topReviewed}
                        />
                        <List title="Top 10 Most-Viewed Movies" movies={lists.mostViewed} />
                        <List
                            title="Top 10 Movies Hot In Folks' WishLists"
                            movies={lists.wishlist}
                        />
                        <List
                            title="Top 10 Recent Released Movies"
                            movies={lists.recentReleases}
                        />
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Home;