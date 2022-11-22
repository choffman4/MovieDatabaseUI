package connor.josh.moviedatabaseui;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieRestController {

    MovieBLL mb = new MovieBLL();

    @RequestMapping(path = "", method = RequestMethod.POST)
    @ResponseBody
    public void createReview(@RequestBody Movie review) throws IOException {
        mb.save(review);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public void updateReview(@PathVariable int id, @RequestBody Movie review) throws IOException {
        review.setId(id);
        mb.update(review);
    }

    @ResponseBody
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<Movie> findAllReviews() {
        return mb.findAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Movie findReviewById(@PathVariable int id) {
        return mb.findById(id);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void deleteReview(@PathVariable int id) throws IOException {
        mb.delete(id);
    }

    //above is movie review
    //-------------------------------------------------------------------------------------------
    //below is movie recommends
    @RequestMapping(path = "", method = RequestMethod.POST)
    @ResponseBody
    public void createRecommendation(@RequestBody Movie recommendation) throws IOException {
        mb.save(recommendation);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public void updateRecommendation(@PathVariable int id, @RequestBody Movie recommendation) throws IOException {
        recommendation.setId(id);
        mb.update(recommendation);
    }

    @ResponseBody
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<Movie> findAllRecommendation() {
        return mb.findAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Movie findRecommendationById(@PathVariable int id) {
        return mb.findById(id);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void deleteRecommendation(@PathVariable int id) throws IOException {
        mb.delete(id);
    }

}