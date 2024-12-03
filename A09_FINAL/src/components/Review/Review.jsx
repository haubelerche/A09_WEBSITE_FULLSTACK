import React, { useState, useEffect } from "react";
import "./review.scss";

const Review = ({ movieId }) => {
    const [reviews, setReviews] = useState([]); // Danh sách tất cả bình luận
    const [newReview, setNewReview] = useState("");
    const [visibleReviews, setVisibleReviews] = useState(6); // Số lượng bình luận hiện tại đang hiển thị

    // Fetch reviews từ server
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8080/movies-app/reviews/${movieId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch reviews: ${response.status}`);
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [movieId]);

    // Xử lý thêm bình luận
    const handleAddReview = async () => {
        if (!newReview.trim()) {
            alert("Review cannot be empty!");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/movies-app/user/reviews/${movieId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ reviewBody: newReview }),
            });

            if (response.ok) {
                const addedReview = await response.json();
                setReviews((prevReviews) => [addedReview, ...prevReviews]);
                setNewReview("");
            } else {
                console.error("Failed to add review:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    // Xử lý hiển thị thêm 6 bình luận
    const handleShowMore = () => {
        setVisibleReviews((prev) => prev + 6); // Tăng số lượng bình luận hiển thị lên 6
    };

    return (
        <div className="review-section">
            <h2>Reviews</h2>

            {/* Danh sách bình luận */}
            <div className="review-list">
                {reviews.slice(0, visibleReviews).map((review) => (
                    <div key={review.reviewId} className="review-item">
                        <p>
                            <strong>{review.username}</strong>: {review.reviewBody}
                        </p>
                        <small>{new Date(review.createdTime).toLocaleString()}</small>
                    </div>
                ))}
            </div>

            {/* Nút hiển thị thêm bình luận */}
            {visibleReviews < reviews.length && (
                <button className="show-more-btn" onClick={handleShowMore}>
                    Nhấp để xem thêm bình luận cũ hơn
                </button>
            )}

            {/* Form thêm bình luận */}
            <div className="review-form">
                <textarea
                    placeholder="Write your review here..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                />
                <button onClick={handleAddReview}>Submit Review</button>
            </div>
        </div>
    );
};

export default Review;