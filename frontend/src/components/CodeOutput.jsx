import React, { useState } from "react";

export default function CodeOutput({ code, loading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg min-h-[300px]">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
      >
        Copy
      </button>

      {/* Copied Message */}
      {copied && (
        <div className="absolute top-3 right-20 bg-green-500 text-white px-3 py-1 rounded-md text-sm animate-fade">
          Copied!
        </div>
      )}

      {/* Output */}
      <pre className="mt-10 whitespace-pre-wrap text-sm">
        {loading ? "Generating..." : code || "// Output will appear here"}
      </pre>
    </div>
  );
}
