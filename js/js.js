// Helper function to parse URL
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
// Parse paramaters
//base_grant_url
if (sessionStorage.getItem("base_grant_url_persistent") === null) {
    var base_grant_url = decodeURIComponent(GetURLParameter("base_grant_url"));
    sessionStorage.setItem("base_grant_url_persistent", base_grant_url);
} else {
    var base_grant_url = sessionStorage.getItem("base_grant_url_persistent")
}
document.getElementById("baseGrantURL").innerHTML = base_grant_url;
// user_continue_url
if (sessionStorage.getItem("user_continue_url_persistent") === null) {
    var user_continue_url = decodeURIComponent(GetURLParameter("user_continue_url"));
    sessionStorage.setItem("user_continue_url_persistent", user_continue_url);
} else {
    var user_continue_url = sessionStorage.getItem("user_continue_url_persistent")
}
document.getElementById("userContinueURL").innerHTML = user_continue_url;
// node_mac
if (sessionStorage.getItem("node_mac_persistent") === null) {
    var node_mac = GetURLParameter("node_mac");
    sessionStorage.setItem("node_mac_persistent", node_mac);
} else {
    var node_mac = sessionStorage.getItem("node_mac_persistent")
}
document.getElementById("nodeMAC").innerHTML = node_mac;
// client_ip
if (sessionStorage.getItem("client_ip_persistent") === null) {
    var client_ip = GetURLParameter("client_ip");
    sessionStorage.setItem("client_ip_persistent", client_ip);
} else {
    var client_ip = sessionStorage.getItem("client_ip_persistent")
}
document.getElementById("clientIP").innerHTML = client_ip;
// client_mac
if (sessionStorage.getItem("client_mac_persistent") === null) {
    var client_mac = GetURLParameter("client_mac");
    sessionStorage.setItem("client_mac_persistent", client_mac);
} else {
    var client_mac = sessionStorage.getItem("client_mac_persistent")
}
document.getElementById("clientMAC").innerHTML = client_mac;
console.log(sessionStorage);

//put the stuff JONNY
function getURLParameter(name) {
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}
function hideURLParams() {
    //Parameters to hide (ie ?success=value, ?error=value, etc)
    var hide = ['success','error'];
    for(var h in hide) {
        if(getURLParameter(h)) {
            history.replaceState(null, document.getElementsByTagName("title")[0].innerHTML, window.location.pathname);
        }
    }
}
//Run onload, you can do this yourself if you want to do it a different way
window.onload = hideURLParams;

// Form Submit handler. 
document.getElementById('loginForm').onsubmit= function(e){
    e.preventDefault(); //prevents default form submission process to allow login and validation
    login();
}
function authUser(){
    var loginUrl = base_grant_url;
    if(user_continue_url !== "undefined"){
        loginUrl += "?continue_url="+user_continue_url;
    }
    console.log("Logging in... ",loginUrl);
    // redirect browser to meraki auth URL.
    window.location.href = loginUrl;
}
// Button handler function to store the form data and login. 
function login(){
    // send the data somewhere like a database
    var data = {};
    data.firstName = document.getElementById("firstName").value;
    data.lastName = document.getElementById("firstName").value;
    data.emailAddress = document.getElementById("emailAddress").value;
    //alert("Hello "+data.firstName + " "+data.lastName+"\n"+"Thanks for providing your email: "+data.emailAddress);
    //console.log("Storing data to db...", data);
    // Complete Login
    authUser();
}