package group9.movie_app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.sql.Date;


@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Movie {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movieId;

    private String title;
    @Getter
    private Date releaseDate;
    @Getter
    private String trailerLink;
    @Getter
    private String posterLink;
    @Getter
    private String director;
    @Getter
    private String actors;
    @Getter
    private String description;
    @Getter
    private String genres;
    @Getter
    private String type;
    @Getter
    private Integer views = 0;

}

