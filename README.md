# Bhavneet Singh — Portfolio Website

## Folder Structure
```
bhavneet-portfolio/
├── index.html              ← Main site file
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles
│   ├── js/
│   │   └── main.js         ← All interactions
│   └── images/             ← All photos
│       ├── hero.jpg
│       ├── outdoor-1.jpg
│       ├── outdoor-2.jpg
│       ├── uspa-warm.jpg
│       ├── fitness-new.jpg
│       ├── cap.jpg
│       ├── watch-new.jpg
│       ├── sunglass-bw.jpg
│       ├── sunglass-col.jpg
│       └── bw-watch.jpg
└── README.md
```

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `bhavneet-portfolio`)
2. Upload the entire contents of this folder to the repository root
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch` → `main` → `/ (root)`
5. Click **Save** — your site will be live at `https://yourusername.github.io/bhavneet-portfolio/`

## To Replace or Add Photos

Just drop a new `.jpg` file into `assets/images/` using the same filename as the one you want to replace. No code changes needed.

To add a new photo to the portfolio grid, add this block to `index.html` inside `<div class="port-grid">`:

```html
<div class="port-item" data-c="CATEGORY" tabindex="0" role="button" aria-label="Description">
  <img src="assets/images/YOUR-FILENAME.jpg" alt="Description" loading="lazy">
  <div class="port-ov" aria-hidden="true"><span class="port-lbl">Label</span></div>
</div>
```

Categories: `editorial`, `commercial`, `lifestyle`, `fitness`
