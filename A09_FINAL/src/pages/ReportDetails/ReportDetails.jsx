import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Hamburger from "../../components/Menu/Hamburger.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportDetails = () => {
    const [genresViews, setGenresViews] = useState({});
    const [genresWishlist, setGenresWishlist] = useState({});
    const [leastWishlistMovies, setLeastWishlistMovies] = useState([]);
    const [leastReviewedMovies, setLeastReviewedMovies] = useState([]);
    const [oldMovies, setOldMovies] = useState([]);

    const adminToken = localStorage.getItem("token");

    useEffect(() => {
        if (!adminToken) {
            console.error("Admin token is missing. Ensure the user is authenticated.");
            return;
        }

        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    fetch("http://localhost:8080/movies-app/admin/genres-views?limit=19", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${adminToken}`,
                        },
                    }),
                    fetch("http://localhost:8080/movies-app/admin/genres-wishlist?limit=19", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${adminToken}`,
                        },
                    }),
                    fetch("http://localhost:8080/movies-app/admin/least-wishlist?limit=15", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${adminToken}`,
                        },
                    }),
                    fetch("http://localhost:8080/movies-app/admin/least-reviews?limit=15", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${adminToken}`,
                        },
                    }),
                    fetch("http://localhost:8080/movies-app/admin/top-oldest-release?limit=15", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${adminToken}`,
                        },
                    }),
                ]);

                const [
                    genresViewsData,
                    genresWishlistData,
                    leastWishlistMoviesData,
                    leastReviewedMoviesData,
                    oldMoviesData,
                ] = await Promise.all(responses.map((res) => res.json()));

                setGenresViews(genresViewsData || {});
                setGenresWishlist(genresWishlistData || {});
                setLeastWishlistMovies(leastWishlistMoviesData || []);
                setLeastReviewedMovies(leastReviewedMoviesData || []);
                setOldMovies(oldMoviesData || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [adminToken]);

    const renderChart = (data, title) => {
        if (!data || Object.keys(data).length === 0) {
            return <p className="text-center">No data available for {title}</p>;
        }

        return (
            <div className="col-md-6 mb-4">
                <h5 className="text-center">{title}</h5>
                <div style={{ height: "300px" }}>
                    <Bar
                        data={{
                            labels: Object.keys(data),
                            datasets: [
                                {
                                    label: "Count",
                                    data: Object.values(data),
                                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: "Genres",
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: "Count",
                                    },
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            </div>
        );
    };
    const handleAddToRecommendations = async (movieId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/movies-app/admin/recommendations/${movieId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add movie to recommendations");
            }
            alert("Movie added to recommendations successfully!");
        } catch (error) {
            console.error("Error adding movie to recommendations:", error);
        }
    };

    const renderTable = (data, title, columns) => (
        <div className="mt-4">
            <h5>{title}</h5>
            <table className="table table-striped">
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title || "N/A"}</td>
                        <td>{item.genres || "N/A"}</td>
                        <td>{item.releaseDate || "N/A"}</td>
                        <td>{item.count || item.director || "N/A"}</td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleAddToRecommendations(item.movieId)}
                            >
                                Push
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container-fluid">
            <header className="d-flex justify-content-between align-items-center p-3 bg-light">
                <Hamburger />
                <h4 className="text-center">Report Details</h4>
            </header>
            <div className="container mt-4">
                <div className="row">
                    {renderChart(genresViews, "Top Các Thể Loại Phim Hot Nhất Của Năm")}
                    {renderChart(genresWishlist, "Top Các Thể Loại Phim Được Thêm Vào Wishlist Nhiều Nhất")}
                </div>
                <hr />
                {renderTable(leastWishlistMovies, "Top 15 Phim Bị Đánh Giá Thấp Của Năm", [
                    "Stt",
                    "Title",
                    "Genres",
                    "Release Year",
                    "Wishlist Count",
                ])}
                <hr />
                {renderTable(leastReviewedMovies, "Top 15 Phim Ít Bình Luận Nhất ", [
                    "Stt",
                    "Title",
                    "Genres",
                    "Release Year",
                    "Review Count",
                ])}
                <hr />
                {renderTable(oldMovies, "Top 15 Phim Lâu Đời", [
                    "Stt",
                    "Title",
                    "Genres",
                    "Release Year",
                    "Director",
                ])}
            </div>
            <Footer />
        </div>
    );
};

export default ReportDetails;