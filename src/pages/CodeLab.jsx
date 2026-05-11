import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { Play, RotateCcw, Code, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CodeLab() {
  const [code, setCode] = useState(`// Welcome to SmartQuiz Code Lab!
// Try writing some JavaScript here.

const greeting = "Hello, SmartQuiz Master!";
const scores = [85, 92, 78, 95];

const average = scores.reduce((a, b) => a + b) / scores.length;

console.log(greeting);
console.log("Your average score is:", average);

// Return something to see it in the output
return "Ready to master JS?";`);

  const [output, setOutput] = useState([]);
  const [result, setResult] = useState(null);

  const runCode = () => {
    const logs = [];
    const customConsole = {
      log: (...args) => logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    };

    try {
      // Create a function from the code string
      // eslint-disable-next-line no-new-func
      const executeCode = new Function('console', code);
      const res = executeCode(customConsole);
      setOutput(logs);
      setResult(res);
    } catch (error) {
      setOutput([...logs, `Error: ${error.message}`]);
      setResult(null);
    }
  };

  const resetCode = () => {
    if (window.confirm("Reset to default code?")) {
      setCode(`// Welcome to SmartQuiz Code Lab!
const greeting = "Hello, SmartQuiz Master!";
console.log(greeting);
return "Ready to master JS?";`);
      setOutput([]);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex p-4 gap-4 overflow-hidden font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
        <Header />
        
        <main className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Code className="text-primary" size={32} /> Code Lab
              </h1>
              <p className="text-gray-400 mt-1">Experiment with JavaScript in real-time</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={resetCode}
                className="glass hover:bg-white/10 text-gray-400 hover:text-white px-4 py-2 rounded-xl transition-all flex items-center gap-2"
              >
                <RotateCcw size={18} /> Reset
              </button>
              <button 
                onClick={runCode}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/30 flex items-center gap-2 group"
              >
                <Play size={18} className="fill-current group-hover:scale-110 transition-transform" /> Run Code
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
            {/* Editor */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card flex flex-col min-h-[500px]"
            >
              <div className="p-4 border-b border-white/10 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <Code size={14} /> main.js
              </div>
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="flex-1 w-full bg-transparent p-6 text-primary-200 font-mono text-sm focus:outline-none resize-none custom-scrollbar leading-relaxed"
              />
            </motion.div>

            {/* Output */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="glass-card flex-1 flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <Terminal size={14} /> Console Output
                </div>
                <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar space-y-2">
                  {output.length === 0 && !result && (
                    <p className="text-gray-600 italic">No output yet. Click 'Run Code' to see results.</p>
                  )}
                  {output.map((line, i) => (
                    <div key={i} className="text-gray-300 border-l-2 border-primary/30 pl-4 py-1">
                      {line}
                    </div>
                  ))}
                  {result !== null && (
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-3">
                      <Sparkles className="text-yellow-400 mt-1 shrink-0" size={16} />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Return Value:</p>
                        <p className="text-primary font-bold">{String(result)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-card p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="text-primary" size={20} />
                  <h4 className="font-bold text-white">Pro Tip</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The Code Lab uses a secure sandbox environment. You can use standard ES6+ features like 
                  <code className="text-primary mx-1">map()</code>, 
                  <code className="text-primary mx-1">filter()</code>, and 
                  <code className="text-primary mx-1">arrow functions</code>.
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
