// Member 1 scope note:
// This page UI and page-to-page navigation are complete
// MEMBER 1: read the URL id for navigation purposes and handle navigation to edit.html
// MEMBER 3: retrieve the selected issue and display all fields
// MEMBER 4: provide shared storage/data helpers

function getIssueId() {
    const params = new URLSearchParams(window.location.search)
    return params.get("id")
}

function goToEditIssue() {
    const id = getIssueId()
    window.location.href = `edit.html?id=${id}`
}

document.addEventListener("DOMContentLoaded", () => {
    // MEMBER 3:
    // Read the issue id from the URL

    // MEMBER 3:
    // Retrieve the issue from storage

    // MEMBER 3:
    // Populate all spans on this page with the issue data
})