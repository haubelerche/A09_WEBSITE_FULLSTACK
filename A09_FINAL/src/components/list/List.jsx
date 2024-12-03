import React, { useRef, useState, useEffect } from "react";
import "./list.scss";
import MovieCard from "../MovieCard/MovieCard";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

const List = ({ title }) => {
    const listRef = useRef(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [slideIndex, setSlideIndex] = useState(0);

    const moviesPerView = 5;
    const maxSlides = Math.max(Math.ceil(16 / moviesPerView) - 1, 0); // Giới hạn hiển thị tối đa 16 phim

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:8080/movies-app/list", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch movies. HTTP status: ${response.status}`);
                }

                const data = await response.json();
                setMovies(data.slice(0, 16)); // Lấy tối đa 16 phim từ danh sách
            } catch (err) {
                console.error("Error fetching movies:", err.message);
                setError(err.message || "Failed to load movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleClick = (direction) => {
        if (direction === "left" && slideIndex > 0) {
            setSlideIndex((prev) => prev - 1);
        } else if (direction === "right" && slideIndex < maxSlides) {
            setSlideIndex((prev) => prev + 1);
        }

        if (listRef.current) {
            const distance = slideIndex * (moviesPerView * 200);
            listRef.current.style.transform = `translateX(-${distance}px)`;
        }
    };

    return (
        <div className="list">
            <span className="listTitle">{title || "Movies"}</span>
            <div className="wrapper">
                {loading ? (
                    <p>Loading movies...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : movies.length === 0 ? (
                    <p>No movies available.</p>
                ) : (
                    <>
                        <ArrowBackIosOutlined
                            className={`sliderArrow left ${slideIndex === 0 && "disabled"}`}
                            onClick={() => handleClick("left")}
                        />

                        <div className="container" ref={listRef}>
                            {movies.map((movie) => (
                                <MovieCard key={movie.movieId} movie={movie} />
                            ))}
                        </div>

                        <ArrowForwardIosOutlined
                            className={`sliderArrow right ${
                                slideIndex === maxSlides && "disabled"
                            }`}
                            onClick={() => handleClick("right")}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default List;