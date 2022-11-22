package connor.josh.moviedatabaseui;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;



public class MovieBLL {

    static String url = "jdbc:mysql://localhost:3306/" + "moviedb?allowPublicKeyRetrieval=true&useSSL=false";
    static String user = "root";
    static String password = "test";

    public static ArrayList<Movie> allMovies = new ArrayList<>();


}
