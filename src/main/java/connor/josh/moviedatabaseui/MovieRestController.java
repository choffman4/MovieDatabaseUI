package connor.josh.moviedatabaseui;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieRestController {

    MovieBLL movieBLL = new MovieBLL();


}
