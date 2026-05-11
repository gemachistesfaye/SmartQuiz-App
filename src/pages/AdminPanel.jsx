import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { Plus, Trash2, FileText, Layout, Database, Save } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminPanel() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: 0,
    difficulty: 'medium',
    explanation: ''
  });

  const fetchQuestions = async () => {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const qList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setQuestions(qList);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(collection(db, "questions"), newQuestion);
      toast.success("Question added to database!");
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correct: 0,
        difficulty: 'medium',
        explanation: ''
      });
      fetchQuestions();
    } catch (error) {
      toast.error("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteDoc(doc(db, "questions", id));
      toast.info("Question deleted");
      fetchQuestions();
    }
  };

  return (
    <DashboardLayout>
      <div className="p-0">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Add New Question */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                  <Plus size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Add New Question</h3>
              </div>

              <form onSubmit={handleAddQuestion} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Question Text</label>
                  <textarea 
                    required
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors h-24"
                    placeholder="Enter the JS question..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newQuestion.options.map((opt, i) => (
                    <div key={i} className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Option {i + 1}</label>
                      <input 
                        type="text" 
                        required
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...newQuestion.options];
                          newOpts[i] = e.target.value;
                          setNewQuestion({...newQuestion, options: newOpts});
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase">Correct Answer</label>
                    <select 
                      value={newQuestion.correct}
                      onChange={(e) => setNewQuestion({...newQuestion, correct: parseInt(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none"
                    >
                      <option value={0}>Option 1</option>
                      <option value={1}>Option 2</option>
                      <option value={2}>Option 3</option>
                      <option value={3}>Option 4</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase">Difficulty</label>
                    <select 
                      value={newQuestion.difficulty}
                      onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Explanation</label>
                  <input 
                    type="text" 
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Why is this answer correct?"
                  />
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={20} /> Add Question</>}
                </button>
              </form>
            </motion.div>

            {/* Existing Questions List */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/20 p-2 rounded-lg text-secondary">
                    <Database size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Question Bank ({questions.length})</h3>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {questions.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/5 group relative">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        q.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' : 
                        q.difficulty === 'medium' ? 'bg-blue-500/20 text-blue-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {q.difficulty}
                      </span>
                      <button 
                        onClick={() => handleDelete(q.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-white font-medium mb-1 line-clamp-2">{q.question}</p>
                    <p className="text-xs text-gray-500 italic">{q.explanation}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
