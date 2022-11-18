var authHeaderValue = null;
var username = null;
var password = null;

function fetchMovie(imdbID) {
    localStorage.removeItem("imdbID")
    var movieList = document.getElementById("movieListHTML");
    movieList.innerHTML = "";
    fetch("http://www.omdbapi.com/?i=" + imdbID + "&plot=full&apikey=7c9d77e9", {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((res) => {
            var movieHTML = `</br><h5>` + res.Title + "</h5><p>"
                + res.Year + "</p>" + "<img src=" + res.Poster
                + `" width=\"185\" height=\"273.79\"><hr>`;
            movieList.innerHTML += movieHTML;
        })
}

window.onload = function() {
    fetchMovie(localStorage.getItem("imdbID"))
}