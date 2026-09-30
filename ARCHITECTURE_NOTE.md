# Architecture Note — how the demo works (plain words)

One source of truth: `App.jsx` keeps the master scholarship list in a
`useState` hook, seeded from `src/data/scholarships.json`. Every part of the
screen is *derived* from that one list, so any change re-renders everywhere
automatically. No backend, no global store — just React state.

## 1. State filter

- `App` holds `stateFilter` (`"All" | "Bihar" | "Haryana" | "Jharkhand"`).
- `StateFilter.jsx` renders the pill buttons; clicking one calls
  `onChange`, which sets `stateFilter` in `App`.
- `App` computes `visibleRows` with a plain `.filter()`:
  if the filter is `"All"` show everything, otherwise keep only records whose
  `state` matches. That filtered array is passed to `ScholarshipTable`.
- Why it works: changing state re-renders `App`, the filter runs again, and
  the table shows the new subset. The summary cards always use the *full*
  list, so totals don't change when filtering.

## 2. Status change

- Each row has a `<select>` bound to the record's `status`.
- On change, `ScholarshipTable` calls `onStatusChange(id, newStatus)`.
- `App` updates with `.map()`: it builds a *new* array where only the
  matching record is replaced (`{ ...s, status: newStatus }`). We never
  mutate the old array — React needs a new reference to detect the change.
- Because `SummaryCards` derives its counts from the same list, the
  Published/Draft/Expired numbers update instantly.

## 3. Add / Edit form (ScholarshipForm modal)

- The modal is one component used for both actions. `App` tracks `formOpen`:
  `"add"` for a new record, or the existing scholarship object when editing.
- `ScholarshipForm` copies `initial` into local form state (`useState`), so
  typing doesn't touch the master list until submit.
- Validation on submit: name, state and status are required — if any is
  missing, an inline error banner appears and nothing is saved.
- On save, `App.handleSave` either appends (`{ ...record, id: nextId }` with
  the next free id) or replaces the edited record by id, then closes the modal.

## 4. Student preview (PreviewModal)

- Clicking Preview sets `previewing` in `App` to that scholarship object.
- `PreviewModal` receives it as a prop and renders a student-facing card:
  provider/state header, name, status badge, amount, class, deadline,
  eligibility, and an "Apply now" button linking to the official URL.
- Closing sets `previewing` back to `null`, which unmounts the modal.
- It's read-only on purpose — preview never changes the data.

## 5. Mobile layout

- `ScholarshipTable` renders two layouts: a real `<table>` wrapped in
  `hidden md:block` (desktop only) and stacked cards in `md:hidden`
  (mobile only). Both share the same row actions, so behaviour is identical.
- Summary cards use `grid-cols-2 lg:grid-cols-4` so they stack on small screens.
