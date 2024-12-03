package group9.movie_app.dto;

import group9.movie_app.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishlistDTO {
    private String wishlistId;
    private Movie movie;
}