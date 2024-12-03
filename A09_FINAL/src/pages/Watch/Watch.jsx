import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./watch.scss";
import { ArrowBack } from "@material-ui/icons";
import Review from "../../components/Review/Review.jsx";

const Watch = () => {
    const { movieId } = useParams(); // Extract movieId from route parameters
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigation function

    // Fetch movie details and increase view count
    useEffect(() => {
        const fetchAndIncreaseViews = async () => {
            try {
                // Fetch movie details and increase views
                const response = await fetch(`http://localhost:8080/movies-app/movie/${movieId}/view`, {
                    method: "PUT", // Sử dụng PUT để tăng lượt xem
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching movie: ${response.status}`);
                }

                const fetchedMovie = await response.json();
                setMovie(fetchedMovie); // Update movie state with fetched data
            } catch (err) {
                console.error("Error fetching movie:", err);
                setError("Failed to fetch movie details.");
            }
        };

        fetchAndIncreaseViews();
    }, [movieId]);

    // Handle error state
    if (error) {
        return <div className="error">{error}</div>;
    }

    // Handle loading state
    if (!movie) {
        return <div className="loading">Loading movie details...</div>;
    }

    return (
        <div className="watch">
            <div className="returnArrow" onClick={() => navigate(-1)}>
                <ArrowBack />
            </div>

            <div className="videoContainer">
                <iframe
                    src={movie.trailerLink}
                    title={movie.title}
                    allowFullScreen
                    className="videoPlayer"
                ></iframe>
            </div>

            <div className="movieDetails">
                <div className="infoGrid">
                    <div className="infoBlock">
                        <h3>Directed by</h3>
                        <p>{movie.director}</p>
                    </div>
                    <div className="infoBlock">
                        <h3>Release Date</h3>
                        <p>{movie.releaseDate}</p>
                    </div>
                    <div className="infoBlock">
                        <h3>Starring</h3>
                        <p>{movie.actors}</p>
                    </div>
                    <div className="infoBlock">
                        <h3>Views</h3>
                        <p>{movie.views} views</p> {/* Hiển thị số lượt xem */}
                    </div>
                </div>
                <hr />
                <div className="description">
                    <p>{movie.description}</p>
                </div>
            </div>

            <Review movieId={movieId} />
        </div>
    );
};

export default Watch;