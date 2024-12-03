package group9.movie_app.controller;

import group9.movie_app.entity.Movie;
import group9.movie_app.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("movies-app")
public class ReportController {
    private final ReportService reportService;
    // Hiện mặc định là 3, lựa chọn 5 nhập .../admin/least-reviews?limit=5
    @GetMapping("/top-views")
    public List<Movie> getTopMoviesByViews(@RequestParam(defaultValue = "3") int limit) {
        return reportService.getTopMoviesByViews(limit);
    }

    @GetMapping("/admin/least-views")
    public List<Movie> getLeastMoviesByViews(@RequestParam(defaultValue = "3") int limit) {
        return reportService.getLeastMoviesByViews(limit);
    }

    @GetMapping("/top-recent-release")
    public List<Movie> getTopMoviesByRecentRelease(@RequestParam(defaultValue = "3") int limit) {
        return reportService.getTopMoviesByRecentRelease(limit);
    }

    @GetMapping("/admin/top-oldest-release")
    public List<Movie> getTopMoviesByOldestRelease(@RequestParam(defaultValue = "3") int limit) {
        return reportService.getTopMoviesByOldestRelease(limit);
    }

    @GetMapping("/top-reviews")
    public ResponseEntity<List<Map<String, Object>>> getTopMoviesByReviews(
            @RequestParam(defaultValue = "3") int limit) {
        List<Map<String, Object>> movies = reportService.getTopMoviesByReviews(limit);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/admin/least-reviews")
    public ResponseEntity<List<Map<String, Object>>> getLeastReviewedMovies(
            @RequestParam(defaultValue = "3") int limit) {
        List<Map<String, Object>> movies = reportService.getLeastReviewedMovies(limit);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/top-wishlist")
    public ResponseEntity<List<Map<String, Object>>> getTopMoviesByWishlist(
            @RequestParam(defaultValue = "3") int limit) {
        List<Map<String, Object>> movies = reportService.getTopMoviesByWishlist(limit);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/admin/least-wishlist")
    public ResponseEntity<List<Map<String, Object>>> getLeastWishlistMovies(
            @RequestParam(defaultValue = "3") int limit) {
        List<Map<String, Object>> movies = reportService.getLeastWishlistMovies(limit);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/admin/genres-views")
    public Map<String, Long> getTopMoviesByGenres() {
        return reportService.getTopGenresViews();
    }
}