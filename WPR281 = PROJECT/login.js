const loginForm = document.getElementById("loginForm")
const loginMessage = document.getElementById("loginMessage")

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123"

loginForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem("isAdminLoggedIn", "true")
        window.location.href = "dashboard.html"
    } else {
        loginMessage.textContent = "Invalid admin username or password"
    }
})