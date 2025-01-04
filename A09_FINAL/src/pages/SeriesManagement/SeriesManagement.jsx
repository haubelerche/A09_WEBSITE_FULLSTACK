import React, { useState, useEffect } from "react";
import Hamburger from "../../components/Menu/Hamburger.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "./seriesManagement.scss";

const SeriesManagement = () => {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [formValues, setFormValues] = useState({
        title: "",
        releaseDate: "",
        trailerLink: "",
        posterLink: "",
        director: "",
        actors: "",
        description: "",
        genres: "",
        views:""
    });

    const token = localStorage.getItem("token");

    // Fetch danh sách phim
    const fetchMovies = async () => {
        try {
            const response = await fetch("http://localhost:8080/movies-app/series", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Fetch movies response status:", response.status);
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch movies: ${response.status} - ${errorMessage}`);
            }

            const data = await response.json();
            console.log("Fetched movies:", data); // Thêm log
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    // Xử lý thay đổi trong form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Xử lý thêm phim (Add)
    const handleAddMovie = async () => {
        try {
            const response = await fetch("http://localhost:8080/movies-app/admin/addmovie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to add movie: ${errorMessage}`);
            }

            fetchMovies(); // Làm mới danh sách phim
            setShowModal(false); // Đóng modal
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    // Xử lý cập nhật phim (Update)
    const handleUpdateMovie = async () => {
        try {
            const url = `http://localhost:8080/movies-app/admin/movie/${currentMovie.movieId}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to update movie: ${errorMessage}`);
            }

            fetchMovies(); // Làm mới danh sách phim
            setShowModal(false); // Đóng modal
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };

    // Mở modal thêm phim
    const handleOpenAddModal = () => {
        setCurrentMovie(null); // Xóa dữ liệu của phim đang chỉnh sửa
        setFormValues({
            title: "",
            releaseDate: "",
            trailerLink: "",
            posterLink: "",
            director: "",
            actors: "",
            description: "",
            genres: "",
            type:""
        });
        setShowModal(true);
    };

    // Mở modal chỉnh sửa phim
    const handleOpenEditModal = (movie) => {
        setCurrentMovie(movie);
        setFormValues(movie);
        setShowModal(true);
    };

    // Xóa phim
    const handleDeleteMovie = async (movieId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/movies-app/admin/movie/${movieId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete movie: ${errorMessage}`);
            }

            fetchMovies(); // Làm mới danh sách phim sau khi xóa
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    return (
        <div className="series-management-wrapper">
            <div className="series-management">
                <header className="series-management-header ">
                    <div className="hamburger-container">
                        <Hamburger/>
                    </div>
                    <h1>Series Management</h1>
                    <button className="btn btn-primary" onClick={handleOpenAddModal}>
                        Add
                    </button>
                </header>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Director</th>
                        <th>Genres</th>
                        <th>Views</th>

                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie, index) => (
                        <tr key={movie.movieId}>
                            <td>{index + 1}</td>
                            <td>{movie.title}</td>
                            <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                            <td>{movie.director}</td>
                            <td>{movie.genres}</td>
                            <td>{movie.views}</td>
                            <td>{movie.type}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleOpenEditModal(movie)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteMovie(movie.movieId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Add/Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentMovie ? "Edit Movie" : "Add Movie"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formValues.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="releaseDate">
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="releaseDate"
                                value={formValues.releaseDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="trailerLink">
                            <Form.Label>Trailer Link</Form.Label>
                            <Form.Control
                                type="link"
                                name="trailerLink"
                                value={formValues.trailerLink}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="posterLink">
                            <Form.Label>Poster Link</Form.Label>
                            <Form.Control
                                type="link"
                                name="posterLink"
                                value={formValues.posterLink}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="director">
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                type="text"
                                name="director"
                                value={formValues.director}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="genres">
                            <Form.Label>Genres</Form.Label>
                            <Form.Control
                                type="text"
                                name="genres"
                                value={formValues.genres}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formValues.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={1}
                                name="type"
                                value={formValues.type}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    {currentMovie ? (
                        <Button variant="primary" onClick={handleUpdateMovie}>
                            Update
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleAddMovie}>
                            Add
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );
};

export default SeriesManagement;