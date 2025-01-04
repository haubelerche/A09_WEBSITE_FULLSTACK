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





    @Query(value = "SELECT * FROM Movie m WHERE m.views IS NOT NULL ORDER BY m.views DESC LIMIT :limit", nativeQuery = true)
    List<Movie> findTopMoviesByViewsLimit(@Param("limit") int limit);

    @Query(value = "SELECT * FROM Movie m WHERE m.views IS NOT NULL ORDER BY m.views ASC LIMIT :limit", nativeQuery = true)
    List<Movie> findLeastMoviesByViewsLimit(@Param("limit") int limit);

    @Query(value = "SELECT * FROM Movie m WHERE m.releaseDate IS NOT NULL ORDER BY m.releaseDate DESC LIMIT :limit", nativeQuery = true)
    List<Movie> findTopMoviesByRecentRelease(@Param("limit") int limit);

    @Query(value = "SELECT * FROM Movie m WHERE m.releaseDate IS NOT NULL ORDER BY m.releaseDate ASC LIMIT :limit", nativeQuery = true)
    List<Movie> findTopMoviesByOldestRelease(@Param("limit") int limit);

    //TOP THE LOAI BY REVIEWS
    @Query(value = "SELECT m.genres AS genre, SUM(m.views) AS total_views " +
            "FROM Movie m " +
            "WHERE m.genres IS NOT NULL AND m.views IS NOT NULL " +
            "GROUP BY m.genres " +
            "ORDER BY total_views DESC LIMIT 5", nativeQuery = true)
    List<Object[]> findTopGenresByViews();

    //TOP GENRES BY WISHLIST
    @Query(value = "SELECT m.genres AS genre, COUNT(w.wishlistId) AS wishlist_count " +
            "FROM Movie m " +
            "LEFT JOIN Wishlist w ON m.movieId = w.movieId " +
            "WHERE m.genres IS NOT NULL " +
            "GROUP BY m.genres " +
            "ORDER BY wishlist_count DESC LIMIT 5", nativeQuery = true)
    List<Object[]> findTopGenresByWishlist();

    //
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

    @Query("SELECT m FROM Movie m WHERE m.movieId IN :movieIds")
    List<Movie> findMoviesByIds(@Param("movieIds") List<Integer> movieIds);
}