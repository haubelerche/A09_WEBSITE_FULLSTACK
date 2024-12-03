import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import { getFilm } from "../../Service/movieService.js";
import "./film.scss";
import Footer from "../../components/Footer/Footer.jsx";
import Hamburger from "../../components/Menu/Hamburger.jsx";

const Film = () => {
    const [film, setFilm] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const filmData = await getFilm(); // Fetch film data
                if (Array.isArray(filmData)) {
                    setFilm(filmData); // Ensure valid data is set
                } else {
                    throw new Error("Unexpected film data format");
                }
            } catch (error) {
                setError("Failed to load film. Please try again later.");
                console.error("Error fetching film:", error);
            }
        };

        fetchFilm();
    }, []);

    // Split movies into chunks for grid layout
    const chunkMovies = (movies, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < movies.length; i += chunkSize) {
            chunks.push(movies.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const rows = chunkMovies(film, 5); // 5 movies per row

    return (
        <div className="film">
            <div className="header">
                <div className="hamburgerContainer">
                    <Hamburger />
                </div>
                <h1 className="filmTitle">Our Film</h1>
            </div>
            <div className="content">
                {error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div className="gridContainer">
                        {rows.map((row, rowIndex) => (
                            <div className="gridRow" key={rowIndex}>
                                {row.map((movie) => {
                                    if (!movie || !movie.movieId) {
                                        console.error("Invalid movie object:", movie);
                                        return null;
                                    }
                                    return (
                                        <MovieCard
                                            key={movie.movieId} // Ensure unique key
                                            movie={{
                                                movieId: movie.movieId,
                                                title: movie.title,
                                                posterLink: movie.posterLink,
                                                releaseDate: movie.releaseDate,
                                            }} // Pass only required props
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Film;