var authHeaderValue = null;
var username = null;
var password = null;

function login() {
    username = document.getElementById('txtUsername').value;
    password = document.getElementById('txtPassword').value;
    authHeaderValue = "Basic " + btoa(username + ":" + password); //btoa base 64 encoding

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/login.html");
    xmlHttp.setRequestHeader("Authorization", authHeaderValue);
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("LOGIN SUCCESS");
            document.getElementById("lblMsg").innerHTML = "Welcome, " + username;
            makeCookie();
            // window.location.href = 'profile.html';
            showLoginForm(false);
        } else if (this.readyState === XMLHttpRequest.DONE && this.status === 401) {
            document.getElementById("lblMsg").innerHTML = "INVALID USERNAME/PASSWORD";
            showLoginForm(true);
        }
    }
    xmlHttp.send();
}


function showLoginForm(bTF) {
    if (bTF === true) {
        document.getElementById('frmLogin').style.visibility = "visible";
    } else {
        document.getElementById('frmLogin').style.visibility = "hidden";
    }
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
}

window.onload = function() {
    console.log("page loading...");
    if ((getCookie("username") != null) && (getCookie("password") != null)) {
        showLoginForm(true);
    } else {
        showLoginForm(false);
        alert(getCookie("username") + " is already logged in")
    }
}