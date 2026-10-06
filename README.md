# Portfolio links page

Static site for GitHub Pages.

## Setup

1. Push this repo to GitHub (branch `main`).
2. **Settings → Pages → Source: GitHub Actions**.

## Editing links

Edit `data/links.json` (on GitHub, press `.` in the repo for the web editor). Each commit redeploys in about a minute.

```json
{
  "profile": { "name": "Your Name", "bio": "Developer" },
  "links": [
    { "title": "GitHub", "url": "https://github.com/you", "desc": "My code", "image": "img/github.png" }
  ]
}
```

- `image` is optional: use `""`, a full URL, or a file you add to `img/`.
- Link URLs are limited to `http(s)`, `mailto` and `tel` when rendered.
