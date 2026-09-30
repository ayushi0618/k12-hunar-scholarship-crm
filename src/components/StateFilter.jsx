// StateFilter — pill buttons to filter the list by state.
// "All" shows every record. App keeps `stateFilter` in useState and
// derives the visible rows from it.
const OPTIONS = ["All", "Bihar", "Haryana", "Jharkhand"];

export default function StateFilter({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by state">
      {OPTIONS.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-indigo-600 text-white shadow"
                : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
