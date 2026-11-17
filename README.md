# Shoptik Production — Studio OS (UI/UX demo)

Frontend-only clickable prototype. Pure HTML/CSS/JS — no build step, no backend. All data is dummy and lives in memory (resets on refresh).

## Run locally
Open `index.html` in a browser, or serve the folder:

```
python -m http.server 5500
```

## Deploy to Vercel
1. Push this folder to a GitHub repo (or run `npx vercel` inside it).
2. Vercel → **Add New Project → Import** → Framework preset **Other**, no build command, output directory `./`.
3. Deploy.

## Demo flow
- Login screen → pick **Owner / Admin** or **Team Member** → Sign in.
- Switch role anytime from the profile menu (top right) → "Switch to … view".
- Dark mode: moon icon in the top bar.

## Structure
- `index.html` — shell
- `css/styles.css` — design system (colors from the logo: ink `#0D1F23`, sage `#8FAD9A`)
- `js/data.js` — dummy data
- `js/core.js` — icons, helpers, layout, router
- `js/pages-main.js` — login, dashboard, calendar, projects, new booking
- `js/pages-money.js` — clients, quotations/invoices, payments, finance
- `js/pages-studio.js` — team, tasks, equipment, notices, reports, settings, member portal
