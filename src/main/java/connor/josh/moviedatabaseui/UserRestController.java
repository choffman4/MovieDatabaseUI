package connor.josh.moviedatabaseui;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/user")
public class UserRestController {

    UserBLL ub = new UserBLL();

    @RequestMapping(path = "/newUser", method = RequestMethod.POST)
    @ResponseBody
    public void createUser(@RequestBody User user) throws IOException {
        ub.newUser(user);
    }

    @RequestMapping(path = "/updateUsername/{currentUsername}/{newUsername}/{password}", method = RequestMethod.PUT)
    public void updateUsername(@PathVariable String currentUsername, @PathVariable String password,
                               @PathVariable String newUsername) throws IOException {
        ub.updateUsername(currentUsername, password, newUsername);
    }

    @RequestMapping(path = "/updatePassword/{username}/{currentPass}/{newPassword}", method = RequestMethod.PUT)
    public void updatePassword(@PathVariable String username, @PathVariable String currentPass,
                               @PathVariable String newPassword) throws IOException {
        ub.updateUserPassword(username, currentPass, newPassword);
    }

    @RequestMapping(path = "/login/{username}/{password}", method = RequestMethod.GET)
    public User login(@PathVariable String username, @PathVariable String password) {
        return ub.accountLogin(username, password);
    }

    @RequestMapping(path = "/deleteUser/{username}/{password}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable String username, @PathVariable String password) throws IOException {
        ub.deleteUser(username, password);
    }

    @RequestMapping(path = "/addFavoriteMovie/{username}/{imdbid}", method = RequestMethod.POST)
    public void addFavoriteMovie(@PathVariable String username, @PathVariable String imdbid) throws IOException {
        ub.addFavoriteMovie(username, imdbid);
    }

    @RequestMapping(path = "/deleteFavoriteMovie/{username}/{imdbid}", method = RequestMethod.DELETE)
    public void deleteFavoriteMovie(@PathVariable String username, @PathVariable String imdbid) throws IOException {
        ub.deleteFavoriteMovie(username, imdbid);
    }
}
