# Anni Metsäniitty Portfolio

## Live Demo
[View Live Site](https://annimetsaniitty.github.io)

## Description
This repository contains a static portfolio website for Anni Metsäniitty, created to showcase front-end development skills and selected projects.

The site uses JSON files to separate content from structure, making updates easier in a static hosting environment.

## Features
- Single-page portfolio with Home, Projects, Skills, Profile, and Contact sections
- Sticky navigation with smooth scrolling and active section highlighting
- Project cards loaded from JSON data
- Project search and tag filtering
- Section content dynamically loaded from JSON files
- Responsive layout with local assets and custom fonts

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript
- JSON

## Local Development

To run the project locally:

1. Clone the repository:
   git clone https://github.com/AnniMetsaniitty/annimetsaniitty.github.io.git

2. Move into the project directory:
   cd annimetsaniitty.github.io

3. Start a local server (required for JSON fetching):
   python3 -m http.server 8000

4. Open in browser:
   http://localhost:8000

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
