// ------------------- LOAD ENV -------------------
require("dotenv").config();

// ------------------- IMPORTS ---------------------
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const pool = require("./db");   // PostgreSQL connection

// ------------------- APP SETUP --------------------
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));


app.use(bodyParser.json());

// ------------------- ENV VARIABLES -----------------
const API_KEY = process.env.GOOGLE_API_KEY || "";
const MODEL   = process.env.MODEL || "gemini-2.0-flash";
const USE_GEMINI = !!API_KEY;

// ------------------- FORMAT CODE --------------------
function customFormat(str) {
  if (!str) return "";
  return str
    .replace(/\\n/g, "\n")
    .replace(/\\\\n/g, "\n")
    .split("\n")
    .map(line => "  " + line.trimEnd())
    .join("\n");
}

// ------------------- GEMINI CALL --------------------
async function callGemini(prompt, language) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          { text: `Write ONLY ${language} code. No explanations.\nPrompt: ${prompt}` }
        ]
      }
    ]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const json = await res.json();

    if (json?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return json.candidates[0].content.parts[0].text;
    }

    console.log("Gemini error:", json);
    return null;
  } catch (e) {
    console.error("Gemini Fetch error:", e);
    return null;
  }
}

// ------------------- SAVE HISTORY (PostgreSQL) -------------------
async function saveHistory(prompt, language, code) {
  try {
    await pool.query(
      "INSERT INTO history (prompt, language, code) VALUES ($1, $2, $3)",
      [prompt, language, code]
    );
  } catch (err) {
    console.error("DB Insert Error:", err);
  }
}

// ------------------- GET HISTORY (PostgreSQL) --------------------
app.get("/api/history", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM history ORDER BY created_at DESC LIMIT 50"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("DB History Error:", err);
    res.status(500).json({ error: "DB error" });
  }
});

// ------------------- GENERATE ROUTE -----------------
app.post("/generate", async (req, res) => {
  const { prompt = "", language = "Auto" } = req.body;

  let code = null;

  if (USE_GEMINI) {
    code = await callGemini(prompt, language);
  }

  if (!code) code = "// Error generating code";

  const formatted = customFormat(code);

  // Save to PostgreSQL
  await saveHistory(prompt, language, formatted);

  res.json({ code: formatted });
});

// ------------------- HEALTH CHECK -------------------
app.get("/health", (req, res) => res.json({ ok: true }));

// Local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

// ------------------- EXPORT FOR VERCEL -------------------
module.exports = app;
