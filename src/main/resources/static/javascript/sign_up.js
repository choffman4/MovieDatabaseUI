var authHeaderValue = null;
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

window.onload = function() {
    username = getCookie("username");
    password = getCookie("password");
    showProfileTags();
}

function newUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = {
        "username": username,
        "password": password
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8081/user/newUser");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function () {
        console.log("ready state: ", this.status);
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("success in creating user");
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            makeCookie();
            sessionStorage.setItem("user", "0")
            window.location.href = 'index.html';
        }
    }
    xmlHttp.send(JSON.stringify(user));

}

function makeCookie() {
    document.cookie = "username=" + username + "; path=/favorites.js";
    document.cookie = "password=" + password + "; path=/favorites.js";
    document.cookie = "username=" + username + "; path=/movie.js";
    document.cookie = "password=" + password + "; path=/movie.js";
    document.cookie = "username=" + username + "; path=/index.js";
    document.cookie = "password=" + password + "; path=/index.js";
    document.cookie = "username=" + username + "; path=/favorites.js";
    document.cookie = "password=" + password + "; path=/favorites.js";
    document.cookie = "username=" + username + "; path=/sign_up.js";
    document.cookie = "password=" + password + "; path=/sign_up.js";
    document.cookie = "username=" + username + "; path=/profile.js";
    document.cookie = "password=" + password + "; path=/profile.js";
    document.cookie = "username=" + username + "; path=/favorites.html";
    document.cookie = "password=" + password + "; path=/favorites.html";
    document.cookie = "username=" + username + "; path=/movie.html";
    document.cookie = "password=" + password + "; path=/movie.html";
    document.cookie = "username=" + username + "; path=/index.html";
    document.cookie = "password=" + password + "; path=/index.html";
    document.cookie = "username=" + username + "; path=/favorites.html";
    document.cookie = "password=" + password + "; path=/favorites.html";
    document.cookie = "username=" + username + "; path=/sign_up.html";
    document.cookie = "password=" + password + "; path=/sign_up.html";
    document.cookie = "username=" + username + "; path=/profile.html";
    document.cookie = "password=" + password + "; path=/profile.html";
}

//show signed in/signed out tags
function showProfileTags() {
    if (sessionStorage.getItem("user") === null) {
        document.getElementById('accountLinks').style.display = "none";
        document.getElementById('hrefLinks').style.display = "block";
        document.getElementById("profileName").style.display = "none";
    } else {
        document.getElementById('accountLinks').style.display = "block";
        document.getElementById("profileName").style.display = "block";
        document.getElementById('hrefLinks').style.display = "none";
        document.getElementById("profileName").innerHTML = username;
    }
}
