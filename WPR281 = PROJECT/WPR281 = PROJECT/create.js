// Member 1 scope note:
// This page UI is complete
// MEMBER 2: implement issue creation logic and validation
// MEMBER 4: provide shared storage/data helpers and populate dropdowns

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("issueForm")

    // MEMBER 4:
    // Populate assignedTo dropdown from stored people data

    // MEMBER 4:
    // Populate project dropdown from stored project data

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        // MEMBER 2:
        // Read all form values and build the issue object

        // MEMBER 2:
        // Validate required fields and apply issue creation rules

        // MEMBER 4:
        // Save the issue using shared storage/data helper functions

        // MEMBER 2:
        // Redirect after successful creation
        // Example:
        // window.location.href = "dashboard.html"
    })
})