# Implementation Checklist

- serialize only the state the backend truly needs
- redact sensitive or irrelevant fields before transport
- keep context payloads inspectable in development
- version context snapshots if the shape changes over time
- avoid sending the entire client store by default
