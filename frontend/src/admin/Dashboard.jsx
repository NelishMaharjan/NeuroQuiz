import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const getUserData = () => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  };

  const user = getUserData();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-900 selection:text-white relative">
      
      {/* Subtle Background Layer */}
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-slate-100/40 to-transparent -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 lg:px-12">
        
        {/* 1. HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-fadeIn">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="3">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Admin Console</span>
            </div>
            
            <h1 className="text-6xl font-bold tracking-tighter text-slate-900 leading-tight">
              Welcome back, <br />
              <span className="text-slate-300 italic uppercase">{user?.username || "Admin"}</span>
            </h1>
          </div>

          {/* Top Right Status Badge */}
          <div className="flex items-center gap-4 bg-white border border-slate-200/60 py-4 px-6 rounded-[2rem] shadow-sm">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs uppercase italic">
                    {user?.username?.charAt(0) || "A"}
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Account Status</p>
                <p className="text-sm font-bold text-slate-900 tracking-tight uppercase italic">System Operator</p>
            </div>
          </div>
        </div>

        {/* 2. NAVIGATION & UTILITY */}
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 bg-white border border-slate-200/50 p-1 rounded-2xl shadow-sm">
                <button 
                  onClick={() => navigate("/")}
                  className="px-4 py-2 text-slate-600 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                  Home
                </button>
                <button 
                  onClick={logout}
                  className="px-4 py-2 text-red-500 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-red-50 transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline></svg>
                  Logout
                </button>
            </div>

            <div className="flex items-center gap-3">
                <button 
                  onClick={() => toast.success("Access link generated! (Simulated)")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                  Invite User
                </button>
            </div>
        </div>

        {/* 3. CORE MANAGEMENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Question Bank */}
          <div
            onClick={() => navigate("/admin/questions")}
            className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm cursor-pointer hover:border-slate-900 transition-all duration-300 min-h-[340px] flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-10 text-white group-hover:rotate-6 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none italic uppercase">Question <br/> Bank</h2>
              <p className="text-slate-400 text-sm font-medium mt-4 leading-relaxed">
                Add, remove, or modify the central quiz database.
              </p>
            </div>
            <div className="text-slate-900 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center italic">
                Launch Module <svg className="ml-2 group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

          {/* User Registry */}
          <div
            onClick={() => navigate("/admin/developer")}
            className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm cursor-pointer hover:border-slate-900 transition-all duration-300 min-h-[340px] flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-white border-2 border-slate-900 rounded-2xl flex items-center justify-center mb-10 text-slate-900 group-hover:-rotate-6 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none italic uppercase">User <br/> Registry</h2>
              <p className="text-slate-400 text-sm font-medium mt-4 leading-relaxed">
                Monitor online units, manage access roles, or revoke system entry.
              </p>
            </div>
            <div className="text-slate-900 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center italic">
                Access Registry <svg className="ml-2 group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

          {/* Global Analytics */}
          <div
            onClick={() => navigate("/admin/analytics")}
            className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm cursor-pointer hover:border-slate-900 transition-all duration-300 min-h-[340px] flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mb-10 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none italic uppercase">Global <br/> Analytics</h2>
              <p className="text-slate-400 text-sm font-medium mt-4 leading-relaxed">
                Track global synchronization accuracy and node activity.
              </p>
            </div>
            <div className="text-slate-900 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center italic">
                Open Reports <svg className="ml-2 group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

        </div>

        {/* 4. FOOTER UTILITY */}
        <div className="mt-12 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
                <button 
                  onClick={() => toast.error("System logs encrypted. Need higher clearance.")}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors italic"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line></svg>
                    System Logs
                </button>
                <button 
                  onClick={() => toast.success("All systems nominal.")}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors italic"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    Settings
                </button>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">© 2026 NeuroQuiz Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
