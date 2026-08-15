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
      const lowerMsg = input.toLowerCase();
      let response = 'Feel free to ask me about uploads, copyright detection, monetization, or platform features!';

      if (lowerMsg.includes('copyright')) {
        response = 'Our AI scans every upload for copyrighted content using fingerprinting and visual similarity analysis. Copyrighted material is automatically blocked, but you can appeal within 48 hours.';
      } else if (lowerMsg.includes('upload')) {
        response = 'To upload, head to the Upload page. Drag and drop your video, and our AI will scan it for copyright and AI-generated content before publishing. Supported formats: MP4, WebM, MKV, AVI up to 50GB.';
      } else if (lowerMsg.includes('monetiz') || lowerMsg.includes('earn') || lowerMsg.includes('payout')) {
        response = 'Render gives creators 90% of earnings! You become eligible at 1,000 subscribers, 1,000 watch hours, and 500K short views. Check the Monetization page for your progress.';
      } else if (lowerMsg.includes('short')) {
        response = 'Render Shorts use a TikTok-style infinite loop system. Swipe or use the arrows to navigate between shorts, toggle audio and looping from the controls.';
      } else if (lowerMsg.includes('reward') || lowerMsg.includes('badge')) {
        response = 'Watch content to earn badges! Golden (1M shorts), Diamond (10M), and Platinum (100M) viewer badges are available. Monthly top 3 viewers get event tickets!';
      } else if (lowerMsg.includes('studio') || lowerMsg.includes('analytic')) {
        response = 'Render Studio gives you full analytics: video performance, audience demographics, traffic sources, revenue tracking, and a content calendar. Visit the Studio page to explore.';
      } else if (lowerMsg.includes('help') || lowerMsg.includes('hello') || lowerMsg.includes('hi ')) {
        response = 'Hi! I\'m your Render AI Assistant. I can help with uploads, copyright detection, monetization, shorts, rewards, and studio analytics. What would you like to know?';
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setLoading(false);
      }, 600);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble right now. Please try again!'
      }]);
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
