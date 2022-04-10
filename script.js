
function getData() {

    const username = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    if (username == "" | password == "") {
        alert("Please enter your Username and Password.");
    }
    else {
        localStorage.setItem("sName",username);
        localStorage.setItem("sPass",password);

        window.location="page2.html";
    }
}