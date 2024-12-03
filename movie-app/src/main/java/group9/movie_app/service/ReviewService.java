package group9.movie_app.service;

import group9.movie_app.dto.ReviewDTO;
import group9.movie_app.entity.Movie;
import group9.movie_app.entity.Review;
import group9.movie_app.entity.User;
import group9.movie_app.repository.MovieRepository;
import group9.movie_app.repository.ReviewRepository;
import group9.movie_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;

    public List<ReviewDTO> getReviews(int movieId) {
        Optional<Movie> movie = movieRepository.findById(movieId);

        List<Review> reviews = reviewRepository.findByMovie(movie.orElseThrow());

        return reviews.stream()
                .map(review -> new ReviewDTO(
                        review.getReviewId(),
                        review.getUser().getName(),
                        review.getMovie().getTitle(),
                        review.getReviewBody(),
                        review.getCreatedTime()
                ))
                .collect(Collectors.toList());
    }


    public Review addReview(int movieId, String reviewBody) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = Review.builder()
                .movie(movie)
                .user(user)
                .reviewBody(reviewBody)
                .createdTime(LocalDateTime.now())
                .build();

        return reviewRepository.save(review);
    }

    public void deleteReview(String reviewId) {
        reviewRepository.deleteById(reviewId);
    }

}