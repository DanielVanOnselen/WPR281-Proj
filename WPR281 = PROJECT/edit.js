checkAuth()

document.addEventListener("DOMContentLoaded", () => {
    if (typeof initData === "function") {
        initData()
    }

    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

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

    const identifiedByDropdown = document.getElementById("identifiedBy")
    const assignedToDropdown = document.getElementById("assignedTo")
    const projectDropdown = document.getElementById("project")

    const people = getPeople() || []
    const projects = getProjects() || []

    // Populate "identified by" dropdown
    identifiedByDropdown.innerHTML = `<option value="" disabled>-- Select Person --</option>`

    people.forEach(person => {
        const option = document.createElement("option")
        option.value = person.id
        option.textContent = `${person.name} ${person.surname || ""}`.trim()

        // Support both old issues (identifiedBy text) and new issues (identifiedById)
        const fullName = `${person.name} ${person.surname || ""}`.trim()

        if (
            person.id === issue.identifiedById ||
            fullName === issue.identifiedBy
        ) {
            option.selected = true
        }

        identifiedByDropdown.appendChild(option)
    })

    // Populate assigned to dropdown
    assignedToDropdown.innerHTML = `<option value="">-- Select Person --</option>`

    people.forEach(person => {
        const option = document.createElement("option")
        option.value = person.id
        option.textContent = `${person.name} ${person.surname || ""}`.trim()

        if (person.id === issue.assignedPersonId) {
            option.selected = true
        }

        assignedToDropdown.appendChild(option)
    })

    // Populate project dropdown
    projectDropdown.innerHTML = `<option value="" disabled>-- Select Project --</option>`

    projects.forEach(project => {
        const option = document.createElement("option")
        option.value = project.id
        option.textContent = project.name

        if (project.id === issue.projectId) {
            option.selected = true
        }

        projectDropdown.appendChild(option)
    })

    // Fill form values
    document.getElementById("summary").value = issue.summary || ""
    document.getElementById("description").value = issue.description || ""
    document.getElementById("identifiedDate").value = issue.identifiedDate || ""
    document.getElementById("priority").value = issue.priority || "low"
    document.getElementById("targetDate").value = issue.targetDate || ""
    document.getElementById("actualResolutionDate").value = issue.actualResolutionDate || ""
    document.getElementById("resolutionSummary").value = issue.resolutionSummary || ""

    document.getElementById("editForm").addEventListener("submit", function (e) {
        e.preventDefault()

        const updatedData = {
            summary: document.getElementById("summary").value.trim(),
            description: document.getElementById("description").value.trim(),
            identifiedById: document.getElementById("identifiedBy").value,
            identifiedDate: document.getElementById("identifiedDate").value,
            assignedPersonId: document.getElementById("assignedTo").value || null,
            projectId: document.getElementById("project").value,
            priority: document.getElementById("priority").value,
            targetDate: document.getElementById("targetDate").value,
            actualResolutionDate: document.getElementById("actualResolutionDate").value,
            resolutionSummary: document.getElementById("resolutionSummary").value.trim()
        }

        if (
            !updatedData.summary ||
            !updatedData.description ||
            !updatedData.identifiedById ||
            !updatedData.identifiedDate ||
            !updatedData.projectId ||
            !updatedData.priority ||
            !updatedData.targetDate
        ) {
            alert("Please fill in all required fields")
            return
        }

        const validPriorities = ["low", "medium", "high"]

        if (!validPriorities.includes(updatedData.priority)) {
            alert("Invalid priority selected")
            return
        }

        updatedData.status = calculateIssueStatus(
            updatedData.targetDate,
            updatedData.actualResolutionDate
        )

        updateIssue(id, updatedData)
        window.location.href = `view.html?id=${id}`
    })
})

function calculateIssueStatus(targetDate, actualResolutionDate) {
    if (actualResolutionDate) {
        return "resolved"
    }

    if (!targetDate) {
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