package group9.movie_app.controller;

import group9.movie_app.dto.WishlistDTO;
import group9.movie_app.entity.Wishlist;
import group9.movie_app.repository.WishlistRepository;
import group9.movie_app.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies-app")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class WishlistController {
    private final WishlistService wishlistService;
    //used
    @GetMapping("/user/wishlist")
    public List<WishlistDTO> getAllWishlists() {
        return wishlistService.getWishlist();
    }
    //used
    @PostMapping("/user/wishlist/{movieId}")
    public ResponseEntity<Wishlist> addWishlist(@PathVariable("movieId") int movieId) {
        return ResponseEntity.ok(wishlistService.addWishlist(movieId));
    }
//used
    @DeleteMapping("/user/wishlist/{wishlistId}")
    public ResponseEntity<String> deleteWishlist(@PathVariable("wishlistId") String wishlistId) {
        try {
            wishlistService.removeWishlist(wishlistId);
            return ResponseEntity.ok("Wishlist item removed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Wishlist item not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to remove wishlist item: " + e.getMessage());
        }
    }
}