package group9.movie_app.service;

import group9.movie_app.entity.Movie;
import group9.movie_app.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReportService {
    @Autowired
    private final MovieRepository movieRepository;

    public List<Movie> getTopMoviesByViews(int limit) {
        return movieRepository.findTopMoviesByViewsLimit(limit);
    }

    public List<Movie> getLeastMoviesByViews(int limit) {
        return movieRepository.findLeastMoviesByViewsLimit(limit);
    }

    //
    public List<Movie> getTopMoviesByRecentRelease(int limit) {
        return movieRepository.findTopMoviesByRecentRelease(limit);
    }
    //
    public List<Movie> getTopMoviesByOldestRelease(int limit) {
        return movieRepository.findTopMoviesByOldestRelease(limit);
    }
    //

    public List<Map<String, Object>> getTopMoviesByReviews(int limit) {
        List<Object[]> results = movieRepository.findTopMoviesByReviews();
        return mapResultsToResponse(results, limit);
    }


    public List<Map<String, Object>> getTopMoviesByWishlist(int limit) {
        List<Object[]> results = movieRepository.findTopMoviesByWishlist();
        return mapResultsToResponse(results, limit);
    }

    public List<Map<String, Object>> getLeastReviewedMovies(int limit) {
        List<Object[]> results = movieRepository.findLeastReviewedMovies();
        return mapResultsToResponse(results, limit);
    }

    public List<Map<String, Object>> getLeastWishlistMovies(int limit) {
        List<Object[]> results = movieRepository.findLeastWishlistMovies();
        return mapResultsToResponse(results, limit);
    }

    private List<Map<String, Object>> mapResultsToResponse(List<Object[]> results, int limit) {
        List<Map<String, Object>> response = new ArrayList<>();
        for (int i = 0; i < Math.min(results.size(), limit); i++) {
            Object[] result = results.get(i);
            Movie movie = (Movie) result[0];
            Long count = (Long) result[1];
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("movieId", movie.getMovieId());
            map.put("title", movie.getTitle());
            map.put("releaseDate", movie.getReleaseDate());
            map.put("posterLink", movie.getPosterLink());
            map.put("genres", movie.getGenres());
            map.put("views", movie.getViews());
            map.put("count", count);
            response.add(map);
        }
        return response;
    }

    public Map<String, Long> getTopGenresViews() {
        List<Object[]> results = movieRepository.findTopGenresByViews();
        Map<String, Long> map = new LinkedHashMap<>();

        for (Object[] result : results) {
            String genre = (String) result[0];
            BigDecimal countValue = (BigDecimal) result[1];

            // Handle null values gracefully
            Long count = (countValue != null) ? countValue.longValue() : 0L;

            map.put(genre, count);
        }

        return map;
    }

    public Map<String, Long> getTopGenresByWishlist() {
        List<Object[]> results = movieRepository.findTopGenresByWishlist();
        Map<String, Long> map = new LinkedHashMap<>();
        for (Object[] result : results) {
            String genre = (String) result[0];
            Long count = (Long) result[1];
            map.put(genre, count);
        }
        return map;
    }
}