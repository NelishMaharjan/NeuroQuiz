import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByCategoryApi } from '../services/api'; 
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';

const Quiz = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestionsByCategoryApi(categoryName);

        if (!res.data || res.data.length === 0) {
            navigate("/");
            return;
        }

        const sanitizedData = res.data.map(q => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        }));

        setQuestions(sanitizedData);
      } catch (err) {
        navigate("/");
      }
    };
    fetchQuestions();
  }, [categoryName, navigate]);

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

  const q = questions[currentIdx];

  const handleSelect = (option) => {
    setSelected(option);
    setIsAnswered(true);
    if (option === q.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleTimeUp = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      setSelected("TIMEOUT_EXPIRED"); // Dummy value to trigger result state
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      navigate('/result', { state: { score, total: questions.length, category: categoryName } });
    }
  };

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

            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/10 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Current Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">{score}</span>
                <span className="text-slate-500 font-bold">points</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Quiz;