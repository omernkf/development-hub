# OMER DESIGN — Netlify continuous deployment

The `development-hub` repository can host the complete OMER DESIGN site source in a `site/` subdirectory while `projects/` remains the shared registry.

1. Upload the contents of `OMER-DESIGN-GitHub-Netlify-Connected.zip` into **the root of this repository**. Keep `site/index.html` and `site/js/developer.js` in their exact paths.
2. Open the existing **omdesign** project in Netlify. Connect the GitHub repository `omernkf/development-hub` with branch `main`.
3. **Base directory:** blank. **Build command:** blank. **Publish directory:** `site`.
4. Deploy, then test `https://omdesign.netlify.app/` and `/developer.html`.

Do not turn on Git-based deployments until the complete `site/` directory is in GitHub. The existing manual deployment is not changed by this README.

The public project registry is `projects/projects.json`. The developer page requests it from `https://raw.githubusercontent.com/omernkf/development-hub/main/projects/projects.json` with a local fallback if unreachable.

Never upload `.env` keys, Android signing keys, phonebook datasets, database exports, or private repository contents. Do not claim `solo.is-a.dev` as active until registration and DNS are confirmed.
