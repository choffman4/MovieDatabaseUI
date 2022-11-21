var authHeaderValue = null;
var username = null;
var password = null;
var currentPage = null;

function fetchMovies(pageNumber) {
    currentPage = parseInt(pageNumber);
    alert(currentPage)
    var movieList = document.getElementById("movieListHTML");
    movieList.innerHTML = "";
    fetch("http://www.omdbapi.com/?s=star&page=" + String(currentPage) + "&type=movie&apikey=7c9d77e9", {
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

function fetchMovie(imdbID) {
    alert(imdbID)
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

// for (var planet of planets) {
//     var planet_html = "<hr/>Planet:<br/><li>" + "ID:&nbsp;" + planet.id + "</li>" + "<li>"
//         + "NAME:&nbsp;" + planet.name + "</li>" + "<li>" + "SYSTEM:&nbsp;" + planet.system + "</li>"
//         + "<li>" + "GALAXY:&nbsp;" + planet.galaxy + "</li>";
//     planet_list.innerHTML += planet_html;
// }

////////////////////////////////////////////////////////////////////////////
// function getAllMovies() {
//     clearPage();
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//             var allMovies = JSON.parse(this.responseText);
//             renderMovies(allMovies);
//         }
//     }
//     xmlHttp.open("GET", "http://localhost:8081/movies/", true);
//     xmlHttp.send();
// }

// function searchPeople() {
//     clearPage();
//     var searchTerm = document.getElementById("entity_search").value;
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open("GET", "http://localhost:8081/movies/" + searchTerm, true);
//     xmlHttp.onreadystatechange = function () {
//         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//             var people = JSON.parse(this.responseText);
//             renderPeople(people);
//         }
//     }
//     xmlHttp.send();
// }

// function renderMovies(allMovies) {
//     for (var movie of allMovies) {
//         var movie_html = "<hr/>Movie:<br/><li>" + "ID:&nbsp;" + movie.id + "</li>" + "<li>"
//             + "Title:&nbsp;" + movie.title + "</li>" + "<li>" + "Director:&nbsp;" + movie.director + "</li>";
//         movie_list.innerHTML += movie_html;
//     }
// }


// function clearPage() {
//     var movie_list = document.getElementById("movie_list");
//     var movieHTML = document.getElementById("movieHTML");
//     movie_list.innerHTML = "";
//     movieHTML.innerHTML = "";
// }
//
window.onload = function() {

    // username = getCookie("username");
    // password = getCookie("password");
    // loadPeople();
}

// function loadPeople() {
//     clearPage();
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//             // var people = JSON.parse(this.responseText);
//         }
//     }
//     xmlHttp.open("GET", "http://localhost:8081/movies/", true);
//     xmlHttp.send();
// }

// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }