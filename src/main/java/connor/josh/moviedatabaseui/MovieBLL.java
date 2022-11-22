package connor.josh.moviedatabaseui;

import java.util.ArrayList;

public class MovieBLL {

    static String url = "jdbc:mysql://localhost:3306/" + "moviedb?allowPublicKeyRetrieval=true&useSSL=false";
    static String user = "root";
    static String password = "test";

    public static ArrayList<Movie> allMovies = new ArrayList<>();


}
