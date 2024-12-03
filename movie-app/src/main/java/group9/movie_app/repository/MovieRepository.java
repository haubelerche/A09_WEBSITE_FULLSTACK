package group9.movie_app.repository;

import group9.movie_app.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
    List<Movie> findByGenresContainingIgnoreCase(String genre);
    List<Movie> findByActorsContainingIgnoreCase(String actor);
    List<Movie> findByDirectorContainingIgnoreCase(String director);
    List<Movie> findByTypeContainingIgnoreCase(String type);

    @Query(value = "SELECT * FROM Movie m ORDER BY m.views DESC LIMIT :limit", nativeQuery = true)
    List<Movie> findTopMoviesByViewsLimit(@Param("limit") int limit);

    @Query(value = "SELECT * FROM Movie m ORDER BY m.views ASC LIMIT :limit", nativeQuery = true)
    List<Movie> findLeastMoviesByViewsLimit(@Param("limit") int limit);

    @Query(value = "SELECT * FROM Movie m ORDER BY m.releaseDate DESC LIMIT :limit", nativeQuery = true)
    List<Movie> findTopMoviesByRecentRelease(@Param("limit") int limit);

    @Query(value = "SELECT * FROM Movie m ORDER BY m.releaseDate ASC LIMIT :limit", nativeQuery = true)
    List<Movie> findTopMoviesByOldestRelease(@Param("limit") int limit);

    @Query(value = "SELECT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(m.genres, ',', n.n), ',', -1)) AS genre, " +
            "SUM(m.views) AS total_views " +
            "FROM Movie m " +
            "JOIN (SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7) n " +
            "ON n.n <= LENGTH(m.genres) - LENGTH(REPLACE(m.genres, ',', '')) + 1 " +
            "GROUP BY genre " +
            "ORDER BY total_views DESC",
            nativeQuery = true)
    List<Object[]> findTopGenresByViews();

    @Query("SELECT m, COUNT(r) AS reviewCount " +
            "FROM Review r JOIN r.movie m " +
            "GROUP BY m.movieId " +
            "ORDER BY reviewCount DESC")
    List<Object[]> findTopMoviesByReviews();

    @Query("SELECT m, COUNT(w) AS wishlistCount " +
            "FROM Wishlist w JOIN w.movie m " +
            "GROUP BY m.movieId " +
            "ORDER BY wishlistCount DESC")
    List<Object[]> findTopMoviesByWishlist();

    @Query("SELECT m, COUNT(r) AS reviewCount " +
            "FROM Movie m LEFT JOIN Review r ON m.movieId = r.movie.movieId " +
            "GROUP BY m.movieId " +
            "ORDER BY reviewCount ASC")
    List<Object[]> findLeastReviewedMovies();

    @Query("SELECT m, COUNT(w) AS wishlistCount " +
            "FROM Movie m LEFT JOIN Wishlist w ON m.movieId = w.movie.movieId " +
            "GROUP BY m.movieId " +
            "ORDER BY wishlistCount ASC")
    List<Object[]> findLeastWishlistMovies();
}