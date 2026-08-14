import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

/**
 * AI Assistant Component - Enterprise Grade
 * Features:
 * - Appears in bottom-right corner
 * - Real-time chat interface
 * - Context-aware responses
 * - Copy detection support
 * - Upload assistance
 * - Multi-language support (future)
 * - Fully extractable for other projects
 * 
 * Usage: <AIAssistant />
 */
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! 👋 I\'m your Render AI Assistant. Ask me about uploads, copyright, monetization, or anything else!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      // Call AI service
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: localStorage.getItem('userId') || 'guest',
          message: input
        })
      });

      if (!response.ok) throw new Error('Chat failed');
      const data = await response.json();

      // Add AI response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || 'Sorry, I couldn\'t process that. Try asking about uploads or copyright!'
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble right now. Please try again!'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div className="bg-neutral-900 border-2 border-red-600 rounded-lg shadow-2xl w-96 h-96 flex flex-col animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <h3 className="font-bold">Render AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-red-800 p-1 rounded transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-900">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white rounded-br-none'
                      : 'bg-neutral-800 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-neutral-800 text-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-neutral-700 p-4 flex gap-2 bg-neutral-900 rounded-b-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              disabled={loading}
              className="flex-1 bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:border-red-600 outline-none placeholder-gray-500 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center w-16 h-16 animate-pulse hover:animate-none transition transform hover:scale-110"
          title="Open AI Assistant"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
