# Project State

## Project overview
- Static personal portfolio site for Anni Metsäniitty.
- Presents profile information, skills, selected projects, and contact details.
- Uses JSON files for content management and vanilla JavaScript for dynamic rendering.

## Current features
- Single-page portfolio layout with sections for Home, Projects, Skills, Profile, and Contact.
- Sticky navigation with smooth scrolling and active section highlighting.
- Project grid rendered from `projects.json`.
- Project search and tag-based filtering.
- Static section content loaded from separate JSON files.
- Back-to-top button.
- Responsive layout with custom local fonts and visual assets.

## Tech stack
- HTML5
- CSS3
- Vanilla JavaScript
- JSON for content/data storage
- GitHub Pages-style static site structure

## Project structure
- `index.html`: page shell and section containers
- `css/styles.css`: global layout and section styling
- `css/projects.css`: projects section and shared button styles
- `js/content.js`: loads and renders static content from JSON
- `js/projects.js`: loads, renders, and filters project cards
- `js/main.js`: nav behavior, scroll handling, back-to-top button
- `projects.json`: project card data
- `data/`: section content JSON files
- `assets/`: images, SVGs, and fonts

## Current state
- Core portfolio experience is implemented and structured for static hosting.
- Most visible content has been moved out of `index.html` into JSON files.
- Existing layout and styling hooks are preserved.
- Project content is scalable through JSON updates without editing HTML.
- No build process, test suite, or content validation pipeline is in place.

## Known issues or bugs
- No automated tests or browser-based verification in the repo.
- Font Awesome is linked from a CDN but does not appear to be used.
- Content rendering depends on JavaScript; without it, only the projects noscript message is shown.
- Some text content contains copy issues carried over from the source content.

## Next steps / TODOs
- Run a browser pass to verify the JSON-rendered sections match the previous layout.
- Consider adding a fallback or minimal server-rendered content for non-JavaScript users.
- Clean up unused dependencies such as the Font Awesome CDN link if not needed.
- Review and polish portfolio copy for spelling, grammar, and consistency.
- Optionally move `projects.json` into the `data/` folder for consistency.
