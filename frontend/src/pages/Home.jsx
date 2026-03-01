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
      
      {/* 2. HERO */}
      <main className="relative pt-40 pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-8 leading-[0.9]">
            The intelligent way <br />
            <span className="text-slate-400">to learn & quiz.</span>
          </h1>

          <div className="max-w-md mx-auto mb-16">
            <p className="max-w-lg text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-10">
              Beautifully designed tools for creators and students. <br className="hidden md:block" /> 
              Join the next generation of digital learning.
            </p>

            <form onSubmit={handleJoinByCode} className="relative group">
              <div className="absolute -top-3 left-6 px-2 bg-[#fafafa] z-10">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Join with code</span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-5 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter Category (e.g. Science)"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="w-full pl-14 pr-36 py-5 bg-white border border-slate-200 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-bold text-slate-900 shadow-xl shadow-slate-200/50 placeholder:text-slate-300 placeholder:font-medium"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-8 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
                >
                  Enter
                </button>
              </div>
              <p className="text-[10px] text-slate-400 font-bold mt-4 tracking-wide">
                Tip: Use <span className="text-slate-900">"Science"</span> or <span className="text-slate-900">"History"</span> to start instantly
              </p>
            </form>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <button 
              onClick={() => navigate("/admin/dashboard")}
              className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Create Questions
            </button>
            
          </div>
        </div>

        {/* 3. BENTO CATEGORIES */}
        <div className="max-w-6xl mx-auto px-6 mt-32">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Test Your Knowledge</h2>
              <p className="text-slate-400 text-sm mt-1">Directly solve random questions</p>
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