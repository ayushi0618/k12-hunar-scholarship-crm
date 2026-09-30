# K12 Hunar — Scholarship CRM (Demo)

A simple frontend demo of a Scholarship Management CRM, built as a frontend
developer assessment for K12 Hunar. An employee can view scholarship listings,
filter them by state, change their status, add/edit records, and preview how a
scholarship appears to students.

## Features

- **Summary cards** — Total, Published, Draft and Expired counts, computed live
  from the data. They update instantly when a status changes or a record is
  added/edited.
- **State filter** — All / Bihar / Haryana / Jharkhand pill buttons filter the
  list immediately.
- **Scholarship table** — clean table on desktop, collapses to stacked cards on
  mobile (< 768px).
- **Inline status control** — change a scholarship's status (Published / Draft /
  Expired) from a dropdown in each row; summary cards update at once.
- **Add / Edit form** — modal with all fields: name, state, provider,
  applicable class, eligibility, amount/benefit, deadline, official link,
  status. Name, state and status are required (inline error otherwise).
- **Student preview** — per-row Preview button opens a modal showing the
  student-facing card with an "Apply now" link.

## Tech stack

- React 18 + Vite
- Tailwind CSS v3 (PostCSS)
- No backend — all data lives in `src/data/scholarships.json` and is edited
  in memory during the session.

## How to run

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build -> static files in dist/
```

To preview the production build locally: `npx vite preview` (or serve `dist/`
with any static server).

## Notes

- All scholarship records are **local sample data** for the assessment only
  (9 records across Bihar, Haryana, Jharkhand). There is no login, backend,
  or persistence — changes reset on page reload.
- AI tools used: built with AI assistance (Muse); UI library: Tailwind CSS.
