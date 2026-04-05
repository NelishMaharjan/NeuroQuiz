import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUserApi } from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [window.location.pathname]);

  const linkClass = ({ isActive }) =>
    `text-[10px] font-black tracking-[0.2em] transition-all duration-300 uppercase ${
      isActive
        ? "text-slate-900 border-b-2 border-slate-900 pb-1"
        : "text-slate-400 hover:text-slate-900"
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

  const profileImageUrl = user?.profileImage ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/${user.profileImage}` : null;

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-4 group"
        >
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center transition-all group-hover:scale-105 shadow-lg shadow-slate-900/10">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="3">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 uppercase">NeuroQuiz</span>
        </NavLink>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-12">
          {user?.role === "user" && (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Analytics
              </NavLink>
              <NavLink to="/contribute" className={linkClass}>
                Contribute
              </NavLink>
            </>
          )}
          {(user?.role === "admin" || user?.role === "developer") && (
            <NavLink to="/admin/dashboard" className={linkClass}>
              Management
            </NavLink>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-6 relative">
              
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-slate-900 rounded-full border-2 border-white"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-5 w-80 bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-8 z-[200] animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-6 text-left">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Neural Inbox</h3>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Active</span>
                    </div>
                    <div className="space-y-4">
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-white transition-all text-left">
                        <p className="text-xs font-bold text-slate-900 leading-snug">
                          System: Interface colors synchronized successfully.
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest">Just now</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-200 hidden sm:block" />

              <button 
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-xl bg-slate-900 p-[2px] cursor-pointer hover:scale-105 transition-all shadow-lg shadow-slate-900/10 group overflow-hidden"
              >
                <div className="w-full h-full bg-white rounded-[9px] overflow-hidden flex items-center justify-center">
                  {profileImageUrl ? (
                    <img src={profileImageUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-black text-slate-900 uppercase italic">{user.username?.charAt(0)}</span>
                  )}
                </div>
              </button>

              <button 
                onClick={handleLogout}
                className="text-[10px] font-black text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest"
              >
                Exit
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate("/login")} 
              className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
            >
              &gt;_ Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
