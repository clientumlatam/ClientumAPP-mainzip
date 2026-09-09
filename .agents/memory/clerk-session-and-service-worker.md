---
name: Clerk session and service worker
description: Runtime lessons for external Clerk sessions and service-worker fetch handling.
---

An instance-mismatched Clerk cookie can produce a `jwk-kid-mismatch` error and prevent the public page from rendering if middleware forwards the error directly. Treat the request as signed out for public access, while protected routes still enforce authentication.

**Why:** Preview testing exposed a session token signed by a different external Clerk instance; the public landing page should remain recoverable instead of showing an Express error page.

**How to apply:** Keep Clerk middleware error handling guarded, and resolve the underlying external publishable/secret key mismatch without printing or rotating secrets in code.

Service workers must not intercept cross-origin Clerk assets and must always resolve `respondWith()` with a `Response` when a same-origin request fails.

**Why:** The previous fetch fallback returned `undefined`, causing browser errors while loading Clerk's remote script.

**How to apply:** Restrict interception to same-origin GET requests, version the cache when changing worker behavior, and return `Response.error()` when no cached fallback exists.