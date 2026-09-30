import StatusBadge from "./StatusBadge.jsx";

// PreviewModal — student-facing view of one scholarship.
// Shows what a student would see: name, provider, class, amount, deadline,
// eligibility, and an Apply button linking to the official URL.
export default function PreviewModal({ scholarship, onClose }) {
  if (!scholarship) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card header */}
        <div className="bg-indigo-600 px-6 py-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
                {scholarship.provider} · {scholarship.state}
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">{scholarship.name}</h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="rounded-lg px-2 py-1 text-xl leading-none text-indigo-200 hover:bg-indigo-700 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        {/* Card body */}
        <div className="space-y-3 px-6 py-5 text-sm">
          <div className="flex items-center justify-between">
            <StatusBadge status={scholarship.status} />
            <span className="font-semibold text-indigo-600">{scholarship.amount}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Class</p>
              <p className="font-medium text-slate-700">{scholarship.applicableClass || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Deadline</p>
              <p className="font-medium text-slate-700">{scholarship.deadline || "—"}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Eligibility</p>
            <p className="mt-1 text-slate-700">{scholarship.eligibility || "—"}</p>
          </div>

          <a
            href={scholarship.link || "#"}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl bg-indigo-600 px-4 py-2.5 text-center font-semibold text-white hover:bg-indigo-700"
          >
            Apply now
          </a>
          <p className="text-center text-xs text-slate-400">
            Student preview — how this scholarship appears to applicants
          </p>
        </div>
      </div>
    </div>
  );
}
