import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Safely parse user data from localStorage
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
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-12 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <span className="text-white font-bold italic">N</span>
              </div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em]">Admin Console</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user?.username || "Admin"}</span> 👋
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage your content and monitor student engagement.
            </p>
          </div>
          
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>

        {/* Quick Action Bar */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] p-4 mb-10 shadow-sm flex flex-wrap items-center gap-4">
          <div className="px-6 py-2 border-r border-slate-200 hidden lg:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Actions</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:shadow-md transition-all active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            Invite User
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:shadow-md transition-all active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            System Logs
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:shadow-md transition-all active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
          </button>
        </div>

        {/* Action Grid */}
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 ml-1">Management Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Manage Questions Card */}
          <div
            onClick={() => navigate("/admin/questions")}
            className="group relative bg-white rounded-[2.5rem] p-8 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Manage Questions</h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Add, edit, or remove quiz questions and define difficulty levels.
              </p>
              <div className="mt-6 flex items-center text-blue-600 font-bold text-sm">
                Get Started 
                <svg className="ml-2 group-hover:translate-x-2 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </div>
          </div>

          {/* Manage Categories Card */}
          <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100 opacity-70 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center mb-6 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-400 mb-2">Manage Categories</h2>
              <p className="text-slate-400 font-medium text-sm">
                Organize your quizzes into curated subject areas.
              </p>
            </div>
            <div className="mt-6">
              <span className="inline-block px-4 py-1.5 bg-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                Coming Soon
              </span>
            </div>
          </div>

          {/* View Progress Card */}
          <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100 opacity-70 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center mb-6 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-400 mb-2">View Progress</h2>
              <p className="text-slate-400 font-medium text-sm">
                Deep dive into analytics and student performance metrics.
              </p>
            </div>
            <div className="mt-6">
              <span className="inline-block px-4 py-1.5 bg-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                Coming Soon
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;