var authHeaderValue = null;
var username = null;
var password = null;
var imdbid = sessionStorage.getItem("imdbID").toString()

var recommends = 0;

//fetch movie by id, all movie details
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

            var buttonHTML = `<div id="buttonLocation">` + `<button onClick="` + recommendMovie(imdbid) + `">Like</button>` +
                `<button onClick="` + addToFavorites(imdbid) + `">Favorite</button></div>`;

            movieList.innerHTML += buttonHTML;


        })
}

//movie recommends incomplete
function getMovieRecommends(imdbid) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:8081/movies/recommends/" + imdbid);
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            alert(this.responseText)
            // recommends = JSON.parse(this.responseText)
            // var likes = document.getElementById("likes");
            // likes.innerHTML = "Recommendations: " + recommends.recommends;
        }
    }
    xmlHttp.send();
}

//add movie to favorites list, username:imdbid as primary key
function addToFavorites(imdbid) {
    authHeaderValue = "Basic " + btoa(username + ":" + password); //btoa base 64 encoding
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8081/movies/favorites/add/" + username + "/" + imdbid);
    xmlHttp.setRequestHeader("Authorization", authHeaderValue);
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

        }
    }
    xmlHttp.send();
}

function recommendMovie(imdbid) {
    // authHeaderValue = "Basic " + btoa(username + ":" + password); //btoa base 64 encoding
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("POST", "http://localhost:8081/movies/recommends/add/" + username + "/" + imdbid);
    // xmlHttp.setRequestHeader("Authorization", authHeaderValue);
    // xmlHttp.onreadystatechange = function () {
    //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //
    //     }
    // }
    // xmlHttp.send();
}

window.onload = function() {
    fetchMovie(sessionStorage.getItem("imdbID"));
    getMovieRecommends(sessionStorage.getItem("imdbID"));
    username = getCookie("username");
    password = getCookie("password");
}


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