---
name: TypeScript attachment isolation
description: Prevent uploaded reference code from changing the project typecheck.
---

Reference TypeScript files placed in `attached_assets/` can be included by a root `tsconfig.json` when no explicit include/exclude boundary exists. Keep uploaded reference material outside the application typecheck.

**Why:** A proposal file with intentionally incomplete imports caused `npm run lint` to fail even though the application source and production build were valid.

**How to apply:** When attached reference code is not meant to compile, exclude `attached_assets` in the project TypeScript configuration rather than modifying the reference file.