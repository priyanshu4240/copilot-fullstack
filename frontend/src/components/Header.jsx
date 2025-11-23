import React from "react";

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="flex items-center justify-between w-full mb-6">

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
        Code Generator <span className="text-indigo-600 dark:text-indigo-400">– CoPilot</span>
      </h1>

      {/* Theme Button */}
      <button
        onClick={toggleTheme}
        className="
          px-5 py-2 rounded-full flex items-center gap-2 shadow-lg
          bg-white text-gray-800
          dark:bg-slate-700 dark:text-gray-200
          hover:scale-[1.03] transition-all
        "
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}
