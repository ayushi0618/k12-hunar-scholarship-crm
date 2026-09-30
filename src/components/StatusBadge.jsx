// StatusBadge — small colored pill for a scholarship's status.
// Colors: Published = green, Draft = amber, Expired = slate.
export default function StatusBadge({ status }) {
  const styles = {
    Published: "bg-green-100 text-green-800 ring-green-200",
    Draft: "bg-amber-100 text-amber-800 ring-amber-200",
    Expired: "bg-slate-200 text-slate-600 ring-slate-300",
  };
  const cls = styles[status] || "bg-slate-100 text-slate-600 ring-slate-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${cls}`}
    >
      {status}
    </span>
  );
}
