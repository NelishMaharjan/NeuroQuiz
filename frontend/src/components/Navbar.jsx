import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUserApi } from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "text-slate-900"
        : "text-slate-400 hover:text-slate-600"
    }`;

  const handleLogout = async () => {
    try {
      if (user?.id) await logoutUserApi(user.id);
    } catch (err) {
      console.error("Logout status update failed", err);
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="3">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">NeuroQuiz</span>
        </NavLink>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {user?.role === "user" && (
            <NavLink to="/dashboard" className={linkClass}>
              PERSONAL ANALYTICS
            </NavLink>
          )}
          {(user?.role === "admin" || user?.role === "developer") && (
            <>
              <NavLink to="/admin/dashboard" className={linkClass}>
                Management
              </NavLink>
              <NavLink to="/admin/questions" className={linkClass}>
                Questions
              </NavLink>
            </>
          )}
          {user?.role === "developer" && (
            <NavLink to="/admin/developer" className={linkClass}>
              System
            </NavLink>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 relative">
              
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200/60 rounded-[2rem] shadow-2xl shadow-slate-200/50 p-6 z-[200] animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-4 text-left">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inbox</h3>
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">1 New</span>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-white hover:border-slate-200 transition-all text-left">
                        <p className="text-xs font-bold text-slate-900 leading-snug">
                          System Update: New <span className="text-blue-600">Developer Console</span> is now live!
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2 font-medium">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => navigate("/profile")}
                className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold cursor-pointer hover:ring-4 hover:ring-slate-900/10 transition-all"
              >
                {user.username?.charAt(0).toUpperCase()}
              </button>
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate("/login")} 
              className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
