var authHeaderValue = null;
var username = null;
var password = null;
var foundUser = null;

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
    // checkUser();
}

// check if user is signed in to display profile data
// function checkUser() {
//     authHeaderValue = "Basic " + btoa(username + ":" + password); //btoa base 64 encoding
//
//     var user = {
//         "username": username,
//         "password": password
//     }
//
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open("POST", "http://localhost:8081/user/login", true);
//     xmlHttp.setRequestHeader("Authorization", authHeaderValue);
//     xmlHttp.setRequestHeader("Content-Type", "application/json");
//     xmlHttp.onreadystatechange = function () {
//         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//             foundUser = JSON.parse(this.responseText)
//             displayProfile()
//         } else if (this.readyState === XMLHttpRequest.DONE && this.status === 401) {
//             alert(this.status)
//         }
//     }
//     xmlHttp.send(JSON.stringify(user));
// }

function displayProfile() {
    var profileInfo = document.getElementById("profileInfo");
    profileInfo.innerHTML = foundUser.username;

    var profileHTML = "";
    profileInfo.innerHTML += profileHTML;
}

//show signed in/signed out tags
function showProfileTags() {
    if (sessionStorage.getItem("user") === null) {
        document.getElementById('accountLinks').style.display = "none";
        document.getElementById('hrefLinks').style.display = "block";
    } else {
        document.getElementById('accountLinks').style.display = "block";
        document.getElementById('hrefLinks').style.display = "none";
    }
}
