import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const categories = [
    { name: "Science", icon: "🧬", count: "120+ Questions", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
    { name: "Technology", icon: "💻", count: "85+ Questions", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { name: "History", icon: "📜", count: "60+ Questions", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    { name: "Geography", icon: "🌍", count: "45+ Questions", color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. NAVIGATION: Ultra-thin Glassmorphism */}
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

          <div className="flex items-center gap-6">
            <Link to="/explore" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition">Explore</Link>
            {user ? (
              <div 
                onClick={() => navigate("/profile")}
                className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold cursor-pointer hover:ring-4 ring-slate-100 transition-all"
              >
                {user.username?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <button 
                onClick={() => navigate("/login")} 
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-slate-800 transition shadow-md shadow-slate-200"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 2. HERO: Modern Minimalist */}
      <main className="relative pt-40 pb-24 overflow-hidden">
        {/* Subtle Background Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]"></div>
          <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/40 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">v2.0 Now Live</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-8 leading-[0.9]">
            The intelligent way <br />
            <span className="text-slate-400">to learn & quiz.</span>
          </h1>

          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 font-medium leading-relaxed">
            Beautifully designed tools for creators and students. Join the next generation of digital learning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button 
              onClick={() => navigate("/admin/dashboard")}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:shadow-xl hover:shadow-slate-200 transition-all active:scale-[0.98]"
            >
              Create Quiz
            </button>
            <button 
              onClick={() => navigate("/join")}
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-2xl hover:bg-slate-50 transition-all"
            >
              Join with Code
            </button>
          </div>
        </div>

        {/* 3. BENTO CATEGORIES: Professional & Clean */}
        <div className="max-w-6xl mx-auto px-6 mt-32">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Quick Discovery</h2>
              <p className="text-slate-400 text-sm mt-1">Select a path to start your journey.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                className="group relative bg-white border border-slate-200/60 p-6 rounded-[2rem] cursor-pointer hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${cat.color} border flex items-center justify-center text-xl mb-14 group-hover:scale-110 transition-transform duration-500`}>
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900">{cat.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cat.count}</span>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 4. FOOTER: Minimalist */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">NeuroQuiz © 2026</span>
          <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900 transition">Terms</a>
            <a href="#" className="hover:text-slate-900 transition">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;