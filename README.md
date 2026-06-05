# Palm Grove Residency — Business Directory

A clean, responsive **ReactJS** web app that lets residents of a gated
community discover and contact local businesses and services — from groceries
and clinics to tutors, salons, and home repairs.

> Built with [Vite](https://vitejs.dev/) + React 19. No backend required —
> seed data ships with the app and resident-submitted listings are persisted
> in the browser via `localStorage`.

## Features

- 🔎 **Live search** across business names, taglines, descriptions, and tags
- 🏷️ **Category filters** (Food, Grocery, Health, Home Services, Education,
  Fitness, Beauty, Professional, Pets, Retail) with live counts
- ⭐ **Featured businesses** highlighted on the home view
- 📇 **Detail view** with hours, address, owner, and click-to-call / email /
  website actions
- ➕ **"List your business" form** with validation; new listings are saved
  locally and appear instantly in the directory
- 📱 **Responsive** layout that works on mobile and desktop

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

## Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR           |
| `npm run build`   | Production build to `dist/`                   |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint                                    |

## Project structure

```
src/
  components/        Reusable UI (cards, modals, filters, search)
  data/businesses.js Seed data + category definitions
  hooks/             useLocalStorage hook
  App.jsx            App shell, state, filtering logic
```

## Notes

The data set (Palm Grove Residency, its businesses, owners, and contact
details) is fictional sample content. Replace `src/data/businesses.js` with
your community's real listings, or wire the app up to a backend/API to manage
listings centrally.
