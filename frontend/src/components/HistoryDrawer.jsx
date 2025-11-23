// frontend/src/components/HistoryDrawer.jsx
import React from "react";

export default function HistoryDrawer({
  open,
  history,
  onSelect,
  onClear,
  onClose,
  page,
  setPage,
  total,
  limit,
}) {
  // This file is used as a right column area (not absolute overlay)
  const totalPages = Math.max(1, Math.ceil((total || 0) / limit));

  return (
    <div className="p-4 rounded-2xl glass dark:glass-dark shadow-lg w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">History</div>
        <div className="flex gap-2 items-center">
          <button onClick={onClear} className="text-sm text-red-600">Clear</button>
          <button onClick={onClose} className="px-3 py-1 bg-slate-100 rounded">Close</button>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-auto space-y-3">
        {history.length === 0 && <div className="text-slate-500">No history yet</div>}
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="p-3 bg-white/60 dark:bg-slate-800/60 rounded hover:bg-slate-50 cursor-pointer"
          >
            <div className="font-medium">{item.prompt}</div>
            <div className="text-xs text-slate-500">{item.language} • {new Date(item.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-500">Page {page} / {totalPages}</div>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50">Prev</button>
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
