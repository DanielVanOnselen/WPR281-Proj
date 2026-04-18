// ===== AUTH CHECK =====
function checkAuth() {
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
        window.location.href = "login.html"
    }
}

// ===== LOGOUT =====
function logout() {
    sessionStorage.removeItem("isAdminLoggedIn")
    window.location.href = "login.html"
}