import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const data = await res.json();
    setMessages([...updatedMessages, data.reply]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>JCD Chat Assistant</h1>
      <div style={{ minHeight: 300, border: '1px solid #ccc', padding: '1rem' }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: '100%', marginTop: 10 }}
      />
      <button onClick={handleSend} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
