import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveResultApi, updateUserApi } from '../services/api';
import confetti from 'canvas-confetti';

const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasSaved = useRef(false);

  const { score, total, category } = location.state || { score: 0, total: 0, category: "Unknown" };
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const xpGained = score * 100;

  useEffect(() => {
    if (percentage >= 50) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }

    const saveResultAndXp = async () => {
      if (hasSaved.current) return;
      hasSaved.current = true;

      const savedUser = localStorage.getItem("user");
      if (savedUser && location.state) {
        const user = JSON.parse(savedUser);
        try {
          // 1. Save Quiz Result
          await saveResultApi({
            userId: user.id,
            category,
            score,
            totalQuestions: total
          });

          // 2. Update XP and Level
          let newXp = (user.xp || 0) + xpGained;
          let newLevel = user.level || 1;
          const xpToNext = newLevel * 1000;
          
          if (newXp >= xpToNext) {
            newLevel += 1;
            newXp -= xpToNext;
          }

          await updateUserApi(user.id, { xp: newXp, level: newLevel });
          
          // 3. Update Local Storage
          const updatedUser = { ...user, xp: newXp, level: newLevel };
          localStorage.setItem("user", JSON.stringify(updatedUser));

        } catch (error) {
          console.error("Failed to process result data", error);
          hasSaved.current = false;
        }
      }
    };
    saveResultAndXp();
  }, [category, score, total, location.state, percentage, xpGained]);

  const getMessage = () => {
    if (percentage === 100) return "Master of Intelligence! 🧠";
    if (percentage >= 80) return "Exceptional Performance! 🚀";
    if (percentage >= 50) return "Solid Foundation! 👍";
    return "The Journey Continues... 📚";
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col items-center justify-center p-6 pt-24 relative overflow-hidden">
      {/* Subtle Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-[100px] opacity-50" />

      <div className="w-full max-w-2xl bg-white border border-slate-200/60 p-12 rounded-[3.5rem] text-center shadow-2xl shadow-slate-200/30 relative overflow-hidden animate-fadeIn">

        {/* Accent Strip */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900" />

        <div className="relative z-10">
          <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-2xl shadow-slate-900/20 rotate-3 transition-transform">
            {percentage >= 80 ? "🏆" : "🏁"}
          </div>

          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-2 uppercase italic">
            Session <span className="text-slate-300">Complete</span>
          </h1>
          <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-12">
            Module: {category}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 transition-colors">
              <div className="text-6xl font-black text-slate-900 leading-none mb-3 italic">
                <AnimatedNumber value={percentage} />%
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Precision</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
              <div className="text-4xl font-black text-slate-900 leading-none mb-3 italic">
                <AnimatedNumber value={score} />
                <span className="text-slate-300 text-2xl not-italic">/{total}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Synapses Cleared</p>
            </div>
          </div>

          {/* XP Gained Badge */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 bg-slate-100 border border-slate-200 px-6 py-2.5 rounded-full">
              <span className="text-slate-900 text-xs font-black italic uppercase tracking-widest">+{xpGained} Experience Points</span>
              <div className="w-2 h-2 bg-slate-900 rounded-full animate-ping" />
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 italic">{getMessage()}</h2>
            <p className="text-slate-400 text-sm mt-2 font-bold uppercase tracking-widest">Neural evaluation successfully recorded.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate("/")} 
              className="py-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
            >
              Return to Hub
            </button>

            <button 
              onClick={() => navigate("/profile")} 
              className="py-5 bg-white border-2 border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:border-slate-900 transition-all active:scale-95"
            >
              Access Profile
            </button>
          </div>
        </div>
      </div>

      <p className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] animate-pulse">
        Synchronizing Neural Data...
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out both;
        }
      `}} />
    </div>
  );
};

export default Result;
