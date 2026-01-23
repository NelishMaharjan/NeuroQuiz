import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 🔥 Import the new function we just added to api.js
import { getQuestionsByCategoryApi } from '../services/api'; 

const Quiz = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // 🔥 Use the API service (which points to port 3000)
        const res = await getQuestionsByCategoryApi(categoryName);
        
        if (!res.data || res.data.length === 0) {
            alert("No questions found for this code!");
            navigate("/");
            return;
        }

        // Ensure options are parsed if they come back as a string
        const sanitizedData = res.data.map(q => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        }));

        setQuestions(sanitizedData);
      } catch (err) {
        console.error("Quiz Fetch Error:", err);
        alert("Connection Error. Check if Backend is running on port 3000.");
        navigate("/");
      }
    };
    fetchQuestions();
  }, [categoryName, navigate]);

  // 1. Prevent "Blank Screen" by returning a loader if questions aren't ready
  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-slate-400 font-bold animate-pulse text-xs tracking-widest uppercase">
          Initializing Quiz Session...
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  // 2. Prevent crash if current question is missing
  if (!q) return null;

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      navigate('/result', { state: { score, total: questions.length, category: categoryName } });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Code: {categoryName}
            </span>
            <span className="text-xs font-bold text-slate-300">
              Q {currentIdx + 1} of {questions.length}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">
            {q.questionText}
          </h2>
        </div>

        <div className="grid gap-3">
          {q.options && q.options.map((opt, i) => (
            <button key={i} 
              disabled={!!selected}
              onClick={() => { 
                setSelected(opt); 
                if(opt === q.correctAnswer) setScore(prev => prev + 1); 
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all font-semibold ${
                selected === opt 
                  ? (opt === q.correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-red-500 bg-red-50 text-red-700')
                  : (selected && opt === q.correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 hover:border-slate-200')
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {selected && (
          <button onClick={handleNext} className="w-full mt-8 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition shadow-lg shadow-slate-200">
            {currentIdx + 1 === questions.length ? "Finish Quiz" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;