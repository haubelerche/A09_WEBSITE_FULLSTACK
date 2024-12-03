package group9.movie_app.controller;


import group9.movie_app.dto.MovieRequest;
import group9.movie_app.entity.Movie;
import group9.movie_app.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("movies-app")
public class MovieController {

    private final MovieService movieService;
    //Trang chủ
    @GetMapping("/list")
    public List<Movie> getMovies() {
        return movieService.getAllMovies();
    }
    //Tìm kiếm
    @GetMapping("/find/{keyword}")
    public List<Movie> findMovie(@PathVariable("keyword") String keyword) {
        List<Movie> movies = new ArrayList<>();
        movies.addAll(movieService.searchMoviesByTitle(keyword));
        movies.addAll(movieService.searchMoviesByGenre(keyword));
        movies.addAll(movieService.searchMoviesByActor(keyword));
        movies.addAll(movieService.searchMoviesByDirector(keyword));
        return movies;
    }
    //Trang phim cụ thể
    @GetMapping("/movie/{movieId}")
    public Movie getMovie(@PathVariable("movieId") int movieId) {
        return movieService.getMovieById(movieId);
    }
    //Trang phim lẻ
    @GetMapping("/film")
    public List<Movie> getFilms() {
        return movieService.searchMoviesByType("Film");
    }
    //Trang phim bộ
    @GetMapping("/series")
    public List<Movie> getSeries() {
        return movieService.searchMoviesByType("Series");
    }

    //Thêm phim
    @PostMapping("/admin/addmovie")
    public Movie addMovie(@RequestBody MovieRequest movieRequest) {
        return movieService.createMovie(movieRequest);
    }
    //Chỉnh sửa phim
    @PutMapping("/admin/movie/{movieId}")
    public Movie updateMovie(@PathVariable("movieId") int movieId,
                             @RequestBody MovieRequest request) {
        return movieService.updateMovie(movieId, request);
    }
    //Xóa phim
    @DeleteMapping("/admin/movie/{movieId}")
    public void deleteMovie(@PathVariable("movieId") int movieId) {
        movieService.deleteMovie(movieId);
    }

    @PutMapping("/movie/{movieId}/view")
    public ResponseEntity<Movie> increaseViews(@PathVariable int movieId) {
        try {
            Movie updatedMovie = movieService.getMovieById(movieId);
            return ResponseEntity.ok(updatedMovie);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
