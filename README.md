# 🤖 AI Blog Generator

An AI-powered app that generates a full blog post on any topic using real-time web search.

---

## 🔧 Tech Used

- **React** — Frontend UI
- **N8N** — Workflow automation
- **Tavily** — Real-time web search
- **Gemini AI** — Blog generation

---

## 🔁 How It Works

```
User enters a topic
       ↓
React sends it to N8N via Webhook
       ↓
N8N searches the web using Tavily
       ↓
Search results are sent to Gemini AI
       ↓
Gemini generates a full blog post
       ↓
Blog is returned and displayed on the UI
```

---

## 🚀 Running Locally

```bash
# Start N8N
N8N_CORS_ORIGINS="*" n8n start

# Start React
cd frontend
npm install
npm start
```

- N8N → https://n8n-production-8c847.up.railway.app
- React → https://blog-generator-seven-mu.vercel.app/

---

## 🌐 Hosting

| Part | Platform |
|---|---|
| Frontend | Vercel |
| N8N | Railway  |

---

## 🔑 API Keys Needed

| Key | Get it from |
|---|---|
| Tavily | [app.tavily.com](https://app.tavily.com) |
| Gemini | [aistudio.google.com](https://aistudio.google.com) |