# Implementation Checklist

- keep a stable message id across all chunks
- reduce stream events in one store or signal graph
- expose visible states for thinking, streaming, complete, and failed
- keep retry and cancel actions close to the active assistant row
- separate transport completion from message completion
