package group9.movie_app.controller;

import group9.movie_app.dto.ReviewDTO;
import group9.movie_app.entity.Review;
import group9.movie_app.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("movies-app")
public class ReviewController {
    private final ReviewService reviewService;

    //Reviews của 1 phim
    @GetMapping("/reviews/{movieId}")
    public List<ReviewDTO> getMovieReview(@PathVariable("movieId") int movieId) {
        return reviewService.getReviews(movieId);
    }
    //Thêm review
    @PostMapping("/user/reviews/{movieId}")
    public Review addReview(@PathVariable int movieId,
                            @RequestBody Map<String, String> request) {
        String reviewBody = request.get("reviewBody");
        return reviewService.addReview(movieId, reviewBody);
    }
    //Xóa review
    @DeleteMapping("/user-admin/reviews/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable String reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok("Deleted review");
    }

}
