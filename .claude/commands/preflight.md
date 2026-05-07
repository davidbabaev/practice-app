---
description: Run npm run build and report pass/fail, duration, and any error
---

Run `npm run build` from the project root, timing it. Use a single bash call so duration and exit code are captured regardless of build outcome:

```bash
start=$(date +%s); npm run build; rc=$?; end=$(date +%s); printf '\n[preflight] duration=%ss exit=%s\n' "$((end-start))" "$rc"
```

Report back with:
- **Status** — passed (exit=0) or failed
- **Duration** — seconds, from the `[preflight]` marker line
- **Error** (only if failed) — the exact error block from the build output, verbatim in a fenced code block. No paraphrasing, no truncation of the relevant error, no inferred root causes.

Do not suggest fixes, retry, or run additional commands unless I ask in a follow-up.
