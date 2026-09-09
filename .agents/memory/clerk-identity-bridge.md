---
name: Clerk identity bridge
description: Guardrails for synchronizing Clerk's user state into React application state.
---

The Clerk-to-application bridge must synchronize only when the Clerk `userId` changes, and must not depend on context callbacks recreated on every render.

**Why:** Calling state setters from an effect whose dependencies include unstable context functions can create a render loop; in this app it surfaced as a blank preview and Clerk session refresh warnings.

**How to apply:** Keep the bridge idempotent with a last-seen user identifier, stabilize the sync callback with `useCallback`, and avoid adding non-memoized context actions to the bridge effect dependencies.