import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSystemStatsApi } from "../services/api";

const Home = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalResults: 0,
    globalPrecision: 0,
    totalQuestions: 0,
    load: 0,
    serverStatus: "LIVE"
  });
  
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getSystemStatsApi();
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch system stats", error);
      }
    };
    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Science", icon: "🧬", count: "ACTIVE", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { name: "History", icon: "📜", count: "ACTIVE", color: "bg-amber-50 text-amber-600 border-amber-100" },
    { name: "Technology", icon: "💻", count: "ACTIVE", color: "bg-purple-50 text-purple-600 border-purple-100" },
    { name: "Geography", icon: "🌍", count: "ACTIVE", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  ];

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      <main className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto">
        
        {/* TOP DASHBOARD AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 animate-fadeIn">
          
          {/* Main Hero Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                App Online
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.95]">
                Ready to <br />
                <span className="text-slate-400">Test Your Brain?</span>
              </h1>
              
              <p className="max-w-md text-slate-500 font-medium text-sm leading-relaxed mb-10">
                Pick a topic below to start a quick quiz. You can also enter a secret code to join a specific challenge!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {(user?.role === "admin" || user?.role === "developer") ? (
                  <button 
                    onClick={() => navigate("/admin/dashboard")}
                    className="px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                  >
                    Admin Panel
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate("/contribute")}
                    className="px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                  >
                    Add a Question
                  </button>
                )}
                
                <div className="relative group/input flex-1 max-w-xs">
                  <input 
                    type="text" 
                    placeholder="ENTER QUIZ CODE"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && joinCode.trim() && navigate(`/quiz/${joinCode.trim()}`)}
                    className="w-full h-full px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-bold text-xs uppercase tracking-widest placeholder:text-slate-300"
                  />
                  <button 
                    onClick={() => joinCode.trim() && navigate(`/quiz/${joinCode.trim()}`)}
                    className="absolute right-2 top-2 bottom-2 bg-white px-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors"
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Stats Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex-1 bg-slate-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl shadow-slate-900/20">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Global Score Average</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{stats.globalPrecision}%</span>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest italic animate-pulse">● {stats.serverStatus}</span>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Server Status</span>
                    <span>{stats.load}% OK</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 transition-all duration-1000" 
                      style={{ width: `${stats.load}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Online Players</span>
                    <span>{stats.activeUsers}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Total Quizzes Done</span>
                    <span>{stats.totalResults}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-24 bg-white border border-slate-200/60 rounded-[2rem] p-6 flex items-center justify-between shadow-lg shadow-slate-200/20">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Streak</p>
                <p className="text-xl font-black text-slate-900">3 Days</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-xl shadow-sm">
                🔥
              </div>
            </div>
          </div>
        </div>

        {/* 3. MODULES GRID */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase italic">
              Quiz <span className="text-slate-300">Topics</span>
            </h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pick One</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/${cat.name}`)}
                style={{ animationDelay: `${i * 100 + 200}ms` }}
                className="group relative bg-white border border-slate-200/60 p-8 rounded-[2.5rem] cursor-pointer hover:border-slate-900 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-slate-200/30 animate-fadeIn"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.color} border flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                  {cat.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{cat.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{cat.count}</span>
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="w-full border-t border-slate-200/60 bg-white/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-slate-900 rounded-md" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">NeuroQuiz App</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Version 2.4.0 • App is running smoothly</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
