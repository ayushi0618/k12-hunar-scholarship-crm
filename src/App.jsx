import { useState } from "react";
import seedData from "./data/scholarships.json";
import SummaryCards from "./components/SummaryCards.jsx";
import StateFilter from "./components/StateFilter.jsx";
import ScholarshipTable from "./components/ScholarshipTable.jsx";
import ScholarshipForm from "./components/ScholarshipForm.jsx";
import PreviewModal from "./components/PreviewModal.jsx";

// App — owns ALL state for the demo:
//   scholarships : the master list (seeded from JSON, edited in memory)
//   stateFilter  : "All" | "Bihar" | "Haryana" | "Jharkhand"
//   formOpen     : false | "add" | the scholarship object being edited
//   previewing   : the scholarship shown in the student preview modal (or null)
//
// Everything on screen is derived from `scholarships`, so a status change,
// add, or edit instantly updates the summary cards and the table.
export default function App() {
  const [scholarships, setScholarships] = useState(seedData);
  const [stateFilter, setStateFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false); // false | "add" | scholarship
  const [previewing, setPreviewing] = useState(null);

  // Rows visible right now = master list filtered by the selected state.
  const visibleRows =
    stateFilter === "All"
      ? scholarships
      : scholarships.filter((s) => s.state === stateFilter);

  // Inline status change from the table's <select>: replace just that record.
  const handleStatusChange = (id, newStatus) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  // Save from the modal: "add" appends a new record (new id), otherwise update.
  const handleSave = (record) => {
    if (formOpen === "add") {
      const nextId = Math.max(...scholarships.map((s) => s.id), 0) + 1;
      setScholarships((prev) => [...prev, { ...record, id: nextId }]);
    } else {
      setScholarships((prev) =>
        prev.map((s) => (s.id === record.id ? { ...record } : s))
      );
    }
    setFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold text-indigo-700 sm:text-2xl">
              K12 Hunar — Scholarship CRM
              <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 align-middle text-xs font-semibold text-indigo-700">
                Demo
              </span>
            </h1>
            <p className="text-xs text-slate-500 sm:text-sm">
              Manage scholarship listings for Bihar, Haryana &amp; Jharkhand
            </p>
          </div>
          <button
            onClick={() => setFormOpen("add")}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            + Add Scholarship
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {/* Summary cards (live counts) */}
        <SummaryCards scholarships={scholarships} />

        {/* State filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StateFilter value={stateFilter} onChange={setStateFilter} />
          <p className="text-xs text-slate-500">
            Showing {visibleRows.length} of {scholarships.length}
          </p>
        </div>

        {/* Table / mobile cards */}
        <ScholarshipTable
          rows={visibleRows}
          onStatusChange={handleStatusChange}
          onEdit={(s) => setFormOpen(s)}
          onPreview={setPreviewing}
        />
      </main>

      {/* Add / Edit modal */}
      {formOpen && (
        <ScholarshipForm
          initial={formOpen === "add" ? null : formOpen}
          onSave={handleSave}
          onClose={() => setFormOpen(false)}
        />
      )}

      {/* Student preview modal */}
      {previewing && (
        <PreviewModal scholarship={previewing} onClose={() => setPreviewing(null)} />
      )}
    </div>
  );
}
