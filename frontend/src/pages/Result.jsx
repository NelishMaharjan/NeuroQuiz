import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Destructure the data passed from Quiz.jsx
  // Fallback values provided in case the page is accessed directly
  const { score, total, category } = location.state || { score: 0, total: 0, category: "Unknown" };

  // Calculate percentage
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  // Dynamic message based on performance
  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎯";
    if (percentage >= 80) return "Impressive Work! 🚀";
    if (percentage >= 50) return "Good Effort! 👍";
    return "Keep Practicing! 📚";
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 p-12 rounded-[3rem] text-center shadow-2xl shadow-slate-200/60">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          🏆
        </div>

        <h1 className="text-3xl font-black text-slate-900 mb-2">Quiz Complete</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">
          Module: {category}
        </p>
        
        {/* Big Score Display */}
        <div className="mb-10">
          <div className="text-7xl font-black text-slate-900 leading-none">
            {percentage}%
          </div>
          <p className="text-slate-500 font-bold mt-4 text-lg">
            {getMessage()}
          </p>
          <p className="text-slate-400 text-sm mt-1">
            You got {score} out of {total} questions correct.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate("/")} 
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:scale-[1.02] transition active:scale-95 shadow-xl shadow-slate-200"
          >
            Back to Dashboard
          </button>
          
          <button 
            onClick={() => navigate("/profile")} 
            className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition"
          >
            View My Progress
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <p className="mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
        NeuroQuiz Analysis Engine
      </p>
    </div>
  );
};

export default Result;