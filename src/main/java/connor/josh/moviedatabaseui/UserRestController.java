package connor.josh.moviedatabaseui;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/user")
public class UserRestController {

    UserBLL ub = new UserBLL();

//    @RequestMapping(path = "", method = RequestMethod.POST)
//    @ResponseBody
//    public void createUser(@RequestBody User user) throws IOException {
//        ub.save(user);
//    }
//
//    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
//    public void updateUser(@PathVariable int id, @RequestBody User user) throws IOException {
//        user.setId(id);
//        ub.update(user);
//    }
//
//    @ResponseBody
//    @RequestMapping(path = "", method = RequestMethod.GET)
//    public List<User> findAllUsers() {
//        return ub.findAll();
//    }
//
//    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
//    public User findUserById(@PathVariable int id) {
//        return ub.findById(id);
//    }
//
//    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
//    public void deleteUser(@PathVariable int id) throws IOException {
//        ub.delete(id);
//    }
}
