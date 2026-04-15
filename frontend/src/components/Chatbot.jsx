import { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "./UI/Icons";
import { useData } from "../context/DataContext";

// Simple local answer engine using only the data from our app
function getLocalAnswer(message, data) {
  const msg = message.toLowerCase();
  const today = new Date().toISOString().split("T")[0];

  const upcomingEvents = data.events
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const openTenders = data.tenders.filter(t => t.status === "open");
  const vacancies = data.notices.filter(n => n.category === "vacancy");
  const recentNews = data.posts.slice(0, 3);

  // Upcoming events
  if (msg.includes("event") || msg.includes("calendar") || msg.includes("meeting") || msg.includes("imbizo")) {
    if (upcomingEvents.length === 0) return "There are no upcoming events scheduled at this time.";
    const list = upcomingEvents.map(e => `📌 ${e.title} on ${e.date} at ${e.time}, ${e.location}`).join("\n");
    return `Here are our upcoming events:\n${list}`;
  }

  // Tenders & quotations
  if (msg.includes("tender") || msg.includes("bid") || msg.includes("quotation") || msg.includes("procurement")) {
    if (openTenders.length === 0) return "There are no open tenders or quotations at the moment.";
    const list = openTenders.map(t => `📄 ${t.reference}: ${t.title} (Closes: ${t.closing_date})`).join("\n");
    return `You can find the open tenders and quotations here:\n${list}`;
  }

  // Vacancies
  if (msg.includes("vacancy") || msg.includes("vacancies") || msg.includes("job") || msg.includes("apply")) {
    if (vacancies.length === 0) return "We don't have any open vacancies right now. Please check again soon.";
    const list = vacancies.map(v => `🔹 ${v.title}`).join("\n");
    return `We currently have the following vacancies:\n${list}\n\nPlease visit the 'Vacancies' page on our website for more details on how to apply.`;
  }

  // News / updates
  if (msg.includes("news") || msg.includes("update") || msg.includes("latest")) {
    if (recentNews.length === 0) return "No news updates are available at this time.";
    const list = recentNews.map(n => `📰 ${n.title}`).join("\n");
    return `Here are the latest news updates:\n${list}\n\nVisit the 'News' page to read the full articles.`;
  }

  // Documents
  if (msg.includes("document") || msg.includes("report") || msg.includes("idp") || msg.includes("policy") || msg.includes("budget")) {
    const categories = [...new Set(data.documents.map(d => d.category))];
    return `You can find official municipal documents like reports, IDPs, and policies on the 'Documents' page. We have documents available in these categories: ${categories.join(", ")}.`;
  }

  // Contact details
  if (msg.includes("contact") || msg.includes("phone") || msg.includes("email") || msg.includes("address")) {
    return `You can reach us at:\n📞 Main Office: 053 492 3420\n📧 Email: info@siyathemba.gov.za\n🏛️ Address: Civic Centre, Du Plessis Street, Prieska, 8940\n\nFor emergencies, please call Water: 053 492 0001, Electricity: 053 492 0002, Police: 10111, Ambulance: 10177, Fire: 053 492 0003.`;
  }

  // Greetings
  if (msg.match(/hello|hi|hey|good morning|good afternoon/)) {
    return "Hello! I'm the Siyathemba Municipality assistant. How can I help you today?";
  }

  // Default fallback
  return "I'm sorry, I didn't quite understand that. You can ask me about upcoming events, open tenders, vacancies, latest news, documents, or our contact details.";
}

export default function Chatbot({ open, setOpen }) {
  const { posts, events, documents, notices, tenders } = useData();
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm the Siyathemba Municipality assistant. I can help you with events, tenders, documents, contact details and more. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const data = { posts, events, documents, notices, tenders };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = useCallback(async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: userText }]);
    setLoading(true);
    // Simulate a short delay for a natural feel, but no external API call
    setTimeout(() => {
      const reply = getLocalAnswer(userText, data);
      setMessages(m => [...m, { role: "bot", text: reply }]);
      setLoading(false);
    }, 300);
  }, [input, data]);

  const suggestions = ["Upcoming events?", "Open tenders", "Download IDP", "Contact numbers", "Vacancies"];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#2e7d32",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(46,125,50,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 200,
          transition: "transform 0.2s, background 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#1b5e20"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#2e7d32"}
      >
        {open ? <Icon.Close /> : <Icon.Chat />}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: 360,
            maxWidth: "calc(100vw - 32px)",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
            zIndex: 199,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            maxHeight: "70vh",
            animation: "slideIn 0.25s ease"
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #2e7d32, #1b5e20)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon.Chat />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Siyathemba Assistant</div>
              <div style={{ color: "#c8e6c9", fontSize: 11 }}>Online · Municipal Services</div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className="chat-bubble"
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: m.role === "user" ? "#2e7d32" : "#f7fafc",
                    color: m.role === "user" ? "#fff" : "#1a202c",
                    fontSize: 13,
                    lineHeight: 1.6,
                    border: m.role === "bot" ? "1px solid #e2e8f0" : "none",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  padding: "10px 14px",
                  background: "#f7fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px 14px 14px 4px",
                  width: "fit-content"
                }}
              >
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#a0aec0",
                      animation: `pulse 1.2s ease ${i * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              borderTop: "1px solid #f0f0f0"
            }}
          >
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                style={{
                  padding: "5px 10px",
                  borderRadius: 14,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  border: "1px solid #c8e6c9",
                  transition: "all 0.15s"
                }}
                onMouseEnter={(e) => { e.target.style.background = "#c8e6c9"; }}
                onMouseLeave={(e) => { e.target.style.background = "#e8f5e9"; }}
              >
                {s}
              </button>
            ))}
          </div>

          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid #f0f0f0",
              display: "flex",
              gap: 8,
              alignItems: "center"
            }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything…"
              style={{
                flex: 1,
                padding: "9px 12px",
                border: "1.5px solid #e2e8f0",
                borderRadius: 20,
                fontSize: 13,
                outline: "none"
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: input.trim() ? "#2e7d32" : "#e2e8f0",
                color: "#fff",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s"
              }}
            >
              <Icon.Send />
            </button>
          </div>
        </div>
      )}
    </>
  );
}