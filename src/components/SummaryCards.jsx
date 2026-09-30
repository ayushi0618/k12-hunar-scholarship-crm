// SummaryCards — four KPI cards computed from the live scholarship list.
// App passes the full list; counts are derived here so any status change,
// add, or edit is reflected instantly.
export default function SummaryCards({ scholarships }) {
  const total = scholarships.length;
  const published = scholarships.filter((s) => s.status === "Published").length;
  const draft = scholarships.filter((s) => s.status === "Draft").length;
  const expired = scholarships.filter((s) => s.status === "Expired").length;

  const cards = [
    { label: "Total Scholarships", value: total, accent: "border-indigo-500", text: "text-indigo-600" },
    { label: "Published", value: published, accent: "border-green-500", text: "text-green-600" },
    { label: "Draft", value: draft, accent: "border-amber-500", text: "text-amber-600" },
    { label: "Expired", value: expired, accent: "border-slate-400", text: "text-slate-500" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border-l-4 ${card.accent} bg-white p-4 shadow-sm sm:p-5`}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm">
            {card.label}
          </p>
          <p className={`mt-1 text-3xl font-bold ${card.text}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
