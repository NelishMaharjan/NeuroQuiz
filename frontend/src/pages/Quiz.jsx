import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByCategoryApi } from '../services/api';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import { toast } from 'react-hot-toast';

const Quiz = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showXpGain, setShowXpGain] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestionsByCategoryApi(categoryName);

        if (!res.data || res.data.length === 0) {
            toast.error(`No questions found for "${categoryName}"`);
            navigate("/");
            return;
        }

        const sanitizedData = res.data.map(q => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        }));

        setQuestions(sanitizedData);
        toast.success(`Success! Challenge loaded.`);
      } catch (err) {
        toast.error("An error occurred while fetching questions.");
        navigate("/");
      }
    };
    fetchQuestions();
  }, [categoryName, navigate]);

  const q = questions[currentIdx];

  const handleSelect = useCallback((option) => {
    if (isAnswered || !q) return;
    setSelected(option);
    setIsAnswered(true);
    if (option === q.correctAnswer) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(best => Math.max(best, newStreak));
        return newStreak;
      });
      setShowXpGain(true);
      setTimeout(() => setShowXpGain(false), 800);
    } else {
      setStreak(0);
    }
  }, [isAnswered, q]);

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setSelected("TIMEOUT_EXPIRED");
      setStreak(0);
    }
  }, [isAnswered]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      navigate('/result', { state: { score, total: questions.length, category: categoryName, bestStreak } });
    }
  }, [currentIdx, questions.length, score, categoryName, bestStreak, navigate]);

  // Keyboard shortcuts (1-4 keys, Enter for next)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!q) return;
      if (isAnswered) {
        if (e.key === 'Enter') handleNext();
        return;
      }
      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 4 && q.options && q.options[keyNum - 1]) {
        handleSelect(q.options[keyNum - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnswered, q, handleNext, handleSelect]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-6"></div>
        <div className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase">
          Initializing Session
        </div>
      </div>
    );
  }

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {categoryName}
              </span>
              <h1 className="text-sm font-bold text-slate-400 mt-2 italic">
                Step {currentIdx + 1} of {questions.length}
              </h1>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Progress</span>
              <div className="text-xl font-black text-slate-900 leading-none mt-1">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 transition-all duration-500 ease-out rounded-full shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200/60 p-10 rounded-[3rem] shadow-2xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900/5" />

              <QuestionCard 
                question={q}
                selectedOption={selected}
                onSelect={handleSelect}
                isDisabled={isAnswered}
              />

              {isAnswered && (
                <button 
                  onClick={handleNext} 
                  className="w-full mt-10 py-5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-[2rem] hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3"
                >
                  {currentIdx + 1 === questions.length ? "Analyze Results" : "Next Challenge"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              )}
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200/60 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/20">
              <Timer
                duration={30}
                onTimeUp={handleTimeUp}
                resetTrigger={currentIdx}
              />
            </div>

            {/* Streak Counter */}
            <div className={`bg-gradient-to-br from-amber-400 to-orange-500 text-white p-6 rounded-[2rem] shadow-xl shadow-orange-200/50 relative overflow-hidden transition-all duration-300 ${streak >= 3 ? 'animate-pulse' : ''}`}>
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/20 rounded-full blur-xl" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-1">Streak</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{streak}</span>
                    <span className="text-white/70 text-sm">🔥</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-1">Best</p>
                  <span className="text-xl font-black">{bestStreak}</span>
                </div>
              </div>
              {streak >= 3 && (
                <p className="text-[10px] font-bold mt-2 text-white/90">On fire! Keep going!</p>
              )}
            </div>

            {/* Score with XP Animation */}
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/10 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Current Score</p>
              <div className="flex items-baseline gap-2 relative">
                <span className="text-5xl font-black transition-all duration-300">{score}</span>
                <span className="text-slate-500 font-bold">points</span>
                {/* XP Gain Animation */}
                {showXpGain && (
                  <span className="absolute -top-2 left-12 text-emerald-400 text-lg font-black animate-xp-gain">
                    +1
                  </span>
                )}
              </div>
            </div>

            {/* Keyboard Hints */}
            <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-[2rem]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Shortcuts</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <kbd key={num} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                    {num}
                  </kbd>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Press 1-4 to answer • Enter for next</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Quiz;