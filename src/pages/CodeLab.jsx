import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Play, RotateCcw, Code, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

const SNIPPETS = [
  {
    name: "Standard Greeting",
    code: `// Standard Greeting
const greeting = "Hello, SmartQuiz Master!";
const scores = [85, 92, 78, 95];
const average = scores.reduce((a, b) => a + b) / scores.length;

console.log(greeting);
console.log("Your average score is:", average);
return "Ready to master JS?";`
  },
  {
    name: "Closure Practical",
    code: `// Closure Practical
function createBank(name) {
  let balance = 1000;
  return {
    deposit: (amount) => { balance += amount; return balance; },
    check: () => "Customer: " + name + " | Balance: $" + balance
  };
}

const myAcc = createBank("Alice");
myAcc.deposit(500);
console.log(myAcc.check());
return "Data is private inside the closure!";`
  },
  {
    name: "Array Mastery",
    code: `// Array Mastery
const users = [
  { name: "Alice", xp: 1200 },
  { name: "Bob", xp: 850 },
  { name: "Charlie", xp: 2100 }
];

const legends = users
  .filter(u => u.xp > 1000)
  .map(u => u.name.toUpperCase());

console.log("Legends Found:", legends);
return "Functional programming is powerful!";`
  },
  {
    name: "Async Simulation",
    code: `// Async Simulation (Mock)
console.log("1. Starting process...");

setTimeout(() => {
  console.log("3. Data received after 2 seconds!");
}, 2000);

console.log("2. Moving to next task...");
return "Check the console in 2s!";`
  },
  {
    name: "Object Destructuring",
    code: `// Object Destructuring
const platform = {
  name: "SmartQuiz",
  stats: { users: 4500, uptime: "99.9%" },
  features: ["AI", "Quizzes", "Security"]
};

const { name, stats: { uptime } } = platform;
console.log(\`\${name} has an uptime of \${uptime}\`);
return "Clean code via destructuring.";`
  }
];

export default function CodeLab() {
  const [code, setCode] = useState(SNIPPETS[0].code);
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

  const loadSnippet = (s) => {
    setCode(s.code);
    setOutput([]);
    setResult(null);
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Code className="text-primary" size={32} /> Code Lab
            </h1>
            <p className="text-gray-400 mt-1">Real-time JavaScript experimental sandbox.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={runCode}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-primary/30 flex items-center gap-2 group"
            >
              <Play size={18} className="fill-current group-hover:scale-110 transition-transform" /> Run Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 flex-1 min-h-0 pb-10">
          {/* Snippet Library */}
          <div className="xl:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">Snippet Library</h3>
            {SNIPPETS.map((s, i) => (
              <button
                key={i}
                onClick={() => loadSnippet(s)}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  code === s.code 
                    ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' 
                    : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Terminal size={14} />
                  <span className="text-xs font-bold">{s.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card flex flex-col overflow-hidden"
            >
              <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span><Code size={12} className="inline mr-2" /> script.js</span>
                <span className="text-primary">Editable Mode</span>
              </div>
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="flex-1 w-full bg-transparent p-6 text-primary-200 font-mono text-sm focus:outline-none resize-none custom-scrollbar leading-relaxed"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-6 h-full"
            >
              <div className="glass-card flex-1 flex flex-col overflow-hidden">
                <div className="p-4 bg-black/40 border-b border-white/10 flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <Terminal size={12} /> Console Output
                </div>
                <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar space-y-2 bg-black/20">
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
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Return Value:</p>
                        <p className="text-primary font-bold">{String(result)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
