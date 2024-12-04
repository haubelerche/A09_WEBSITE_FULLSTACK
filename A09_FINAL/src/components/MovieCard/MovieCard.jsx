import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./moviecard.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


const MovieCard = ({ movie, onRemoveFromWishlist }) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const [wishlistItemId, setWishlistItemId] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch("http://localhost:8080/movies-app/user/wishlist", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch wishlist");

                const data = await response.json();
                const wishlistItem = data.find((item) => item.movie.movieId === movie.movieId);

                if (wishlistItem) {
                    setIsFavourite(true);
                    setWishlistItemId(wishlistItem.wishlistId);
                } else {
                    setIsFavourite(false);
                    setWishlistItemId(null);
                }
            } catch (error) {
                console.error("Failed to fetch wishlist:", error);
            }
        };

        fetchWishlist();
    }, [movie.movieId]);

    // Thêm phim vào wishlist
    const addToWishlist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/movies-app/user/wishlist/${movie.movieId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) throw new Error("Failed to add to wishlist");

            const addedItem = await response.json();
            setIsFavourite(true);
            setWishlistItemId(addedItem.wishlistId);
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    // Xóa phim khỏi wishlist
    const removeFromWishlist = async () => {
        try {
            if (!wishlistItemId) throw new Error("No wishlist item ID found");

            const response = await fetch(`http://localhost:8080/movies-app/user/wishlist/${wishlistItemId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) throw new Error("Failed to remove from wishlist");

            setIsFavourite(false);
            setWishlistItemId(null); // x óa ID khỏi trạng thái
            if (onRemoveFromWishlist) {
                onRemoveFromWishlist(movie.movieId); // cập nhật danh sách wishlist trong WishList
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    // Toggle yêu thích
    const toggleFavourite = (e) => {
        e.stopPropagation(); // Ngăn sự kiện lan lên
        if (isFavourite) {
            removeFromWishlist();
        } else {
            addToWishlist();
        }
    };

    // điều hướng tới trang xem phim
    const handleClick = () => {
        navigate(`/movie/${movie.movieId}`, { state: { movie } });
    };

    return (
        <div className="movieCard" onClick={handleClick}>
            <img
                className="moviePoster"
                src={movie.posterLink || "https://via.placeholder.com/300x450"}
                alt={`${movie.title || "Movie"} Poster`}
            />
            <div className="movieInfo">
                <h3 className="movieTitle">{movie.title}</h3>
                <p className="movieReleaseDate">{movie.releaseDate}</p>
            </div>
            <div
                className="favouriteIcon"
                onClick={toggleFavourite}
            >
                {isFavourite ? (
                    <FavoriteIcon className="favourite filled" />
                ) : (
                    <FavoriteBorderIcon className="favourite outlined" />
                )}
            </div>

        </div>
    );
};

export default MovieCard;