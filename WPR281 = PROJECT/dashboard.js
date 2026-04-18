// Member 1 scope note:
// Dashboard display and navigation are complete
// MEMBER 1: render issue summaries, apply display styling, and handle page navigation
// MEMBER 4: may later replace temporary storage reads with shared helper functions
// MEMBER 2 and MEMBER 4 must agree on the final issue structure

function getIssues() {
    // Temporary display-only read
    // MEMBER 4: replace with shared getIssues/getData helper later
    return JSON.parse(localStorage.getItem("issues")) || []
}

function getPriorityClass(priority) {
    if (priority === "high") return "badge-high"
    if (priority === "medium") return "badge-medium"
    return "badge-low"
}

function createCard(issue) {
    return `
        <div class="card kanban-card shadow-sm border-0 mb-3"
             onclick="openIssue(${issue.id})"
             style="cursor:pointer;">
            <div class="card-body">
                <p class="task-title">${issue.summary || "Untitled issue"}</p>

                <div class="d-flex align-items-center mt-3">
                    <img src="https://ui-avatars.com/api/?name=${issue.assignedTo || "User"}&background=random"
                         class="avatar me-2"
                         alt="Assigned person">
                    <span class="badge rounded-pill ${getPriorityClass(issue.priority)}">
                        ${issue.priority || "low"}
                    </span>
                </div>
            </div>
        </div>
    `
}

function renderIssues() {
    const issues = getIssues()

    document.getElementById("open-column").innerHTML = ""
    document.getElementById("resolved-column").innerHTML = ""
    document.getElementById("overdue-column").innerHTML = ""

    issues.forEach(issue => {
        const card = createCard(issue)

        switch (issue.status) {
            case "open":
                document.getElementById("open-column").innerHTML += card
                break
            case "resolved":
                document.getElementById("resolved-column").innerHTML += card
                break
            case "overdue":
                document.getElementById("overdue-column").innerHTML += card
                break
        }
    })
}

function openIssue(id) {
    window.location.href = `view.html?id=${id}`
}

function goToCreateIssue() {
    window.location.href = "create.html"
}

document.addEventListener("DOMContentLoaded", () => {
    addTestIssues()
    renderIssues()
})