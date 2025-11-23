import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

export async function generateCode(prompt, language) {
  const res = await axios.post(`${API_BASE}/generate`, {
    prompt,
    language
  });
  return res.data;
}

export async function fetchHistory() {
  const res = await axios.get(`${API_BASE}/api/history`);
  return res.data;
}
