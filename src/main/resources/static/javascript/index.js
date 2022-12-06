var username = null;
var password = null;

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//onload get cookies if user is already signed in
//if user had previous search grab that search and fetch movies.
window.onload = function() {
    username = getCookie("username");
    password = getCookie("password");
    showProfileTags();
    if(sessionStorage.getItem("searchTerm") && sessionStorage.getItem("searchTerm") != null) {
        fetchPreviousMovies(1, sessionStorage.getItem("searchTerm"))
    }
}

//fetch movie page with more details
function fetchMovie(imdbID) {
    sessionStorage.setItem("imdbID", imdbID)
    window.location.href = 'movie.html';
}

//show signed in/signed out tags
function showProfileTags(bTF) {
    if (bTF === true) {
        document.getElementById('accountLinks').style.visibility = "visible";
        document.getElementById('userLinks').style.visibility = "hidden";
    } else {
        document.getElementById('accountLinks').style.visibility = "hidden";
        document.getElementById('userLinks').style.visibility = "visible";
    }
}

//fetch movies with original search and page number
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

//fetch previous movies by page number and search term.
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



//show signed in/signed out tags
function showProfileTags() {
    if (sessionStorage.getItem("user") === null) {
        document.getElementById('accountLinks').style.display = "none";
        document.getElementById('userLinks').style.display = "block";
        document.getElementById("profileName").style.display = "none";
    } else {
        document.getElementById('accountLinks').style.display = "block";
        document.getElementById("profileName").style.display = "block";
        document.getElementById('userLinks').style.display = "none";
        document.getElementById("profileName").innerHTML = username;
    }
}


