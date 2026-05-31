import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || "http://localhost:5678/webhook/generate-blog";

export default function App() {
  const [topic, setTopic] = useState("");
  const [blog, setBlog] = useState(null);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateBlog = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setBlog(null);
    setSources([]);

    try {
      const response = await axios.post(N8N_WEBHOOK_URL, { topic });
      setBlog(response.data.blog);
      setSources(response.data.sources || []);
    } catch (err) {
      setError("Failed to generate blog. Make sure N8N is running and the webhook is active.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blog);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>✍️ AI Blog Generator</h1>
        <p>Enter any topic and get a real-time, research-backed blog post</p>
      </header>

      <main className="main">
        <div className="input-section">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateBlog()}
            placeholder="e.g. Future of Artificial Intelligence in Healthcare"
            className="topic-input"
          />
          <button onClick={generateBlog} disabled={loading || !topic.trim()} className="generate-btn">
            {loading ? "Generating..." : "Generate Blog"}
          </button>
        </div>

        {loading && (
          <div className="loader">
            <div className="spinner"></div>
            <p>Searching the web & generating your blog...</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {blog && (
          <div className="output-section">
            <div className="blog-toolbar">
              <span className="blog-label">Generated Blog</span>
              <button onClick={copyToClipboard} className="copy-btn">
                {copied ? "✅ Copied!" : "📋 Copy Markdown"}
              </button>
            </div>

            <div className="blog-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog}</ReactMarkdown>
            </div>

            {sources.length > 0 && (
              <div className="sources">
                <h3>📚 Sources Used</h3>
                <ul>
                  {sources.map((s, i) => (
                    <li key={i}>
                      <a href={s.link} target="_blank" rel="noreferrer">{s.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}