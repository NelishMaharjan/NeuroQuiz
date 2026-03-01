import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total, category } = location.state || { score: 0, total: 0, category: "Unknown" };
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getMessage = () => {
    if (percentage === 100) return "Master of Intelligence! 🧠";
    if (percentage >= 80) return "Exceptional Performance! 🚀";
    if (percentage >= 50) return "Solid Foundation! 👍";
    return "The Journey Continues... 📚";
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 pt-24">
      <div className="w-full max-w-2xl bg-white border border-slate-200/60 p-12 rounded-[3.5rem] text-center shadow-2xl shadow-slate-200/50 relative overflow-hidden">

        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600" />

        <div className="relative z-10">
          <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-10 shadow-2xl shadow-slate-900/20 rotate-3 group hover:rotate-0 transition-transform">
            {percentage >= 80 ? "🏆" : "🏁"}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
            Session Complete
          </h1>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mb-12">
            Subject: {category}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <div className="text-6xl font-black text-slate-900 leading-none mb-3">
                {percentage}%
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency Score</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
              <div className="text-4xl font-black text-slate-900 leading-none mb-3">
                {score}<span className="text-slate-300 text-2xl">/{total}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questions Cleared</p>
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900">{getMessage()}</h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">You've successfully completed the neural evaluation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate("/")} 
              className="py-5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
            >
              Return Home
            </button>

            <button 
              onClick={() => navigate("/profile")} 
              className="py-5 bg-white border-2 border-slate-200 text-slate-900 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:border-slate-900 transition-all active:scale-95"
            >
              Check Profile
            </button>
          </div>
        </div>
      </div>

      <p className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] animate-pulse">
        Generating Neural Report...
      </p>
    </div>
  );
};

export default Result;