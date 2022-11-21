package connor.josh.moviedatabaseui;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class MovieBLL {

    static String url = "jdbc:mysql://localhost:3306/" + "moviedb?allowPublicKeyRetrieval=true&useSSL=false";
    static String user = "root";
    static String password = "test";

    public static ArrayList<Movie> allMovies = new ArrayList<>();

    public List<Movie> findAll() throws IOException {
        String sql = "Select * from moviedb.movie";
        allMovies.clear();

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();

            while(rs.next()) {
                int id = rs.getInt("id");
                String title = rs.getString("title");
                String director = rs.getString("director");
                int year = rs.getInt("year");
                int runtime = rs.getInt("runtime");
                float rating = rs.getFloat("rating");
                int recommends = rs.getInt("recommends");
                String imdbID = rs.getString("imdbID");
                Movie movie = new Movie(id, title, director, year, runtime, rating, recommends, imdbID);
                allMovies.add(movie);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return allMovies;
    }

}
