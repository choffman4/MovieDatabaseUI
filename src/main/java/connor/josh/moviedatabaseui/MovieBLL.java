package connor.josh.moviedatabaseui;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
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

    public static void addMovie(String imdbID) {

        String sql =    "BEGIN" +
                            "IF NOT EXISTS (SELECT * FROM moviedb.movie " +
                                "WHERE (imdbid)=(?)" +
                            "BEGIN" +
                            "INSERT INTO moviedb.movie (imdbid, recommends) " +
                                "Values(?, ?)" +
                            "END" +
                        "END";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);

            pst.setString(1, imdbID);
            pst.setString(2, imdbID);
            pst.setInt(3, 0);
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void updateMovieRecommends(String imdbID) throws IOException {

        Movie movie = findMovie(imdbID);

        String sql = "UPDATE moviedb.movie where (imdbid)=(?) set (recommends)=(?);";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1,imdbID);
            pst.setInt(2, movie.getRecommends());
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static List<Movie> findAll() throws IOException {
        String sql = "Select * from moviedb.movie";
        allMovies.clear();

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();

            while(rs.next()) {
                String imdbID = rs.getString("imdbid");
                int recommends = rs.getInt("recommends");
                Movie movie = new Movie(imdbID, recommends);
                allMovies.add(movie);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return allMovies;
    }

    public static Movie findMovie(String imdbID) throws IOException {
        findAll();
        Movie foundMovie = new Movie();
        for (Movie movie: allMovies) {
            if(movie.getImdbID() == imdbID) {
                foundMovie = movie;
            }

        }
        return foundMovie;
    }


    ////////////////////////////////////////////////////////////////////
    public static void addMovieRecommendation(String username, String imdbID) throws IOException {
        Movie movie = findMovie(imdbID);

        String sql =    "BEGIN" +
                            "IF NOT EXISTS (SELECT * FROM moviedb.userrecommends " +
                                "WHERE (username)=(?) and (imdbid)=(?)" +
                            "BEGIN" +
                            "INSERT INTO moviedb.userrecommends (username, imdbid) " +
                                "Values(?, ?)" +
                            "END" +
                        "END";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, username);
            pst.setString(2, imdbID);
            pst.setString(3, username);
            pst.setString(4, imdbID);
            pst.executeUpdate();

            movie.setRecommends(movie.getRecommends() + 1);
            updateMovieRecommends(imdbID);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void removeMovieRecommendation(String username, String imdbID) throws IOException {
        String sql = "DELETE FROM moviedb.userrecommends WHERE (username)=(?) and (imdbid)=(?)";

        Movie movie = findMovie(imdbID);

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, username);
            pst.setString(2, imdbID);
            pst.executeUpdate();

            movie.setRecommends(movie.getRecommends() - 1);
            updateMovieRecommends(imdbID);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
