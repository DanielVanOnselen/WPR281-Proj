function checkAuth() {
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
        window.location.href = "login.html"
    }
}

function logout() {
    sessionStorage.removeItem("isAdminLoggedIn")
    window.location.href = "login.html"
}