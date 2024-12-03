import React, { useState } from "react";
import "./searchBar.scss";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        try {
            const response = await fetch(
                `http://localhost:8080/movies-app/find/${searchTerm}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
    };

    const handleCardClick = (movieId) => {
        navigate(`/watch/${movieId}`);
    };

    return (
        <div className="searchBarContainer">
            <div className="searchInputWrapper">
                <input
                    type="text"
                    placeholder="Search by title, genre, actor or director..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="searchResults">
                {searchResults.length > 0 ? (
                    <div className="moviesGrid">
                        {searchResults.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={() => handleCardClick(movie.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="noResults">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchBar;