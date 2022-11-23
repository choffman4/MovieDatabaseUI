package connor.josh.moviedatabaseui;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserBLL {

    static String url = "jdbc:mysql://localhost:3306/moviedb?allowPublicKeyRetrieval=true&useSSL=false";
    static String user = "root";
    static String password = "test";

    public static boolean accountExists;
    public static boolean passwordMatch;

    public static void addUser(String username, String pass) {
        String sql = "INSERT INTO usereditor.useraccount (UserName, Password) Values(?, ?)";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);

            pst.setString(1, username);
            pst.setString(2, pass);
            pst.executeUpdate();

        } catch (Exception e) {
            accountExists = true;
            e.printStackTrace();
        }
    }

    public static void accountLogin(String username, String pass) {
        String sql = "Select password from moviedb.useraccount where username=(?)";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1,username);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                if (pass.equals(rs.getString("password"))) {
                    System.out.println("password match");
                    passwordMatch = true;
                } else {
                    System.out.println("access denied, try again");
                    passwordMatch = false;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void deleteUser(String username, String pass) {

        String sql = "DELETE FROM moviedb.useraccount WHERE username=(?) and password=(?);";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1,username);
            pst.setString(2,pass);
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void updateUserPassword(String username, String pass, String newPass) {
        String sql = "UPDATE moviedb.useraccount SET password=(?) WHERE username=(?) and password=(?);";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1,newPass);
            pst.setString(2,username);
            pst.setString(3,pass);
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void updateUsername(String username, String newUsername) {
        String sql = "UPDATE moviedb.useraccount SET username=(?) WHERE username=(?);";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1,newUsername);
            pst.setString(2,username);
            pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
