import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Send, Sparkles, Brain, Code, Lightbulb, User, Bot, Loader2, Zap } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your SmartQuiz AI Tutor. I can help you understand JavaScript concepts, debug code, or suggest topics to study. What's on your mind today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let response = "That's an interesting question about JavaScript! Based on your recent quizzes, you might want to focus on closures or async/await patterns. Would you like a quick explanation?";
      
      if (input.toLowerCase().includes('closure')) {
        response = "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.";
      } else if (input.toLowerCase().includes('hoisting')) {
        response = "Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compilation phase, before the code has been executed.";
      }

      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full px-6 pb-6">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Sparkles className="text-primary" size={32} /> AI Study Assistant
            </h1>
            <p className="text-gray-400 mt-1">Your personal JavaScript tutor, available 24/7.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">AI Online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
          {/* Chat Window */}
          <div className="lg:col-span-3 flex flex-col glass-card overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.role === 'user' ? 'bg-primary' : 'bg-white/10 text-primary'
                      }`}>
                        {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="text-primary animate-spin" />
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-6 border-t border-white/5 bg-white/[0.02]">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about JavaScript..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-xl transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Brain size={16} className="text-primary" /> Learning Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={14} className="text-yellow-400" />
                    <span className="text-xs font-bold text-gray-300">Quick Tip</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Use <code className="text-primary">console.table()</code> to visualize large arrays and objects more clearly.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Code size={14} className="text-blue-400" />
                    <span className="text-xs font-bold text-gray-300">Weakness Detected</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    You've struggled with **Event Loop** questions. Should we review those?
                  </p>
                  <button className="text-[10px] font-bold text-primary mt-2 hover:underline">Start Revision</button>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 bg-primary/5 border-primary/20">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Zap size={16} className="text-primary" /> Study Plan
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Based on your goals, I've curated a 15-minute session for you.
              </p>
              <ul className="space-y-2 mb-6">
                {['Hoisting Basics', 'Closure Practical', 'Async Quiz'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary/10 border border-primary/20 text-primary py-2.5 rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all">
                Start Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
