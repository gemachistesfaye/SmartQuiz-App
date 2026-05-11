import { useState, useEffect, useCallback } from 'react';
import { questions } from '../data/questions';

const XP_PER_CORRECT = 50;
const STREAK_BONUS = 10;

export const useQuiz = (settings) => {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    xp: 0,
    streak: 0,
    isFinished: false,
    results: [],
    timeLeft: settings.timerMode ? 30 : null,
    isActive: false,
  });

  const [currentQuestions, setCurrentQuestions] = useState([]);

  // Initialize Quiz
  const startQuiz = useCallback(() => {
    let filtered = questions;
    if (settings.difficulty !== 'all') {
      filtered = questions.filter(q => q.difficulty === settings.difficulty);
    }
    
    // Shuffle
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    
    // Limit for Marathon vs Daily
    const finalQuestions = settings.mode === 'marathon' ? shuffled : shuffled.slice(0, 5);

    setCurrentQuestions(finalQuestions);
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      score: 0,
      xp: 0,
      isFinished: false,
      results: [],
      timeLeft: settings.timerMode ? 30 : null,
      isActive: true,
    }));
  }, [settings]);

  // Handle Answer
  const submitAnswer = (answerIndex) => {
    const currentQuestion = currentQuestions[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.answer;
    
    const newStreak = isCorrect ? quizState.streak + 1 : 0;
    const gainedXP = isCorrect ? XP_PER_CORRECT + (newStreak * STREAK_BONUS) : 0;

    const newResults = [
      ...quizState.results,
      { questionId: currentQuestion.id, isCorrect, answerIndex }
    ];

    if (quizState.currentQuestionIndex + 1 < currentQuestions.length) {
      setQuizState(prev => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        xp: prev.xp + gainedXP,
        streak: newStreak,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        results: newResults,
        timeLeft: settings.timerMode ? 30 : null, // Reset timer for next question
      }));
    } else {
      finishQuiz(isCorrect, gainedXP, newStreak, newResults);
    }
  };

  const finishQuiz = (lastCorrect, lastXP, finalStreak, finalResults) => {
    setQuizState(prev => {
      const finalState = {
        ...prev,
        score: lastCorrect ? prev.score + 1 : prev.score,
        xp: prev.xp + lastXP,
        streak: finalStreak,
        isFinished: true,
        isActive: false,
        results: finalResults
      };
      
      // Persist to Local Storage
      const savedStats = JSON.parse(localStorage.getItem('smartquiz_stats') || '{"totalXP": 0, "bestStreak": 0}');
      localStorage.setItem('smartquiz_stats', JSON.stringify({
        totalXP: savedStats.totalXP + finalState.xp,
        bestStreak: Math.max(savedStats.bestStreak, finalState.streak)
      }));

      return finalState;
    });
  };

  // Timer Effect
  useEffect(() => {
    let timer;
    if (quizState.isActive && quizState.timeLeft !== null && quizState.timeLeft > 0) {
      timer = setInterval(() => {
        setQuizState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (quizState.timeLeft === 0 && quizState.isActive) {
      submitAnswer(-1); // Fail question if time runs out
    }
    return () => clearInterval(timer);
  }, [quizState.isActive, quizState.timeLeft]);

  return {
    ...quizState,
    currentQuestion: currentQuestions[quizState.currentQuestionIndex],
    totalQuestions: currentQuestions.length,
    startQuiz,
    submitAnswer
  };
};
