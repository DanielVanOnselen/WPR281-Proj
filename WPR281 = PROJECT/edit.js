// Member 1 scope note:
// This page UI is complete
// MEMBER 3: load the selected issue, populate fields, and save changes
// MEMBER 4: provide shared storage/data helpers and dropdown data

document.addEventListener("DOMContentLoaded", () => {
    // MEMBER 4:
    // Populate people dropdown

    // MEMBER 4:
    // Populate project dropdown

    // MEMBER 3:
    // Read the issue id from the URL

    // MEMBER 3:
    // Load the selected issue into the edit form

    document.getElementById("editForm").addEventListener("submit", function (e) {
        e.preventDefault()

        // MEMBER 3:
        // Read updated field values

        // MEMBER 3:
        // Update the selected issue object

        // MEMBER 4:
        // Save updated issue through shared storage logic

        // MEMBER 3 / MEMBER 4:
        // Redirect after successful save
        // Example:
        // window.location.href = "view.html?id=..."
    })
})