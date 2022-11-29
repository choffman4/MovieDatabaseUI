var authHeaderValue = null;
var username = null;
var password = null;

function fetchMovie(imdbID) {
    var movieList = document.getElementById("movieListHTML");
    movieList.innerHTML = "";
    fetch("http://www.omdbapi.com/?i=" + imdbID + "&plot=full&apikey=7c9d77e9", {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((res) => {
            var movieHTML = "</br>" + "<img src='" + res.Poster + "' width='185' height='273.79' >"
                + "<div id='movieDetails'> <h4>" + res.Title + "</h4><p>"+ "Released: " + res.Released + ","
                + "</br>" + "Rated: "+ res.Rated + "," + "</br>" + "Runtime: " + res.Runtime + "," + "</br>"
                + "Genre: " + res.Genre + "," + "</br>" + "Director: " + res.Director + "," + "</br>"
                + "Writer: " + res.Writer + "," + "</br>" + "Actors: " + res.Actors + "," + "</br>" + "Language: "
                + res.Language + "," + "</br>" + "Country: " + res.Country + "," + "</br>" + "Awards: "
                + res.Awards + "," + "</br>" + "BoxOffice Sales: " + res.BoxOffice + "," + "</br>" + "Metascore: "
                + res.Metascore + "," + "</br>" + "imdbRating: " + res.imdbRating  +"</p></div>"
            movieList.innerHTML += movieHTML;
        })
}

window.onload = function() {
    fetchMovie(sessionStorage.getItem("imdbID"))
    username = getCookie("username");
    password = getCookie("password");
}