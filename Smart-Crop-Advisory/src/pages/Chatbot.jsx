import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Mic, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '../services/api';
import { toast } from 'sonner';

const SESSION_ID = `session_${Date.now()}`;

export const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'नमस्ते! मैं Kisan Mitra हूँ — आपका AI कृषि सहायक। फसल, मौसम, बाज़ार या किसी भी खेती से जुड़े सवाल पूछें!', sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { id: 2, text: 'Hello! I am Kisan Mitra — your AI agricultural assistant. Ask me anything about crops, weather, market prices, diseases, or farming schemes!', sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(), text: input, sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    const question = input;
    setInput('');
    setIsTyping(true);

    try {
      const { reply } = await sendChatMessage(question, SESSION_ID);
      const botMsg = {
        id: Date.now() + 1, text: reply, sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      toast.error('Failed to get response. Please try again.');
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: 'Sorry, I am having trouble connecting. Please check your internet and try again.',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = ['Which crop should I grow this season?', 'How to treat leaf blight in wheat?', 'What is PM-KISAN scheme?', 'When to irrigate cotton?'];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-green-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Bot className="text-green-600 w-6 h-6" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">Kisan Mitra AI</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Gemini AI • Hindi / English</p>
          </div>
        </div>
        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-semibold">● Live</span>
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 pt-3 pb-1 flex space-x-2 overflow-x-auto scrollbar-none border-b border-gray-100 dark:border-gray-800">
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => setInput(s)}
            className="text-xs whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full text-gray-600 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-700">
            {s}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950 scroll-smooth">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-green-600 text-white' : 'bg-green-100 dark:bg-gray-800 text-green-600'}`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-tl-none text-gray-800 dark:text-gray-100'}`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-gray-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</div>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start">
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-gray-800 text-green-600 flex items-center justify-center shrink-0"><Bot size={16} /></div>
                <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none flex items-center space-x-1.5">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <div key={i} className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: `${delay}s` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crops, diseases, weather... (Hindi/English)"
            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
          />
          <button type="submit" disabled={!input.trim() || isTyping}
            className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-12 h-12 shrink-0">
            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};
