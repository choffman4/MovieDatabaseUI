package connor.josh.moviedatabaseui;

import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieRestController {

    MovieBLL mb = new MovieBLL();

    @RequestMapping(path = "/createReview/{username}/{imdbid}/{review}", method = RequestMethod.POST)
    @ResponseBody
    public void addReview(@PathVariable String username, @PathVariable String review,
                          @PathVariable String imdbid) throws IOException {
        mb.addMovieReview(username, review, imdbid);
    }


    @RequestMapping(path = "/{username}/{imdbid}/{review}", method = RequestMethod.PUT)
    public void updateReview(@PathVariable String username, @PathVariable String imdbid,
                             @PathVariable String review) throws IOException {
        mb.updateMovieReview(username, review, imdbid);
    }

    @RequestMapping(path = "/deleteReview/{username}/{imdbid}", method = RequestMethod.DELETE)
    public void deleteReview(@PathVariable String username, @PathVariable String imdbid) throws IOException {
        mb.deleteMovieReview(username, imdbid);
    }

    @RequestMapping(path="/reviews/{imdbid}", method = RequestMethod.GET)
    public ArrayList<Review> findReviews(@PathVariable String imdbid) throws IOException {
        return mb.findMovieReviewbyID(imdbid);
    }

    @RequestMapping(path="/reviews/{username}", method = RequestMethod.GET)
    public ArrayList<Review> findReviewsbyUser(@PathVariable String username) throws IOException {
        return mb.findMovieReviewbyUser(username);
    }


//    //above is movie review
//    //-------------------------------------------------------------------------------------------
//    //below is movie recommends
//    @RequestMapping(path = "", method = RequestMethod.POST)
//    @ResponseBody
//    public void createRecommendation(@RequestBody Movie recommendation) throws IOException {
//
//    }
//
//    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
//    public void updateRecommendation(@PathVariable int id, @RequestBody Movie recommendation) throws IOException {
//
//    }
//
//    @ResponseBody
//    @RequestMapping(path = "", method = RequestMethod.GET)
//    public List<Movie> findAllRecommendation() {
//
//    }
//
//    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
//    public Movie findRecommendationById(@PathVariable int id) {
//
//    }
//
//    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
//    public void deleteRecommendation(@PathVariable int id) throws IOException {
//
//    }
    ////////////////////////////////////////////////////////////////////////////////
    @ResponseBody
    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<Movie> findAllMovies() throws IOException {
        return mb.findAll();
    }

    @RequestMapping(path = "/{imdbid}", method = RequestMethod.GET)
    public Movie findMovie(@PathVariable String imdbid) throws IOException {
        return mb.findMovie(imdbid);
    }

}