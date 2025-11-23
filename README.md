# CoPilot – Full Stack AI Code Generator

A full-stack AI code generator built with:

- **React (Frontend)**
- **Node.js + Express (Backend)**
- **Neon PostgreSQL (Database)**
- **Vercel (Deployment)**

Users can enter a prompt, choose a language, generate code using AI, and view saved history.

---

## Project Structure

CoPilot-FullStack/
frontend/ → React + Tailwind
backend/ → Node.js + Express + PostgreSQL

yaml
Copy code

---

## Environment Variables (backend)

Create `backend/.env`:

DATABASE_URL=your-neon-postgres-url
GOOGLE_API_KEY=optional
MODEL=gemini-2.0-flash

yaml
Copy code

---

## Run Locally

### Frontend
```sh
cd frontend
npm install
npm run dev
Backend
sh
Copy code
cd backend
npm install
npm start
Backend runs on:

arduino
Copy code
http://localhost:4000
 Database Table
Run in Neon SQL Editor:

sql
Copy code
CREATE TABLE IF NOT EXISTS history (
  id SERIAL PRIMARY KEY,
  prompt TEXT,
  language VARCHAR(50),
  code TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
 Deployment (Vercel)
Backend
Uses vercel.json:

json
Copy code
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
Push to GitHub → Import into Vercel → Add .env → Deploy.

Frontend
sh
Copy code
npm run build
vercel deploy
Update API base URL in api.js:

js
Copy code
const BASE_URL = "https://your-backend.vercel.app";
📡 API Endpoints
POST /generate → Generate AI code

GET /api/history → Fetch last 50 history items