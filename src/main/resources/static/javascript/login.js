var authHeaderValue = null;
var username = null;
var password = null;

function login() {
    username = document.getElementById('txtUsername').value;
    password = document.getElementById('txtPassword').value;
    authHeaderValue = "Basic " + btoa(username + ":" + password); //btoa base 64 encoding

    var user = {
        "username": username,
        "password": password
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8081/user/login");
    xmlHttp.setRequestHeader("Authorization", authHeaderValue);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("LOGIN SUCCESS");
            makeCookie();
            document.getElementById("lblMsg").innerHTML = "Welcome, " + username;
            window.location.href = 'profile.html';
            // showLoginForm(false);
        } else if (this.readyState === XMLHttpRequest.DONE && this.status === 401) {
            document.getElementById("lblMsg").innerHTML = "INVALID USERNAME/PASSWORD";
            showLoginForm(true);
        }
    }
    xmlHttp.send(JSON.stringify(user));
}


function showLoginForm(bTF) {
    if (bTF === true) {
        document.getElementById('accountLinks').style.visibility = "block";
        document.getElementById('hrefLinks').style.visibility = "none";
    } else {
        document.getElementById('accountLinks').style.visibility = "none";
        document.getElementById('hrefLinks').style.visibility = "block";
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

window.onload = function() {
    console.log("page loading...");
    if ((getCookie("username") != null) && (getCookie("password") != null)) {
        showLoginForm(true);
    } else {
        showLoginForm(false);
        alert(getCookie("username") + " is already logged in")
    }
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