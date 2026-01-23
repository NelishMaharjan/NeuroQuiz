import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const categories = [
    { name: "Science", icon: "🧬", count: "Live", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { name: "History", icon: "📜", count: "Live", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    { name: "Technology", icon: "💻", count: "Live", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
    { name: "Geography", icon: "🌍", count: "Live", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  ];

  const handleJoinByCode = (e) => {
    e.preventDefault();
    if (joinCode.trim()) {
      navigate(`/quiz/${joinCode.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="3">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">NeuroQuiz</span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </button>

                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div 
                  onClick={() => navigate("/profile")}
                  className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-slate-700 transition-all ml-1"
                >
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
              <button 
                onClick={() => navigate("/login")} 
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-slate-800 transition"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 2. HERO */}
      <main className="relative pt-40 pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-8 leading-[0.9]">
            The intelligent way <br />
            <span className="text-slate-400">to learn & quiz.</span>
          </h1>

          <div className="max-w-md mx-auto mb-10">
          <p className="max-w-lg text-slate-400 text-sm md:text-base font-medium leading-relaxed">
              Beautifully designed tools for creators and students. <br className="hidden md:block" /> 
              Join the next generation of digital learning.
            </p><br></br>
            <form onSubmit={handleJoinByCode} className="relative group">
              <input 
                type="text" 
                placeholder="Enter Category Code (e.g. Science)"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900 shadow-sm"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition active:scale-95"
              >
                Join Quiz
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <button 
              onClick={() => navigate("/admin/dashboard")}
              className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Admin Dashboard
            </button>
            
          </div>
        </div>

        {/* 3. BENTO CATEGORIES */}
        <div className="max-w-6xl mx-auto px-6 mt-32">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Active Modules</h2>
              <p className="text-slate-400 text-sm mt-1">Directly solve questions added by the admin.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/${cat.name}`)}
                className="group relative bg-white border border-slate-200/60 p-6 rounded-[2rem] cursor-pointer hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${cat.color} border flex items-center justify-center text-xl mb-14 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900">{cat.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cat.count}</span>
                    <span className="text-[10px] font-black text-blue-600 group-hover:translate-x-1 transition-transform">SOLVE →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="w-full border-t border-slate-100 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-lg font-bold text-slate-900">NeuroQuiz</span>
              <p className="text-xs text-slate-400 mt-1">© 2026 All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-widest">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-widest">Instagram</a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-widest">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;