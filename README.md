
# Bug Tracking System
Project Overview

This project is a web-based Bug Tracking System that allows users to create, assign, track, and manage issues across multiple projects.

The system is built using:

HTML
Bootstrap (UI design)
JavaScript (application logic)
localStorage (data persistence layer)

It follows a modular team-based architecture where each member is responsible for a specific part of the system.

Team Responsibilities
Member Responsibility
Member 1 UI (Frontend, layout, navigation, Bootstrap)
Member 2 Core Logic (Issue creation, validation, status logic)
Member 3 View & Edit (Display and update issues)
Member 4 Data Layer (storage.js, localStorage, shared functions)

Features
Create new issues
Assign issues to people
Link issues to projects
Dynamic dropdowns (People & Projects)
Automatic status calculation:
Open
Overdue
Resolved
Priority levels:
Low
Medium
High
Dashboard with Kanban-style layout
Persistent storage using localStorage
People management (add, delete, track workload)

System Architecture

1. UI Layer
   Built using HTML + Bootstrap
   Handles:
   Forms
   Dashboard display
   Navigation

2. Logic Layer (JavaScript)
   Handles:
   Form data collection
   Validation
   Issue creation
   Status calculation
   Dynamic UI updates

Key files:
create.js
dashboard.js
people.js
storage.js

Centralized data management using localStorage.

Handles:
Saving data
Retrieving data
Updating records
Maintaining relationships

File Structure
project/
│
├── dashboard.html
├── create.html
├── people.html
├── projects.html
├── view.html
│
├── dashboard.js
├── create.js
├── people.js
├── storage.js
|── view.js
│
├── form.css

System Flow

User opens Create Issue page
Dropdowns are populated dynamically:
People → getPeople()
Projects → getProjects()
User submits form

create.js:
Collects form data
Validates required fields
Builds issue object
Calculates status
Issue is saved via:
getIssues()
saveIssues()
User is redirected to dashboard

dashboard.js:
Retrieves issues
Renders them into:
Open
Overdue
Resolved columns

Issue Data Structure
{
id: "ISS1",

summary: "Login button not working",
description: "Clicking login does nothing",

identifiedById: "PRS1",
identifiedDate: "2026-04-21",

assignedPersonId: "PRS2",
projectId: "PRJ1",

status: "open",
priority: "high",

targetDate: "2026-04-25",
actualResolutionDate: "",
resolutionSummary: ""
}

Data Relationships

The system uses ID-based relationships:

identifiedById → links to People
assignedPersonId → links to People
projectId → links to Projects

This ensures:

Data consistency
Scalability
Easy filtering and lookup
People Management
Features
Add new people
Display people in a table
Delete people
Track number of assigned issues

Data Structure
{
id: "PRS1",
name: "John",
surname: "Doe",
email: "john@email.com",
username: "jdoe"
}

Key Functions
AddNewPerson(person)
getPeople()
deletePerson(id)
renderPeople()
Relationship with Issues
getIssuesByPersonId(person.id)

Project Management Features
Create projects
Delete projects
Link issues to projects

Data Structure
{
id: "PRJ1",
name: "Bug Tracker System"
}

Data Layer (storage.js)
Core Functions
saveData(key, data)
getData(key)
ID Generation
getNextId(prefix, items)

Prefixes:

PRS → People
PRJ → Projects
ISS → Issues
Issue Functions
getIssues()
AddNewIssue(issue)
updateIssue(id, updates)
deleteIssue(id)

Filtering:

getIssuesByProjectId(projectId)
getIssuesByPersonId(personId)
Data Integrity Rules
Deleting a person:
Removes assignment from issues (assignedPersonId → null)
Deleting a project:
Removes all related issues
Prevents broken references
Initialization
initData()

Initializes:

Sample People
Sample Projects
Sample Issues

Ensures system works immediately on first load.

Data is stored in localStorage under:

"issues"
"people"
"projects"

Example:

localStorage.getItem("issues")

Important Notes

Status is automatically calculated
IDs are used instead of names
All modules must use shared storage functions
Data persists across page refreshes
Known Limitations

No backend
Data is browser-specific

Future Improvements
Replace localStorage with Web API
Add authentication system
Implement database storage
Add search/filtering
Improve UI/UX

Conclusion

This project demonstrates:

Modular frontend architecture
JavaScript-based application logic
Data persistence without a backend
Proper use of relational data structures

It provides a complete issue lifecycle:
Create → Store → Display → Manage
