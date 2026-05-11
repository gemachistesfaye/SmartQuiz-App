import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, BookOpen, ChevronRight, X, Sparkles, Filter, Code, Terminal } from 'lucide-react';

const concepts = [
  {
    title: 'Hoisting',
    category: 'Fundamentals',
    description: 'JavaScript mechanism where variables and function declarations are moved to the top of their scope during compilation.',
    content: 'Hoisting allows you to use functions and variables before they are declared. However, only declarations are hoisted, not initializations. Variables declared with "var" are hoisted and initialized as "undefined", while "let" and "const" are hoisted but in a "temporal dead zone".',
    example: 'console.log(x); // undefined\nvar x = 5;\n\nfoo(); // "Hello"\nfunction foo() { console.log("Hello"); }'
  },
  {
    title: 'Closures',
    category: 'Advanced',
    description: 'A function bundled together with references to its surrounding state (the lexical environment).',
    content: 'Closures allow an inner function to access the scope of an outer function even after the outer function has finished executing. This is essential for data privacy and functional programming patterns.',
    example: 'function outer() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\nconsole.log(counter()); // 1'
  },
  {
    title: 'Event Loop',
    category: 'Architecture',
    description: 'The mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded.',
    content: 'The Event Loop constantly monitors the Callback Queue and the Call Stack. If the Call Stack is empty, it pushes the first task from the queue onto the stack. This handles asynchronous callbacks (setTimeout, Promises, etc.).',
    example: 'console.log("Start");\nsetTimeout(() => console.log("Timeout"), 0);\nPromise.resolve().then(() => console.log("Promise"));\nconsole.log("End");\n// Output: Start, End, Promise, Timeout'
  },
  {
    title: 'Scope',
    category: 'Fundamentals',
    description: 'The current context of execution in which values and expressions are "visible" or can be referenced.',
    content: 'JavaScript has Global scope, Function (Local) scope, and Block scope (with let/const). Lexical scope means that functions are scoped based on where they are defined, not where they are executed.',
    example: 'if (true) {\n  var x = 1; // Global scope\n  let y = 2; // Block scope\n}\nconsole.log(x); // 1\nconsole.log(y); // ReferenceError'
  },
  {
    title: 'Async/Await',
    category: 'Async',
    description: 'Syntactic sugar built on top of Promises to write asynchronous code that looks and behaves like synchronous code.',
    content: 'The "async" keyword makes a function return a Promise. The "await" keyword pauses the execution of an async function until a Promise is settled. It makes error handling easier with try/catch blocks.',
    example: 'async function fetchData() {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}'
  }
];

export default function TheoryVault() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(concepts.map(c => c.category))];

  const filteredConcepts = concepts.filter(c => 
    (activeCategory === 'All' || c.category === activeCategory) &&
    (c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="px-6 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="text-primary" size={32} /> Theory Vault
            </h1>
            <p className="text-gray-400 mt-1">Master JavaScript architecture and core concepts.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search concepts (e.g. Hoisting)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredConcepts.map((concept, i) => (
              <motion.div
                key={concept.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedConcept(concept)}
                className="glass-card p-6 cursor-pointer group hover:border-primary/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">
                    {concept.category}
                  </span>
                  <div className="text-gray-600 group-hover:text-primary transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{concept.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                  {concept.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles size={12} className="text-yellow-400" /> Read Concept
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedConcept && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedConcept(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-8 md:p-12 z-[70] max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
              >
                <button 
                  onClick={() => setSelectedConcept(null)}
                  className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 inline-block">
                  {selectedConcept.category}
                </span>
                <h2 className="text-4xl font-bold text-white mb-6">{selectedConcept.title}</h2>
                
                <div className="space-y-8">
                  <section>
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Terminal size={16} className="text-primary" /> Concept Overview
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {selectedConcept.content}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Code size={16} className="text-primary" /> Practical Example
                    </h4>
                    <pre className="bg-black/50 border border-white/5 rounded-2xl p-6 text-sm font-mono text-primary-200 overflow-x-auto">
                      {selectedConcept.example}
                    </pre>
                  </section>

                  <div className="flex gap-4 pt-4">
                    <button className="flex-1 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                      Take {selectedConcept.title} Quiz
                    </button>
                    <button className="px-6 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-all">
                      Save to Bookmarks
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
