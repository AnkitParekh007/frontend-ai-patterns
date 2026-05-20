# Threat Modeling Checklist

- What frontend context is serialized and sent to the backend?
- Which fields could leak sensitive tenant or record information?
- Can a user trigger a risky action without an explicit checkpoint?
- Could a blocked action be mistaken for a system bug and bypassed operationally?
- Are tool results or citations exposing more than the user should see?
- Are retry flows idempotent or obviously marked as unsafe to repeat?
- Are operator-visible audit states preserved when the page reloads or reconnects?
