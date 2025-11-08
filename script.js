const form = document.getElementById("issueForm");
const issuesList = document.getElementById("issuesList");

// Load issues from localStorage
let issues = JSON.parse(localStorage.getItem("issues")) || [];

// Save issues to localStorage
function saveIssues() {
  localStorage.setItem("issues", JSON.stringify(issues));
}

// Render issues
function renderIssues() {
  issuesList.innerHTML = "";
  if (issues.length === 0) {
    issuesList.innerHTML = "<p>No issues yet. Add one above!</p>";
    return;
  }
  issues.forEach((issue, index) => {
    const div = document.createElement("div");
    div.className = "issue";
    div.innerHTML = `
      <h3>${issue.title}</h3>
      <p>${issue.desc}</p>
      <p><strong>Severity:</strong> ${issue.severity}</p>
      <p><strong>Assigned To:</strong> ${issue.assignedTo}</p>
      <p class="status ${issue.status === 'Closed' ? 'closed' : ''}">
        Status: ${issue.status}
      </p>
      <div class="actions">
        <button onclick="toggleStatus(${index})">${
      issue.status === "Open" ? "Close" : "Reopen"
    }</button>
        <button onclick="deleteIssue(${index})">Delete</button>
      </div>
    `;
    issuesList.appendChild(div);
  });
}

// Add new issue
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("issueTitle").value.trim();
  const desc = document.getElementById("issueDesc").value.trim();
  const severity = document.getElementById("issueSeverity").value;
  const assignedTo = document.getElementById("issueAssignedTo").value.trim();

  if (!title || !desc || !severity || !assignedTo) return;

  const issue = {
    title,
    desc,
    severity,
    assignedTo,
    status: "Open",
  };

  issues.push(issue);
  saveIssues();
  renderIssues();
  form.reset();
});

// Toggle issue status
function toggleStatus(index) {
  issues[index].status = issues[index].status === "Open" ? "Closed" : "Open";
  saveIssues();
  renderIssues();
}

// Delete issue
function deleteIssue(index) {
  if (confirm("Are you sure you want to delete this issue?")) {
    issues.splice(index, 1);
    saveIssues();
    renderIssues();
  }
}

// Initial render
renderIssues();