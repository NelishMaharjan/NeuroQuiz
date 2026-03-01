import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "text-slate-900"
        : "text-slate-400 hover:text-slate-600"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
          <NavLink to="/admin/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/questions" className={linkClass}>
            Questions
          </NavLink>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
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
