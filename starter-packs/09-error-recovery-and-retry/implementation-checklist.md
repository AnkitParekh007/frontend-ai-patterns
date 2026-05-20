# Implementation Checklist

- classify failure causes before rendering recovery ui
- expose retry and fallback as different decisions
- make escalation paths explicit for non-retryable failures
- preserve partial user context after failure
- avoid generic error toasts as the only recovery surface
