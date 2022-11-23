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
    public static ArrayList<Review> allReviews = new ArrayList<>();

    //MOVIE CRUD
    public void addMovie(String imdbID) {

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

    public List<Movie> findAllMovies() throws IOException {
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

    public Movie findMovie(String imdbID) throws IOException {
        findAllMovies();
        Movie foundMovie = new Movie();
        for (Movie movie: allMovies) {
            if(movie.getImdbID() == imdbID) {
                foundMovie = movie;
            }

        }
        return foundMovie;
    }

    //MOVIE REVIEW CRUD
    ////////////////////////////////////////////////////////////////////
    public void updateMovieRecommends(Movie movie) throws IOException {

        String sql = "UPDATE moviedb.movie where imdbid=(?) set recommends=(?);";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, movie.getImdbID());
            pst.setInt(2, movie.getRecommends());
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void addMovieRecommendation(String username, String imdbID) throws IOException {
        Movie movie = findMovie(imdbID);

        String sql = "INSERT INTO moviedb.userrecommends (username, imdbid) Values(?, ?)";


        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, username);
            pst.setString(2, imdbID);
            pst.executeUpdate();

            movie.setRecommends(movie.getRecommends() + 1);
            updateMovieRecommends(movie);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void removeMovieRecommendation(String username, String imdbID) throws IOException {
        String sql = "DELETE FROM moviedb.userrecommends WHERE (username)=(?) and (imdbid)=(?)";

        Movie movie = findMovie(imdbID);

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, username);
            pst.setString(2, imdbID);
            pst.executeUpdate();

            movie.setRecommends(movie.getRecommends() - 1);
            updateMovieRecommends(movie);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //MOVIE REVIEW CRUD
    ////////////////////////////////////////////////////////////////////////////////////////////////
    public void addMovieReview(Review review) {
        String sql = "INSERT INTO moviedb.moviereview (username, imdbid, review) Values(?, ?, ?)";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, review.getUsername());
            pst.setString(2, review.getImdbid());
            pst.setString(3, review.getReview());
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void updateMovieReview(Review review) {
        String sql = "UPDATE moviedb.moviereview where (imdbid=(?) and username=(?)) set review=(?);";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, review.getImdbid());
            pst.setString(2, review.getUsername());
            pst.setString(3, review.getReview());
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteMovieReview(String username, String imdbid) {
        String sql = "DELETE FROM moviedb.moviereview WHERE username=(?) and imdbid=(?)";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, username);
            pst.setString(2, imdbid);
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ArrayList<Review> findAllMovieReviews() throws IOException {
        String sql = "Select * from moviedb.movie";
        allReviews.clear();

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();

            while(rs.next()) {
                String imdbID = rs.getString("imdbid");
                String username = rs.getString("username");
                String review = rs.getString("review");
                Review movieReview = new Review(imdbID, username, review);
                allReviews.add(movieReview);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return allReviews;
    }

    public ArrayList<Review> findMovieReviewByID(String imdbID) throws IOException {
        ArrayList<Review> movieReviews = new ArrayList<>();
        for (Review review: findAllMovieReviews()) {
            if(review.getImdbid() == imdbID) {
                movieReviews.add(review);
            }

        }
        return movieReviews;
    }

    public ArrayList<Review> findMovieReviewByUser(String username) throws IOException {
        ArrayList<Review> movieReviews = new ArrayList<>();
        for (Review review: findAllMovieReviews()) {
            if(review.getUsername() == username) {
                movieReviews.add(review);
            }

        }
        return movieReviews;
    }

}
