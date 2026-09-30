import StatusBadge from "./StatusBadge.jsx";

// ScholarshipTable — desktop: a real <table>.
// Mobile (under md): the table hides and each row renders as a stacked card.
// Each row has: inline status <select> (updates instantly), Preview, Edit.
const STATUSES = ["Published", "Draft", "Expired"];

export default function ScholarshipTable({
  rows,
  onStatusChange,
  onEdit,
  onPreview,
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow-sm">
        No scholarships match this filter.
      </div>
    );
  }

  return (
    <>
      {/* ---------- Desktop table (md and up) ---------- */}
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Scholarship</th>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-800">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.provider}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{s.state}</td>
                <td className="px-4 py-3 text-slate-600">{s.applicableClass}</td>
                <td className="px-4 py-3 text-slate-600">{s.deadline}</td>
                <td className="px-4 py-3">
                  <select
                    value={s.status}
                    onChange={(e) => onStatusChange(s.id, e.target.value)}
                    aria-label={`Status for ${s.name}`}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onPreview(s)}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => onEdit(s)}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile cards (below md) ---------- */}
      <div className="grid gap-3 md:hidden">
        {rows.map((s) => (
          <div key={s.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-800">{s.name}</p>
                <p className="text-xs text-slate-500">
                  {s.provider} · {s.state} · {s.applicableClass}
                </p>
              </div>
              <StatusBadge status={s.status} />
            </div>
            <p className="mt-2 text-xs text-slate-500">Deadline: {s.deadline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <select
                value={s.status}
                onChange={(e) => onStatusChange(s.id, e.target.value)}
                aria-label={`Status for ${s.name}`}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onPreview(s)}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Preview
              </button>
              <button
                onClick={() => onEdit(s)}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
