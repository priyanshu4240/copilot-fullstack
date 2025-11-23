import React from "react";

export default function PromptInput({
  language,
  setLanguage,
  prompt,
  setPrompt,
  onGenerate,
}) {
  return (
    <div>

      {/* Language */}
      <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
        Language
      </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-[#0F172A] dark:text-gray-200"
      >
        <option>C++</option>
        <option>Java</option>
        <option>Python</option>
        <option>JavaScript</option>
      </select>

      {/* Prompt */}
      <label className="block mt-4 mb-1 text-gray-700 dark:text-gray-300 font-medium">
        Describe what you want
      </label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-40 p-3 rounded-lg bg-gray-100 dark:bg-[#0F172A] dark:text-gray-200"
      />

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onGenerate}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
        >
          Generate
        </button>

        <button
          onClick={() => setPrompt("")}
          className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-slate-600 dark:hover:bg-slate-500 text-black dark:text-white py-2 rounded-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
