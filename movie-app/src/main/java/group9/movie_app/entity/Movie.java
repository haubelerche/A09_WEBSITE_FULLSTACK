package group9.movie_app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.sql.Date;


@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movieId;
    private String title;
    private Date releaseDate;
    private String trailerLink;
    private String posterLink;
    private String director;
    private String actors;
    private String description;
    private String genres;
    private String type;
    private Integer views = 0;
}

