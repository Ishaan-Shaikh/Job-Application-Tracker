# JobTrack – Job Application Tracker

Front-end project built with **React + Vite** (HTML5, CSS3, JavaScript).
4 responsive pages: Dashboard, All Jobs, Add/Edit Job, About.
Data is saved in the browser with localStorage (no backend).

## Run locally
```
npm install
npm run dev
```
Open the link shown in the terminal (it ends with `/Job-Application-Tracker/`).

## Deploy to GitHub Pages
```
npm run deploy
```
Then on GitHub: Settings → Pages → Source: "Deploy from a branch" → branch `gh-pages` / folder `/ (root)`.

## Project structure
```
index.html            one HTML page with <div id="root">
vite.config.js        Vite settings (base = repo name)
src/main.jsx          starts React + router
src/App.jsx           Navbar + routes + Footer
src/storage.js        localStorage + helper functions
src/index.css         all styles (Flexbox + Grid)
src/components/       Navbar, Footer, StatCard, JobCard
src/pages/            Dashboard, Jobs, AddJob, About
```
