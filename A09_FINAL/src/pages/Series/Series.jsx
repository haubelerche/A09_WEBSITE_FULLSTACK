import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import { getSeries } from "../../Service/movieService.js";
import "./series.scss";
import Footer from "../../components/Footer/Footer.jsx";
import Hamburger from "../../components/Menu/Hamburger.jsx";

const Series = () => {
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const seriesData = await getSeries(); // Fetch series data
                if (Array.isArray(seriesData)) {
                    setSeries(seriesData); // Ensure valid data is set
                } else {
                    throw new Error("Unexpected series data format");
                }
            } catch (error) {
                setError("Failed to load series. Please try again later.");
                console.error("Error fetching series:", error);
            }
        };

        fetchSeries();
    }, []);

    // Split movies into chunks for grid layout
    const chunkMovies = (movies, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < movies.length; i += chunkSize) {
            chunks.push(movies.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const rows = chunkMovies(series, 5); // 5 movies per row

    return (
        <div className="series">
            <div className="header">
                <div className="hamburgerContainer">
                    <Hamburger />
                </div>
                <h1 className="seriesTitle">Our Series</h1>
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

export default Series;