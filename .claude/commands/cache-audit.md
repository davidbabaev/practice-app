---
description: Scan app router pages and layouts for uncached data access outside Suspense boundaries
---

Audit every `app/**/page.tsx` and `app/**/layout.tsx` for Cache Components violations: uncached data access that sits outside a `<Suspense>` boundary on a route that doesn't redeem the access another way.

## Files to skip entirely

- Any file whose **first non-empty, non-comment line** is `'use client'` or `"use client"`. Client components don't follow the same uncached-access rules and would produce false positives.

## Uncached data access patterns to flag

In a `cacheComponents: true` project, these read uncached data when used directly in a server component body:
- `await params`, `await searchParams`
- `headers()`, `cookies()`, `draftMode()` from `next/headers`
- `fetch(...)` calls not inside a function annotated with `'use cache'`

## Safe contexts (never flag, even without `<Suspense>`)

These functions are processed by Next.js outside the render tree, so uncached access inside them is correct code:
- `generateMetadata`
- `generateViewport`
- `generateStaticParams`

A call site is in a safe context if the enclosing function declaration is one of the above (top-level export in the file). Calls in nested helpers invoked from these functions also count as safe.

## Audit rules

For each non-skipped file:

1. List all call sites for the uncached patterns above, **excluding any inside a safe context**.
2. **Same-file Suspense check**: a remaining call site is OK if the function containing it is rendered as a child of `<Suspense>` at every site within this file. A direct call in the default-export body with no enclosing `<Suspense>` is a violation. Cross-file imports are not traced — flag with low confidence if unsure.
3. **`await params` exception** (page.tsx only): if the file exports `generateStaticParams`, treat `await params` accesses in render code as safe. Other uncached APIs are still flagged.
4. **`fetch` exception**: a fetch inside a function with the `'use cache'` directive is safe.

## Steps

1. Use Glob to find `app/**/page.tsx` and `app/**/layout.tsx`.
2. Read each file in full — Suspense placement and safe-context boundaries are not visible to grep.
3. Apply the skip rule, then the audit rules.
4. Record violations with file path, line number, and which API is the issue.

## Output

If clean:
> ✓ No violations. All page/layout files in `app/` are compliant.

Otherwise, one bullet per violation:
> - **{path}:{line}** — `{api}` outside `<Suspense>`. {one-line reason}

End with a count: `{n} violation(s) across {m} file(s).` Mention any files that were skipped as client components.

Do not propose fixes or modify files unless I follow up.
