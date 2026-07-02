# Arshadali M Athani Portfolio Website

Personal portfolio website for Arshadali M Athani, a Computer Science undergraduate and aspiring Data Analyst. Built entirely from scratch with vanilla HTML5, CSS3, and JavaScript, with no frameworks, libraries, or build tools.

## Built With

- HTML5
- CSS3
- Vanilla JavaScript

## Features

- Custom animated canvas background with a mouse-reactive data-node network.
- Interactive, tabbed skills section covering Languages, Analysis, Visualization, Machine Learning, Databases, and Tools.
- Two detailed project case studies with expandable descriptions.
- Animated stat counters and an animated SVG chart in the hero section.
- Scroll-triggered reveal animations and a scroll progress bar.
- Fully responsive layout for desktop, tablet, and mobile.
- Accessible interface with visible keyboard focus states and support for `prefers-reduced-motion`.

## Run Locally

Because this is a static site, you can simply open `index.html` in your browser. If you prefer serving it locally, run `python -m http.server 8000` from the project folder and visit `http://localhost:8000`.

## Customize

Most content can be edited directly without any build step:

- Personal details, section copy, project summaries, timeline entries, certifications, and contact links live in `index.html`.
- Styling tokens and theme values are defined as CSS variables at the top of `style.css`.
- Skills data is stored in the `SKILLS_DATA` object in `script.js`.

Update those three files to change your name, project descriptions, skills, colors, and contact information.

## Folder Structure

```text
portfolio/
├── index.html
├── style.css
└── script.js
```

## Author

- GitHub: [Arshadali04](https://github.com/Arshadali04)
- LinkedIn: [arshadali4](https://linkedin.com/in/arshadali4)

## License

MIT License
