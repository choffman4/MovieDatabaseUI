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
                + "<div id='movieDetails'> <h4>" + res.Title + "</h4><p>"+ res.Year +"</p></div>"
            movieList.innerHTML += movieHTML;
        })
}

window.onload = function() {
    fetchMovie(sessionStorage.getItem("imdbID"))
}