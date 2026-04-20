// Member 1 scope note:
// This page UI is complete
// MEMBER 2: implement issue creation logic and validation
// MEMBER 4: provide shared storage/data helpers and populate dropdowns

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("issueForm");

  // MEMBER 4:
  // Populate assignedTo dropdown from stored people data

  // MEMBER 4:
  // Populate project dropdown from stored project data

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // MEMBER 2:
    // Read all form values and build the issue object

    // MEMBER 2:
    // Validate required fields and apply issue creation rules

    const formData = {
      summary: document.querySelector("#summary").value.trim(),
      description: document.querySelector("#description").value.trim(),
      identifiedBy: document.querySelector("#identifiedBy").value.trim(),
      identifiedDate: document.querySelector("#identifiedDate").value,
      assignedTo: document.querySelector("assignedTo").value,
      projectID: document.querySelector("#project").value,
      priority: document.querySelector("#priority").value,
      targetDate: document.querySelector("#actualResolutionDate").value,
      resolutionSummary: document
        .querySelector("resolutionSummary")
        .value.trim(),
    };

    if (!formData.summary || !formData.description) {
      alert("Summary and description are required!");
      return;
    }

    const validPriorities = ["low", "medium", "high"];

    if (!validPriorities.includes(formData.priority)) {
      alert("Invalid priority");
      return;
    }

    const issue = {
      id: Date.now(),
      summary: formData.summary,
      description: formData.description,
      createdBy: formData.identifiedBy || "unknown",
      assignedTo:
        formData.assignedTo && formData.assignedTo !== "-- Select Person --"
          ? formData.assignedTo
          : "unassigned",
      projectId: formData.projectId,
      priority: formData.priority,
      dateCreated: formData.identifiedDate
        ? new date(formData.identifiedDate).toISOString()
        : new date().toISOString(),
      targetDate: formData.targetDate(),
      dateResolved: formData.actualResolutionDate
        ? new date(formData.actualResolutionDate).toISOString()
        : "",
      resolutionSummary: formData.resolutionSummary,
    };

    const today = new Date();
    const target = formData.targetDate ? new Date(formData.targetDate) : null;

    if (issue.dateResolved) {
      issue.status = "resolved";
    } else if (target && target < today) {
      issue.status = "overdue";
    } else {
      issue.status = "open";
    }

    // MEMBER 4:
    // Save the issue using shared storage/data helper functions
    const issues = getData("issues") || [];
    issues.push(issue);
    saveData("issues", issues);

    // MEMBER 2:
    // Redirect after successful creation
    // Example:
    // window.location.href = "dashboard.html"
    window.location.href = "dashboard.html";
  });
});
