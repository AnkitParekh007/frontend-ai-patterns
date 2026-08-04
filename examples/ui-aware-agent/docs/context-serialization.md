# Context Serialization

UI-aware agents are only trustworthy if the application is clear about what the agent is allowed to see.

This demo serializes:
- route
- page title
- selected record id
- visible fields
- user role
- selected record status
- selected record owner

It does not claim to read the entire DOM or hidden application state. The goal is to make context deliberate, inspectable, and safe to discuss with users.
