package connor.josh.moviedatabaseui;

import java.util.ArrayList;

public class User {

    private String username;
    private int password;
    private ArrayList<User> favorites = new ArrayList<>();

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getPassword() {
        return password;
    }

    public void setPassword(int password) {
        this.password = password;
    }
}