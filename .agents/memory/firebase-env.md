---
name: Firebase environment propagation
description: Firebase client configuration must be injected from the server environment and Auth/Analytics must tolerate missing public config during local startup.
---

Platform secrets may exist in the workspace inventory without being present in the dev process or Vite client bundle immediately. Expose only the public `VITE_FIREBASE_*` configuration through the Vite server definition, keep server credentials backend-only, and guard Firebase Auth/Analytics initialization when the public config is unavailable.

**Why:** Initializing Firebase Auth with an empty API key crashes the entire React mount with `auth/invalid-api-key`, producing a blank preview.

**How to apply:** When changing Firebase or Replit secret wiring, restart the workflow, run `npm run smoke:navigation`, and verify the browser preview before delivery.