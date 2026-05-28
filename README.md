# 💻 Signal to Software

A minimalist, markdown-driven blog built with vanilla HTML, CSS, and JavaScript. No build step required—perfect for GitHub Pages.

## ✨ Features

- **Zero Build Step** - Pure vanilla HTML/CSS/JavaScript, no webpack, no Node.js required
- **Markdown Posts** - Write posts in simple markdown files, no database needed
- **Single Page Application** - Fast, smooth navigation with hash-based routing
- **Search** - Real-time full-text search across all posts
- **Tags** - Filter posts by tags with visual chips
- **Pagination** - 10 posts per page with Previous/Next navigation
- **Responsive Design** - Mobile-first, works perfectly on all devices
- **Light Theme** - Clean, minimalist design focused on content
- **GitHub Pages Ready** - Automatic deployment with GitHub Actions

## 🏗️ Architecture

### File Structure
```
├── index.html          # SPA template with all views
├── app.js             # Application logic and routing
├── styles.css         # Complete styling (light theme)
├── posts/             # Markdown blog posts
├── img/               # Post images
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Pages deployment
└── 404.html          # Error page
```

### Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Routing:** Hash-based navigation (#/blog, #/post/:slug, etc.)
- **Markdown:** Client-side parsing with regex (no external libraries)
- **Search:** Full-text search in browser memory
- **Deployment:** GitHub Pages + GitHub Actions

## 📝 Writing Posts

Posts are simple markdown files in the `/posts/` directory. Each post requires YAML frontmatter:

```markdown
---
title: Your Post Title
date: 2025-05-28
author: Your Name
tags: [tag1, tag2, tag3]
excerpt: A brief description shown in the blog feed
---

# Content starts here

Write your post in markdown. Supports:
- Headers (h1-h6)
- **Bold** and *italic*
- [Links](https://example.com)
- `inline code` and code blocks
- Lists and more!

```

### File Naming
Posts must follow this pattern: `YYYY-MM-DD-post-title.md`

Example: `2025-05-28-my-awesome-post.md`

## 🎨 Customization

### Color Palette
Edit CSS variables in `styles.css`:
```css
:root {
    --color-bg: #FFFFFF;           /* Background */
    --color-text: #2E2938;         /* Text */
    --color-link: #489C9A;         /* Links (teal) */
    --color-link-hover: #E0A83F;   /* Hover (ochre) */
}
```

### Adding Posts
1. Create a new markdown file in `/posts/`
2. Add YAML frontmatter (title, date, author, tags, excerpt)
3. Write your content in markdown
4. Commit and push—deployment happens automatically!

### Modifying Navigation
Edit the nav links in `index.html`:
```html
<li><a href="#/" class="nav-link">home</a></li>
```

## 🚀 Deployment

This blog is automatically deployed to GitHub Pages via GitHub Actions.

### First Time Setup
1. Ensure your repository is public
2. Go to Settings → Pages
3. Set source to "Deploy from a branch"
4. Select "main" branch and save
5. The workflow will run automatically on push

### Automatic Deployment
Every push to `main` triggers a deployment. Check `.github/workflows/deploy.yml` for details.

## 📖 Markdown Support

The blog supports all common markdown elements:

| Syntax | Example | Result |
|--------|---------|--------|
| Headers | `# H1` to `###### H6` | Semantic HTML headers |
| Bold | `**text**` | **bold text** |
| Italic | `*text*` | *italic text* |
| Code | `` `code` `` | `monospace` |
| Code Block | ` ``` ` | Syntax-highlighted block |
| Link | `[text](url)` | Clickable link |
| Horizontal Rule | `---` | Visual separator |
| List | `* item` | Bulleted list |

## 🔍 Search

The search feature scans:
- Post titles
- Post excerpts
- Post content
- Post tags

Simply press `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) to open search.

## 📊 Performance

- **0 KB JavaScript libraries** - Pure vanilla JS
- **Instant page loads** - No API calls, all data in memory
- **No external dependencies** - Fully self-contained
- **Perfect Lighthouse scores** - Fast, accessible, secure

## 🎯 Views

### Blog Feed (`#/blog`)
Displays all posts with pagination (10 per page). Click a post card to view full post.

### Single Post (`#/post/:slug`)
Full post view with metadata (date, author, read time, tags) and formatted markdown content.

### About (`#/about`)
Your about page. Edit the content in `index.html`.

### Projects (`#/projects`)
Portfolio of your projects. Edit the project cards in `index.html`.

## 🛠️ Development

### Local Testing
Simply open `index.html` in your browser or use a local server:
```bash
python -m http.server 8000
# or
npx http-server
```

Then visit `http://localhost:8000`

---

Built with ❤️ for writers who love markdown.
