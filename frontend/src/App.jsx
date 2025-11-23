import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PromptInput from "./components/PromptInput";
import CodeOutput from "./components/CodeOutput";
import { generateCode, fetchHistory } from "./api";

export default function App() {
  // Theme switch
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // States
  const [language, setLanguage] = useState("C++");
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch history
  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      console.error("History load error:", err);
    }
  }

  async function handleGenerate() {
    if (!prompt.trim()) return;

    setLoading(true);
    setCode("");

    try {
      const res = await generateCode(prompt, language);
      setCode(res.code);

      await loadHistory();
    } catch (err) {
      console.error("Generate error:", err);
      setCode("// Error generating code");
    }

    setLoading(false);
  }

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300
        ${
          theme === "light"
            ? "bg-gradient-to-br from-white to-slate-100 text-gray-900"
            : "bg-[#0A0F1F] text-gray-100"
        }
      `}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">

        {/* LEFT: Prompt Input */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] shadow-lg">
            <PromptInput
              language={language}
              setLanguage={setLanguage}
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
            />
          </div>
        </div>

        {/* CENTER: Code Output */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl shadow-lg bg-white dark:bg-[#111827] p-4">
            <CodeOutput code={code} loading={loading} />
          </div>
        </div>

        {/* RIGHT: History */}
        <div className="lg:col-span-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] shadow-lg sticky top-24">
            <div className="text-xl font-semibold mb-3">History</div>

            <div className="max-h-[65vh] overflow-y-auto space-y-3">

              {history.length === 0 && (
                <div className="text-slate-500 dark:text-gray-400">
                  No history yet
                </div>
              )}

              {history.map((item) => (
                <div
                  key={item.id}
                  className="
                    p-3 rounded-xl bg-gray-200 dark:bg-[#334155]
                    hover:bg-gray-300 dark:hover:bg-[#475569]
                    cursor-pointer transition
                  "
                  onClick={() => {
                    setPrompt(item.prompt);
                    setLanguage(item.language);
                    setCode(item.code);
                  }}
                >
                  <div className="font-medium">{item.prompt}</div>
                  <div className="text-xs text-slate-600 dark:text-gray-300">
                    {item.language} •{" "}
                    {new Date(item.created_at).toLocaleString()}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
