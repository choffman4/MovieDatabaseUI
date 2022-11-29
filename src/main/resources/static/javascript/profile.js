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
    // loadPlanets();
}

// function loadPlanets() {
//     authHeaderValue = "Basic " + btoa(username + ":" + password); //btoa base 64 encoding
//
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open("GET", "/profile.html");
//     xmlHttp.setRequestHeader("Authorization", authHeaderValue);
//
//     xmlHttp.onreadystatechange = function () {
//         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//
//         }
//     }
//     xmlHttp.send();
// }

