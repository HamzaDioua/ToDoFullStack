import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AI.css";

function AI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, user: true }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: userMessage,
      });

      const reply = response.data.reply;
      setMessages((prev) => [...prev, { text: reply, user: false }]);
    } catch (error) {
      console.error("Erreur avec le serveur:", error.response || error.message);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Erreur : impossible de contacter l’IA.", user: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-page">
      <div className="chatbot">
        <div className="chatbox" ref={chatRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.user ? "user-msg" : "bot-msg"}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="bot-msg">⏳ L’IA réfléchit...</div>}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Pose une question à ton assistant IA..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} disabled={loading}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AI;
