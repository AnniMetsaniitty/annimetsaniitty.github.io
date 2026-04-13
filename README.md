# Anni Metsäniitty Portfolio

## Description
This repository contains a static portfolio website for Anni Metsäniitty. It presents profile information, skills, selected projects, and contact details in a single-page layout.

The site is built without a framework and uses JSON files to keep page content separate from the HTML structure, making updates easier to manage in a static hosting setup.

## Features
- Single-page portfolio with Home, Projects, Skills, Profile, and Contact sections
- Sticky navigation with smooth scrolling and active section highlighting
- Project cards loaded from JSON data
- Project search and tag filtering
- Static section content loaded dynamically from JSON files
- Responsive layout with local assets and custom fonts

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript
- JSON

## Installation
1. Clone the repository:

```bash
git clone https://github.com/AnniMetsaniitty/annimetsaniitty.github.io.git
```

2. Move into the project directory:

```bash
cd annimetsaniitty.github.io
```

3. Start a local static server from the repository root.

Using Python:

```bash
python3 -m http.server 8000
```

## Usage
Open the site in a browser after starting the local server:

```text
http://localhost:8000
```

Content can be updated without changing the main HTML layout:
- Edit files in `data/` to update section content such as navigation, hero text, skills, profile, and contact details.
- Edit `projects.json` to add or update project cards shown in the Projects section.

## Project Structure
```text
.
├── assets/          # Images, SVGs, and local fonts
├── css/             # Global and projects-specific styles
├── data/            # Static section content in JSON format
├── js/              # Content rendering and page interaction scripts
├── index.html       # Main page shell
├── projects.json    # Project listing data
└── PROJECT_STATE.md # Internal project state summary
```

## Future Improvements
- Add browser-based or automated testing for the static site
- Improve non-JavaScript fallbacks for content rendering
- Further streamline content organization for static data

## Author
Anni Metsäniitty
