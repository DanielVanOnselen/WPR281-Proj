checkAuth()

let dateEditModalInstance = null

document.addEventListener("DOMContentLoaded", () => {
    if (typeof initData === "function") {
        initData()
    }

    const modalElement = document.getElementById("dateEditModal")
    if (modalElement) {
        dateEditModalInstance = new bootstrap.Modal(modalElement)
    }

    updateStatusesFromDates()
    renderIssues()
})

function updateStatusesFromDates() {
    const issues = getIssues()
    let changed = false

    issues.forEach(issue => {
        const newStatus = calculateIssueStatus(issue.targetDate, issue.actualResolutionDate)

        if (issue.status !== newStatus) {
            issue.status = newStatus
            changed = true
        }
    })

    if (changed) {
        saveIssues(issues)
    }
}

function calculateIssueStatus(targetDate, actualResolutionDate) {
    if (actualResolutionDate && actualResolutionDate.trim() !== "") {
        return "resolved"
    }

    if (!targetDate || targetDate.trim() === "") {
        return "open"
    }

    const today = new Date()
    const target = new Date(targetDate)

    today.setHours(0, 0, 0, 0)
    target.setHours(0, 0, 0, 0)

    if (target < today) {
        return "overdue"
    }

    return "open"
}

function getPriorityClass(priority) {
    if (priority === "high") return "badge-high"
    if (priority === "medium") return "badge-medium"
    return "badge-low"
}

function createCard(issue) {
    let assignedName = "Unassigned"

    if (issue.assignedPersonId) {
        const person = getPersonById(issue.assignedPersonId)
        if (person) {
            assignedName = `${person.name} ${person.surname || ""}`.trim()
        }
    }

    return `
        <div class="card kanban-card shadow-sm border-0 mb-3"
             onclick="openIssue('${issue.id}')"
             style="cursor:pointer;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <p class="task-title mb-0">${issue.summary || "Untitled issue"}</p>

                    <div class="dropdown" onclick="event.stopPropagation()">
                        <button class="btn btn-sm btn-menu" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            &#8942;
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <button class="dropdown-item" onclick="openDateEditor('${issue.id}')">
                                    Set / Change Dates
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="d-flex align-items-center justify-content-between mt-3">
                    <div class="d-flex align-items-center">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(assignedName)}&background=random"
                             class="avatar me-2"
                             alt="Assigned person">

                        <span class="badge rounded-pill ${getPriorityClass(issue.priority)}">
                            ${issue.priority || "low"}
                        </span>
                    </div>

                    <small class="text-muted text-capitalize">
                        ${issue.status || "open"}
                    </small>
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

        if (issue.status === "open") {
            document.getElementById("open-column").innerHTML += card
        } else if (issue.status === "resolved") {
            document.getElementById("resolved-column").innerHTML += card
        } else if (issue.status === "overdue") {
            document.getElementById("overdue-column").innerHTML += card
        }
    })
}

function openIssue(id) {
    window.location.href = `view.html?id=${id}`
}

function goToCreateIssue() {
    window.location.href = "create.html"
}

function openDateEditor(issueId) {
    const issue = getIssueById(issueId)

    if (!issue) {
        alert("Issue not found")
        return
    }

    document.getElementById("modalIssueId").value = issue.id
    document.getElementById("modalTargetDate").value = issue.targetDate || ""
    document.getElementById("modalActualResolutionDate").value = issue.actualResolutionDate || ""

    if (dateEditModalInstance) {
        dateEditModalInstance.show()
    }
}

function saveIssueDates() {
    const issueId = document.getElementById("modalIssueId").value
    const targetDate = document.getElementById("modalTargetDate").value
    const actualResolutionDate = document.getElementById("modalActualResolutionDate").value

    const issue = getIssueById(issueId)

    if (!issue) {
        alert("Issue not found")
        return
    }

    const newStatus = calculateIssueStatus(targetDate, actualResolutionDate)

    const updatedData = {
        targetDate: targetDate,
        actualResolutionDate: actualResolutionDate,
        status: newStatus
    }

    updateIssue(issueId, updatedData)

    if (dateEditModalInstance) {
        dateEditModalInstance.hide()
    }

    renderIssues()
}