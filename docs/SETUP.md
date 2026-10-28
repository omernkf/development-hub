# Setup and deployment

## Purpose
`development-hub` is the **public index** of projects. Keep each application's source code, secrets, databases and deployment configuration in their respective repositories.

## Publish a project
1. Create or maintain the project's own repository.
2. Add a public description, verified live-demo URL, and optional public source link to `projects/projects.json`.
3. Update the main README project list.
4. Never publish credentials, database dumps, phone numbers, private releases or source code from private repositories.

## OMER DESIGN and Netlify
The website is currently at https://omdesign.netlify.app/ and was published via manual deployment. Updating this hub does **not** redeploy it.

To enable continuous deployment, first create a separate site-source repository and push the site's actual files to it. Then in the existing Netlify project's deployment configuration connect that repository and verify the publish directory. Avoid linking this metadata-only hub as the build source for the live website.

## Domain
`solo.is-a.dev` is a requested domain, subject to independent acceptance and DNS configuration. Retain OMER DESIGN branding.

## Maintenance
Keep only verified public URLs. When a project goes private or a public release becomes inaccessible, remove its public download link rather than guessing.
