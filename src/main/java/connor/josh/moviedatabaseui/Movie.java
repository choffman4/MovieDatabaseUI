package connor.josh.moviedatabaseui;

public class Movie {

    private int id;
    private String title;
    private String director;
    private int year;
    private int runtime;
    private float rating;
    private int recommends;

    private String imdbID;

    public Movie(int id, String title, String director, int year, int runtime, float rating, int recommends, String imdbID) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.year = year;
        this.runtime = runtime;
        this.rating = rating;
        this.recommends = recommends;
        this.imdbID = imdbID;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImdbID() {
        return imdbID;
    }

    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getRuntime() {
        return runtime;
    }

    public void setRuntime(int runtime) {
        this.runtime = runtime;
    }

    public int getRecommends() {
        return recommends;
    }

    public void setRecommends(int recommends) {
        this.recommends = recommends;
    }
}
