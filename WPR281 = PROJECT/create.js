checkAuth()

document.addEventListener("DOMContentLoaded", () => {
    if (typeof initData === "function") {
        initData()
    }

    populatePeopleDropdown()
    populateProjectDropdown()
    populateIdentifiedByDropdown()

    const form = document.getElementById("issueForm")

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        const formData = {
            summary: document.querySelector("#summary").value.trim(),
            description: document.querySelector("#description").value.trim(),
            identifiedById: document.querySelector("#identifiedBy").value,
            identifiedDate: document.querySelector("#identifiedDate").value,
            assignedPersonId: document.querySelector("#assignedTo").value,
            projectId: document.querySelector("#project").value,
            priority: document.querySelector("#priority").value,
            targetDate: document.querySelector("#targetDate").value,
            actualResolutionDate: document.querySelector("#actualResolutionDate").value,
            resolutionSummary: document.querySelector("#resolutionSummary").value.trim()
        }

        if (
            !formData.summary ||
            !formData.description ||
            !formData.identifiedById ||
            !formData.identifiedDate ||
            !formData.projectId ||
            !formData.priority ||
            !formData.targetDate
        ) {
            alert("Please fill in all required fields")
            return
        }

        const validPriorities = ["low", "medium", "high"]

        if (!validPriorities.includes(formData.priority)) {
            alert("Invalid priority selected")
            return
        }

        const issue = {
            id: getNextId("ISS", getIssues()),
            summary: formData.summary,
            description: formData.description,
            identifiedById: formData.identifiedById,
            identifiedDate: formData.identifiedDate,
            assignedPersonId: formData.assignedPersonId || null,
            projectId: formData.projectId,
            status: "open",
            priority: formData.priority,
            targetDate: formData.targetDate,
            actualResolutionDate: formData.actualResolutionDate || "",
            resolutionSummary: formData.resolutionSummary || ""
        }

        issue.status = calculateIssueStatus(issue.targetDate, issue.actualResolutionDate)

        const issues = getIssues() || []
        issues.push(issue)
        saveIssues(issues)

        window.location.href = "dashboard.html"
    })
})

function populatePeopleDropdown() {
    const select = document.getElementById("assignedTo")
    if (!select) return

    const people = getPeople() || []

    select.innerHTML = `<option value="" selected>-- Select Person --</option>`

    people.forEach(person => {
        if (!person.id || !person.name) return

        const option = document.createElement("option")
        option.value = person.id
        option.textContent = `${person.name} ${person.surname || ""}`.trim()
        select.appendChild(option)
    })
}

function populateProjectDropdown() {
    const select = document.getElementById("project")
    if (!select) return

    const projects = getProjects() || []

    select.innerHTML = `<option value="" disabled selected>-- Select Project --</option>`

    projects.forEach(project => {
        if (!project.id || !project.name) return

        const option = document.createElement("option")
        option.value = project.id
        option.textContent = project.name
        select.appendChild(option)
    })
}

function populateIdentifiedByDropdown() {
    const select = document.getElementById("identifiedBy")
    if (!select) return

    const people = getPeople() || []

    select.innerHTML = `<option value="" disabled selected>-- Select Person --</option>`

    people.forEach(person => {
        const option = document.createElement("option")
        option.value = person.id
        option.textContent = `${person.name} ${person.surname || ""}`.trim()
        select.appendChild(option)
    })
}

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