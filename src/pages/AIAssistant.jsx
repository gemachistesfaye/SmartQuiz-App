import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Send, Sparkles, Brain, Code, Lightbulb, User, Bot, Loader2, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

    // Pro JavaScript Intelligence Simulation
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('how can you help') || lowerInput.includes('what can you do')) {
        response = "As a **Pro JS Assistant**, I provide: \n\n" +
                   "• **Deep Dives**: Structural explanations of Engine internals (V8, Event Loop).\n" +
                   "• **Code Audit**: Paste your snippets for optimization suggestions.\n" +
                   "• **Architecture**: Advice on Design Patterns (Singleton, Factory, Observer).\n" +
                   "• **Modern Standards**: ES2023+ features and best practices.";
      } else if (lowerInput.includes('closure')) {
        response = "### 🔒 JavaScript Closures\n\n" +
                   "A closure is the combination of a function and the **lexical environment** within which that function was declared. \n\n" +
                   "**Key Use Case:** Data Privacy.\n" +
                   "```javascript\n" +
                   "function createCounter() {\n" +
                   "  let count = 0;\n" +
                   "  return () => ++count;\n" +
                   "}\n" +
                   "const count = createCounter();\n" +
                   "console.log(count()); // 1\n" +
                   "```";
      } else if (lowerInput.includes('event loop')) {
        response = "### 🔄 The Event Loop\n\n" +
                   "JavaScript is single-threaded but handles concurrency via the **Event Loop**. \n\n" +
                   "1. **Call Stack**: Executes synchronous code.\n" +
                   "2. **Web APIs**: Handles timers, DOM events, and fetch.\n" +
                   "3. **Microtask Queue**: Where **Promises** (.then) go. Highest priority!\n" +
                   "4. **Task Queue**: Where setTimeout/setInterval go.\n\n" +
                   "*Tip: Microtasks always run before the next render or macrotask.*";
      } else if (lowerInput.includes('prototype') || lowerInput.includes('inheritance')) {
        response = "### 🧬 Prototypal Inheritance\n\n" +
                   "Unlike Class-based languages, JS uses **Prototypes**. Every object has an internal link to another object called its prototype. \n\n" +
                   "When you access a property that doesn't exist on an object, JS looks up the **Prototype Chain** until it finds it or hits `null`.";
      } else if (lowerInput.includes('this keyword') || lowerInput.includes('this')) {
        response = "### 📍 The `this` Keyword\n\n" +
                   "The value of `this` is determined by **how a function is called** (Execution Context):\n\n" +
                   "• **Global**: `window` (or `undefined` in strict mode).\n" +
                   "• **Method**: The object owning the method.\n" +
                   "• **Arrow Functions**: Lexically inherited from the parent scope (they don't have their own `this`).\n" +
                   "• **Explicit**: Set using `.bind()`, `.call()`, or `.apply()`.";
      } else if (lowerInput.includes('promise') || lowerInput.includes('async')) {
        response = "### ⏳ Asynchronous Mastery\n\n" +
                   "**Promises** solve 'callback hell' by providing a robust API for deferred values. \n\n" +
                   "**Pro Tip:** Use `Promise.allSettled()` when you need all results regardless of failure, or `Promise.race()` for timeouts!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Welcome back, Senior Dev! I'm ready to assist with your JavaScript architecture or debugging. What's on the roadmap today?";
      } else {
        response = "That's a solid inquiry. While I'm specialized in **ES6+ core mechanics**, I can also discuss **React Reconciliation**, **Virtual DOM**, or **Memory Management**. \n\nWould you like a deep dive into any of these?";
      }

      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1000);
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
                          : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none prose prose-invert prose-sm max-w-none'
                      }`}>
                        {msg.role === 'user' ? (
                          msg.content
                        ) : (
                          <ReactMarkdown
                            components={{
                              h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mb-2" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-lg font-bold text-white mb-2" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-md font-bold text-white mb-2 underline" {...props} />,
                              code: ({node, inline, ...props}) => 
                                inline 
                                  ? <code className="bg-white/10 px-1 rounded text-primary" {...props} />
                                  : <pre className="bg-black/40 p-4 rounded-xl border border-white/10 overflow-x-auto my-2">
                                      <code className="text-primary-200" {...props} />
                                    </pre>,
                              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                              li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        )}
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
