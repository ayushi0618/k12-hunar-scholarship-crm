import { useState } from "react";

// ScholarshipForm — modal used for BOTH add and edit.
// Props:
//   initial: the scholarship to edit, or null when adding a new one
//   onSave: called with the finished record { ...fields } (App decides add vs update)
//   onClose: closes the modal
// Validation: name, state, status are required — inline error shown if missing.
const STATES = ["Bihar", "Haryana", "Jharkhand"];
const STATUSES = ["Published", "Draft", "Expired"];

const EMPTY = {
  name: "",
  state: "",
  provider: "",
  applicableClass: "",
  eligibility: "",
  amount: "",
  deadline: "",
  link: "",
  status: "Draft",
};

export default function ScholarshipForm({ initial, onSave, onClose }) {
  // Prefill when editing; start blank (status Draft) when adding.
  const [form, setForm] = useState(initial ? { ...initial } : { ...EMPTY });
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Required-field validation with an inline error message.
    if (!form.name.trim() || !form.state || !form.status) {
      setError("Please fill in Scholarship name, State and Status.");
      return;
    }
    setError("");
    onSave({ ...form, name: form.name.trim() });
  };

  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";
  const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    // Overlay: click outside the panel closes the modal.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            {initial ? "Edit Scholarship" : "Add Scholarship"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg px-2 py-1 text-xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Scholarship name *</label>
            <input className={inputCls} value={form.name} onChange={set("name")} placeholder="e.g. Post-Matric Scholarship" />
          </div>

          <div>
            <label className={labelCls}>State *</label>
            <select className={inputCls} value={form.state} onChange={set("state")}>
              <option value="">Select state</option>
              {STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Status *</label>
            <select className={inputCls} value={form.status} onChange={set("status")}>
              {STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Provider</label>
            <input className={inputCls} value={form.provider} onChange={set("provider")} placeholder="e.g. Govt. of Bihar" />
          </div>

          <div>
            <label className={labelCls}>Applicable class</label>
            <input className={inputCls} value={form.applicableClass} onChange={set("applicableClass")} placeholder="e.g. Class 9-10" />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Eligibility criteria</label>
            <textarea className={inputCls} rows="2" value={form.eligibility} onChange={set("eligibility")} placeholder="Who can apply?" />
          </div>

          <div>
            <label className={labelCls}>Amount / benefit</label>
            <input className={inputCls} value={form.amount} onChange={set("amount")} placeholder="e.g. ₹10,000/year" />
          </div>

          <div>
            <label className={labelCls}>Application deadline</label>
            <input className={inputCls} value={form.deadline} onChange={set("deadline")} placeholder="e.g. 31 Dec 2026" />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Official application link</label>
            <input className={inputCls} value={form.link} onChange={set("link")} placeholder="https://…" />
          </div>

          <div className="flex justify-end gap-2 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {initial ? "Save changes" : "Add scholarship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
