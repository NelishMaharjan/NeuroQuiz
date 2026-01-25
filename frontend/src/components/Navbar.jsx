import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-500 transition";

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      
      {/* Logo-style Home */}
      <NavLink
        to="/"
        className="flex items-center gap-1 font-black text-xl tracking-tight"
      >
        <span className="text-blue-600">Neuro</span>
        <span className="text-slate-900">Quiz</span>
        <span className="ml-1 text-[10px] px-2 py-[2px] rounded-full bg-blue-600 text-white tracking-widest">
          IQ
        </span>
      </NavLink>

      {/* Nav links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/questions" className={linkClass}>
          Questions
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
