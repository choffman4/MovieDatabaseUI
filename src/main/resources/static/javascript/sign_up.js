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
}

function newUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = {
        "username": username,
        "password": password,
        "role": "USER"
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
        }
    }
    xmlHttp.send(JSON.stringify(user));
}
