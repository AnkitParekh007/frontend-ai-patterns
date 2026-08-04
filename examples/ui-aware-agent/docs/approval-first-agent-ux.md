# Approval-First Agent UX

The approval pattern in this repo is intentionally simple:

- low-risk review actions can run immediately
- medium and high-risk workflow actions produce an approval request
- the user can approve or reject before mock execution
- rejected actions surface a recovery or safer-review path

This keeps the interaction model understandable and avoids the usual “agent did something behind the scenes” ambiguity.
