checkAuth()

function getIssueId() {
    const params = new URLSearchParams(window.location.search)
    return params.get("id")
}

function goToEditIssue() {
    const id = getIssueId()
    window.location.href = `edit.html?id=${id}`
}

function deleteCurrentIssue() {
    const id = getIssueId()

    if (!id) return

    const confirmed = confirm("Are you sure you want to delete this issue?")
    if (!confirmed) return

    const deleted = deleteIssue(id)

    if (deleted) {
        alert("Issue deleted successfully")
        window.location.href = "dashboard.html"
    } else {
        alert("Issue could not be deleted")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof initData === "function") {
        initData()
    }

    const id = getIssueId()

    if (!id) {
        alert("No issue selected")
        window.location.href = "dashboard.html"
        return
    }

    const issue = getIssueById(id)

    if (!issue) {
        alert("Issue not found")
        window.location.href = "dashboard.html"
        return
    }

    let identifiedName = "--"
    if (issue.identifiedById) {
        const identifiedPerson = getPersonById(issue.identifiedById)
        if (identifiedPerson) {
            identifiedName = `${identifiedPerson.name} ${identifiedPerson.surname || ""}`.trim()
        }
    } else if (issue.identifiedBy) {
        identifiedName = issue.identifiedBy
    }

    let assignedName = "--"
    if (issue.assignedPersonId) {
        const assignedPerson = getPersonById(issue.assignedPersonId)
        if (assignedPerson) {
            assignedName = `${assignedPerson.name} ${assignedPerson.surname || ""}`.trim()
        }
    }

    let projectName = "--"
    if (issue.projectId) {
        const project = getProjectById(issue.projectId)
        if (project) {
            projectName = project.name
        }
    }

    document.getElementById("issue-summary").textContent = issue.summary || "--"
    document.getElementById("issue-description").textContent = issue.description || "--"
    document.getElementById("issue-identifiedBy").textContent = identifiedName
    document.getElementById("issue-identifiedDate").textContent = issue.identifiedDate || "--"
    document.getElementById("issue-project").textContent = projectName
    document.getElementById("issue-assignedTo").textContent = assignedName
    document.getElementById("issue-status").textContent = issue.status || "--"
    document.getElementById("issue-priority").textContent = issue.priority || "--"
    document.getElementById("issue-targetDate").textContent = issue.targetDate || "--"
    document.getElementById("issue-actualResolutionDate").textContent = issue.actualResolutionDate || "--"
    document.getElementById("issue-resolutionSummary").textContent = issue.resolutionSummary || "--"
})