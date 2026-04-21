// ==================== CORE STORAGE FUNCTIONS ====================

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function getData(key) {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
}

// ==================== ID GENERATION ====================

function getNextId(prefix, items) {
    let max = 0

    items.forEach(item => {
        if (item.id && item.id.startsWith(prefix)) {
            const numberPart = parseInt(item.id.replace(prefix, ""))
            if (!isNaN(numberPart) && numberPart > max) {
                max = numberPart
            }
        }
    })

    return `${prefix}${max + 1}`
}

// ==================== PEOPLE FUNCTIONS ====================
function getPeople() {
    return getData("people") || []
}

function savePeople(people) {
    saveData("people", people)
}

function getPersonById(id) {
    const people = getPeople()
    return people.find(person => person.id === id) || null
}

function AddNewPerson(person) {
    const people = getPeople()

    const newPerson = {
        id: getNextId("PRS", people),
        name: person.name,
        surname: person.surname,
        email: person.email,
        username: person.username
    }

    people.push(newPerson)
    savePeople(people)
    return newPerson
}

function deletePerson(id) {
    const people = getPeople()
    const filteredPeople = people.filter(person => person.id !== id)

    if (filteredPeople.length === people.length) return false

    const issues = getIssues().map(issue => {
        if (issue.assignedPersonId === id) {
            return { ...issue, assignedPersonId: null }
        }
        return issue
    })

    savePeople(filteredPeople)
    saveIssues(issues)
    return true
}

// ==================== PROJECT FUNCTIONS ====================

function getProjects() {
    return getData("projects") || []
}

function saveProjects(projects) {
    saveData("projects", projects)
}

function getProjectById(id) {
    const projects = getProjects()
    return projects.find(project => project.id === id) || null
}

function AddNewProject(project) {
    const projects = getProjects()

    const newProject = {
        id: getNextId("PRJ", projects),
        name: project.name
    }

    projects.push(newProject)
    saveProjects(projects)
    return newProject
}

function deleteProject(id) {
    const projects = getProjects()
    const filteredProjects = projects.filter(project => project.id !== id)

    if (filteredProjects.length === projects.length) return false

    const issues = getIssues().filter(issue => issue.projectId !== id)

    saveProjects(filteredProjects)
    saveIssues(issues)
    return true
}

// ==================== ISSUE FUNCTIONS ====================

function getIssues() {
    return getData("issues") || []
}

function saveIssues(issues) {
    saveData("issues", issues)
}

function getIssueById(id) {
    const issues = getIssues()
    return issues.find(issue => issue.id === id) || null
}

function AddNewIssue(issue) {
    const issues = getIssues()

    const newIssue = {
        id: getNextId("ISS", issues),
        ...issue
    }

    issues.push(newIssue)
    saveIssues(issues)
    return newIssue
}

function updateIssue(id, updates) {
    const issues = getIssues()
    const index = issues.findIndex(issue => issue.id === id)

    if (index === -1) return null

    issues[index] = { ...issues[index], ...updates }
    saveIssues(issues)
    return issues[index]
}

function deleteIssue(id) {
    const issues = getIssues()
    const filteredIssues = issues.filter(issue => issue.id !== id)

    if (filteredIssues.length === issues.length) return false

    saveIssues(filteredIssues)
    return true
}

function getIssuesByProjectId(projectId) {
    const issues = getIssues()
    return issues.filter(issue => issue.projectId === projectId)
}

function getIssuesByPersonId(personId) {
    const issues = getIssues()
    return issues.filter(issue => issue.assignedPersonId === personId)
}

// ==================== INITIALIZATION ====================

function initData() {
    if (!getData("people")) {
        savePeople([
            {
                id: "PRS1",
                name: "Muzi",
                surname: "Manaka",
                email: "Muzi@gmail.com",
                username: "MuziManaka"
            },
            {
                id: "PRS2",
                name: "Daniel",
                surname: "Van Onselen",
                email: "daniel@gmail.com",
                username: "DanielVOnselen"
            },
            {
                id: "PRS3",
                name: "Seth",
                surname: "White",
                email: "seth@gmail.com",
                username: "SethWhite"
            },
            {
                id: "PRS4",
                name: "Albert",
                surname: "Klopper",
                email: "albert@gmail.com",
                username: "AlbertKlopper"
            }
        ])
    }

    if (!getData("projects")) {
        saveProjects([
            { id: "PRJ1", name: "Bug Tracker System" },
            { id: "PRJ2", name: "Mobile App Dashboard" },
            { id: "PRJ3", name: "E-commerce Platform" }
        ])
    }

    if (!getData("issues")) {
        saveIssues([
            {
                id: "ISS1",
                summary: "Login button not responding",
                description: "When clicking the login button on the homepage, nothing happens",
                identifiedBy: "Muzi Manaka",
                identifiedDate: "2026-04-10",
                priority: "high",
                status: "open",
                targetDate: "2026-04-20",
                actualResolutionDate: "",
                resolutionSummary: "",
                assignedPersonId: "PRS1",
                projectId: "PRJ1"
            },
            {
                id: "ISS2",
                summary: "Dashboard shows incorrect data",
                description: "The statistics on the dashboard show yesterday's numbers instead of today's",
                identifiedBy: "Daniel Van Onselen",
                identifiedDate: "2026-04-11",
                priority: "medium",
                status: "resolved",
                targetDate: "2026-04-15",
                actualResolutionDate: "2026-04-14",
                resolutionSummary: "Fixed caching issue",
                assignedPersonId: "PRS2",
                projectId: "PRJ2"
            },
            {
                id: "ISS3",
                summary: "Mobile layout broken on iOS",
                description: "Navigation overlaps with content on iPhone",
                identifiedBy: "Seth White",
                identifiedDate: "2026-04-05",
                priority: "high",
                status: "overdue",
                targetDate: "2026-04-10",
                actualResolutionDate: "",
                resolutionSummary: "",
                assignedPersonId: "PRS3",
                projectId: "PRJ3"
            },
            {
            id: "ISS-101",
            summary: "Login button not responding",
            description: "Clicking login does nothing on Chrome",
            identifiedById: "PRS1",
            identifiedDate: "2026-04-01",
            assignedPersonId: "PRS2",
            projectId: "PRJ1",
            priority: "high",
            targetDate: "2026-04-10",
            actualResolutionDate: "",
            resolutionSummary: "",
            status: "overdue"
        },

        {
            id: "ISS-102",
            summary: "Dashboard stats incorrect",
            description: "Numbers not updating after refresh",
            identifiedById: "PRS2",
            identifiedDate: "2026-04-12",
            assignedPersonId: "PRS3",
            projectId: "PRJ2",
            priority: "medium",
            targetDate: "2026-05-01",
            actualResolutionDate: "",
            resolutionSummary: "",
            status: "open"
        },

        {
            id: "ISS-103",
            summary: "Mobile layout broken",
            description: "Navbar overlaps content on iPhone",
            identifiedById: "PRS3",
            identifiedDate: "2026-03-20",
            assignedPersonId: "PRS4",
            projectId: "PRJ3",
            priority: "high",
            targetDate: "2026-03-25",
            actualResolutionDate: "2026-03-24",
            resolutionSummary: "Fixed CSS media queries",
            status: "resolved"
        },

        {
            id: "ISS-104",
            summary: "Search bar lagging",
            description: "Takes 5 seconds to return results",
            identifiedById: "PRS4",
            identifiedDate: "2026-04-15",
            assignedPersonId: null,
            projectId: "PRJ1",
            priority: "low",
            targetDate: "2026-05-05",
            actualResolutionDate: "",
            resolutionSummary: "",
            status: "open"
        },

        {
            id: "ISS-105",
            summary: "API timeout error",
            description: "External API fails intermittently",
            identifiedById: "PRS1",
            identifiedDate: "2026-04-05",
            assignedPersonId: "PRS2",
            projectId: "PRJ2",
            priority: "high",
            targetDate: "2026-04-08",
            actualResolutionDate: "",
            resolutionSummary: "",
            status: "overdue"
        },

        {
            id: "ISS-106",
            summary: "Form validation not working",
            description: "Users can submit empty forms",
            identifiedById: "PRS2",
            identifiedDate: "2026-04-10",
            assignedPersonId: "PRS3",
            projectId: "PRJ3",
            priority: "medium",
            targetDate: "2026-04-20",
            actualResolutionDate: "2026-04-18",
            resolutionSummary: "Added frontend validation",
            status: "resolved"
        },

        {
            id: "ISS-107",
            summary: "Broken image links",
            description: "Product images not loading",
            identifiedById: "PRS3",
            identifiedDate: "2026-04-16",
            assignedPersonId: "PRS1",
            projectId: "PRJ1",
            priority: "low",
            targetDate: "2026-05-10",
            actualResolutionDate: "",
            resolutionSummary: "",
            status: "open"
        },

        {
            id: "ISS-108",
            summary: "Payment gateway failure",
            description: "Transactions failing randomly",
            identifiedById: "PRS4",
            identifiedDate: "2026-03-28",
            assignedPersonId: "PRS2",
            projectId: "PRJ2",
            priority: "high",
            targetDate: "2026-04-02",
            actualResolutionDate: "",
            resolutionSummary: "",
            status: "overdue"
        }
            ])
        }
}