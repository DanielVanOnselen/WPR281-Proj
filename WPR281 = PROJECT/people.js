checkAuth()

document.addEventListener("DOMContentLoaded", () => {
    if (typeof initData === "function") {
        initData()
    }

    renderPeople()

    const form = document.getElementById("personForm")

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        const newPerson = {
            name: document.getElementById("personName").value.trim(),
            surname: document.getElementById("personSurname").value.trim(),
            email: document.getElementById("personEmail").value.trim(),
            username: document.getElementById("personUsername").value.trim()
        }

        if (!newPerson.name || !newPerson.surname || !newPerson.email || !newPerson.username) {
            alert("Please fill in all person fields")
            return
        }

        AddNewPerson(newPerson)
        form.reset()
        renderPeople()
    })
})

function renderPeople() {
    const people = getPeople() || []
    const tableBody = document.getElementById("peopleTableBody")

    tableBody.innerHTML = ""

    if (people.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-muted">No people found</td></tr>`
        return
    }

    people.forEach(person => {
        const assignedIssues = getIssuesByPersonId(person.id).length

        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.surname}</td>
            <td>${person.email}</td>
            <td>${person.username}</td>
            <td>${assignedIssues}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removePerson('${person.id}')">Delete</button>
            </td>
        `
        tableBody.appendChild(row)
    })
}

function removePerson(id) {
    const confirmed = confirm("Are you sure you want to delete this person?")
    if (!confirmed) return

    const deleted = deletePerson(id)

    if (deleted) {
        renderPeople()
    } else {
        alert("Person could not be deleted")
    }
}