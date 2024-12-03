package group9.movie_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieRequest {
    private String title;
    private Date releaseDate;
    private String trailerLink;
    private String posterLink;
    private String director;
    private String actors;
    private String description;
    private String genres;
    private String type;
}