import React, { useRef, useState } from "react";
import "./list.scss";
import MovieCard from "../MovieCard/MovieCard";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

const List = ({ title, movies }) => {
    const listRef = useRef(null);
    const [slideIndex, setSlideIndex] = useState(0);

    const moviesPerView = 5;
    const maxSlides = Math.max(Math.ceil(movies.length / moviesPerView) - 1, 0);

    const handleClick = (direction) => {
        if (direction === "left" && slideIndex > 0) {
            setSlideIndex((prev) => prev - 1);
        } else if (direction === "right" && slideIndex < maxSlides) {
            setSlideIndex((prev) => prev + 1);
        }

        if (listRef.current) {
            const distance = slideIndex * (moviesPerView * 260);
            listRef.current.style.transform = `translateX(-${distance}px)`;
        }
    };

    return (
        <div className="list">
            <span className="listTitle">{title}</span>
            <div className="wrapper">
                {movies.length === 0 ? (
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
                            className={`sliderArrow right ${slideIndex === maxSlides && "disabled"}`}
                            onClick={() => handleClick("right")}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default List;