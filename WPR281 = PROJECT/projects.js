checkAuth()

document.addEventListener("DOMContentLoaded", () => {
    if (typeof initData === "function") {
        initData()
    }

    renderProjects()

    const form = document.getElementById("projectForm")

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        const name = document.getElementById("projectName").value.trim()

        if (!name) {
            alert("Please enter a project name")
            return
        }

        AddNewProject({ name })
        form.reset()
        renderProjects()
    })
})

function renderProjects() {
    const projects = getProjects() || []
    const tableBody = document.getElementById("projectsTableBody")

    tableBody.innerHTML = ""

    if (projects.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-muted text-center">No projects found</td>
            </tr>
        `
        return
    }

    projects.forEach(project => {
        const projectIssues = getIssuesByProjectId(project.id)
        const openCount = projectIssues.filter(issue => issue.status === "open").length
        const overdueCount = projectIssues.filter(issue => issue.status === "overdue").length
        const resolvedCount = projectIssues.filter(issue => issue.status === "resolved").length
        const totalCount = projectIssues.length

        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${project.id}</td>
            <td>${project.name}</td>
            <td>${totalCount} total</td>
            <td>
                <span style="color: green;">${openCount} open</span> &nbsp;
                <span style="color: red;">${overdueCount} overdue</span> &nbsp;
                <span style="color: gray;">${resolvedCount} resolved</span>
            </td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeProject('${project.id}')">Delete</button>
            </td>
        `
        tableBody.appendChild(row)
    })
}

function removeProject(id) {
    const confirmed = confirm("Deleting this project will also delete its linked issues. Continue?")
    if (!confirmed) return

    const deleted = deleteProject(id)

    if (deleted) {
        renderProjects()
    } else {
        alert("Project could not be deleted")
    }
}