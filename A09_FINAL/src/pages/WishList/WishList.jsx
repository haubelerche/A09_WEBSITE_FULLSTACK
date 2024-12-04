import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import Hamburger from "../../components/Menu/Hamburger.jsx";
import "./wishlist.scss";
import Footer from "../../components/Footer/Footer.jsx";

const WishList = () => {
    const [wishList, setWishList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch("http://localhost:8080/movies-app/user/wishlist", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch wishlist");
                }

                const data = await response.json();
                setWishList(data.filter((item) => item && item.movie));
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                setError("Failed to load wishlist. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);


    const handleRemoveFromWishlist = (movieId) => {
        setWishList((prev) => prev.filter((item) => item.movie.movieId !== movieId));
    };

    return (
        <div className="wishlist-page">
            <div className="header">
                <div className="hamburger-container">
                    <Hamburger />
                </div>
                <h2 className="heading">Your Wishlist Movies</h2>
                <span className="count-pill">
                {wishList.length === 1 ? `${wishList.length} movie` : `${wishList.length} movies`}
            </span>
            </div>

            <div className="container">
                {loading ? (
                    <h4 className="loading">Loading...</h4>
                ) : error ? (
                    <h4 className="error">{error}</h4>
                ) : wishList.length > 0 ? (
                    <div className="movie-grid">
                        {wishList.map((item) => (
                            <MovieCard
                                key={item.movie.movieId}
                                movie={item.movie}
                                onRemoveFromWishlist={handleRemoveFromWishlist}
                            />
                        ))}
                    </div>
                ) : (
                    <h4 className="no-movies">There are no movies in your wishlist. Add some!</h4>
                )}
            </div>

            <Footer />
        </div>
    );
};
export default WishList