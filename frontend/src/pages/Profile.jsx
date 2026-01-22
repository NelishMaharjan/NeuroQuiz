import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  
  // State for user data
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: ""
  });

  // State for password changes
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated! (Demo)");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-center shadow-sm">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-100">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{user.username}</h2>
              <p className="text-sm text-slate-500 font-medium mb-6">{user.email}</p>
              
              <div className="pt-6 border-t border-slate-50 space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>Role</span>
                  <span className="text-blue-600">{user.role || "Administrator"}</span>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-8 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all active:scale-95 text-sm"
              >
                Logout Account
              </button>
            </div>
          </div>

          {/* Right Column: Settings Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Public Profile Form */}
            <form onSubmit={handleUpdateProfile} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2 ml-1">Username</label>
                    <input 
                      type="text" 
                      value={user.username}
                      onChange={(e) => setUser({...user, username: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50/50 px-8 py-4 flex justify-end border-t border-slate-100">
                <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-100">
                  Save Changes
                </button>
              </div>
            </form>

            {/* Password Security Form */}
            <form className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Security & Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2 ml-1">New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2 ml-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50/50 px-8 py-4 flex justify-end border-t border-slate-100">
                <button type="button" className="px-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition active:scale-95">
                  Update Password
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;