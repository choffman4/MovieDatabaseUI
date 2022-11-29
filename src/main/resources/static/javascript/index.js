var authHeaderValue = null;
var username = null;
var password = null;
var currentPage = null;

function fetchMovies(pageNumber) {
    currentPage = parseInt(pageNumber);
    var movieList = document.getElementById("movieListHTML");
    const searchTerm = document.getElementById("entity_search").value;
    sessionStorage.setItem("searchTerm", searchTerm);

    movieList.innerHTML = "";
    fetch("http://www.omdbapi.com/?s=" + searchTerm + "&page=" + String(currentPage) + "&type=movie&apikey=7c9d77e9", {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((res) => {
            for(i = 0; i < (res.Search).length; i++) {
                var movieHTML = `</br><button type=\"button\" value="` + res.Search[i].imdbID + `" onclick="fetchMovie(this.value)">` + res.Search[i].Title + "</button><p>"
                    + res.Search[i].Year + "</p>" + "<img src=" + res.Search[i].Poster
                    + `" width=\"185\" height=\"273.79\"><hr>`;
                movieList.innerHTML += movieHTML;
            }
            if (currentPage < Math.floor((res.totalResults)/10) && currentPage >= 2) {
                movieList.innerHTML
                    += `<button type="button" value="` + (currentPage - 1)
                    + `" onclick="fetchMovies(this.value)">Previous Page</button>`
                    + `<button type="button" value="` + (currentPage + 1)
                    + `" onclick="fetchMovies(this.value)">Next Page</button>`
            }
            else if (currentPage >= 2) {
                movieList.innerHTML
                    += `<button type="button" value="` + (currentPage - 1)
                    + `" onclick="fetchMovies(this.value)">Previous Page</button>`
            } else if (currentPage < Math.floor((res.totalResults)/10)) {
                movieList.innerHTML += `<button type="button" value="` + (currentPage + 1)
                    + `" onclick="fetchMovies(this.value)">Next Page</button>`
            }

        })
}

function fetchPreviousMovies(pageNumber, searchTerm) {
    currentPage = parseInt(pageNumber);
    var movieList = document.getElementById("movieListHTML");

    movieList.innerHTML = "";
    fetch("http://www.omdbapi.com/?s=" + searchTerm + "&page=" + String(currentPage) + "&type=movie&apikey=7c9d77e9", {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((res) => {
            for(i = 0; i < (res.Search).length; i++) {
                var movieHTML = `</br><button type="button" value="` + res.Search[i].imdbID + `" onclick="fetchMovie(this.value)">` + res.Search[i].Title + "</button><p>"
                    + res.Search[i].Year + "</p>" + "<img src=" + res.Search[i].Poster
                    + `" width=\"185\" height=\"273.79\"><hr>`;
                movieList.innerHTML += movieHTML;
            }
            if (currentPage < Math.floor((res.totalResults)/10) && currentPage >= 2) {
                movieList.innerHTML
                    += `<button type="button" value="` + (currentPage - 1)
                    + `" onclick="fetchMovies(this.value)">Previous Page</button>`
                    + `<button type="button" value="` + (currentPage + 1)
                    + `" onclick="fetchMovies(this.value)">Next Page</button>`
            }
            else if (currentPage >= 2) {
                movieList.innerHTML
                    += `<button type="button" value="` + (currentPage - 1)
                    + `" onclick="fetchMovies(this.value)">Previous Page</button>`
            } else if (currentPage < Math.floor((res.totalResults)/10)) {
                movieList.innerHTML += `<button type="button" value="` + (currentPage + 1)
                    + `" onclick="fetchMovies(this.value)">Next Page</button>`
            }

        })
}

function fetchMovie(imdbID) {
    sessionStorage.setItem("imdbID", imdbID)
    window.location.href = 'movie.html';
}


window.onload = function() {
    if(sessionStorage.getItem("searchTerm") && sessionStorage.getItem("searchTerm") != null) {
        fetchPreviousMovies(1, sessionStorage.getItem("searchTerm"))
    }
}
