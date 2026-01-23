import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", role: "" });
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

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-bold text-slate-400 hover:text-slate-900 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shadow-sm group-hover:bg-slate-50">
              ←
            </div>
            Back to Dashboard
          </button>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">User Account Settings</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: The "Card" */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 text-center shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-700" />
              
              <div className="relative pt-6">
                <div className="w-28 h-28 bg-white p-2 rounded-[2.5rem] inline-block shadow-2xl relative z-10">
                  <div className="w-full h-full bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="absolute bottom-1 right-1/3 w-6 h-6 bg-green-500 border-4 border-white rounded-full z-20 shadow-sm" />
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{user.username}</h2>
                <p className="text-slate-400 font-medium text-sm mt-1">{user.email}</p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-black text-slate-900">12</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quizzes</div>
                </div>
                <div className="text-center border-l border-slate-50">
                  <div className="text-xl font-black text-blue-600">84%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Score</div>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-10 py-4 bg-slate-50 text-slate-400 font-bold rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all text-xs uppercase tracking-widest"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Right Column: The Forms */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Form Section */}
            <div className="bg-white border border-slate-200 rounded-[3rem] shadow-xl shadow-slate-200/20 overflow-hidden">
              <div className="p-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                    👤
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Personal Details</h3>
                    <p className="text-slate-400 text-sm font-medium">Manage your display name and email</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Your Name</label>
                    <input 
                      type="text" 
                      value={user.username}
                      onChange={(e) => setUser({...user, username: e.target.value})}
                      className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className="w-full p-5 bg-slate-100/50 border border-slate-200 rounded-3xl text-slate-400 cursor-not-allowed font-bold"
                    />
                  </div>
                </div>
              </div>
              
              <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <p className="text-[10px] text-slate-400 font-bold max-w-[200px]">Email changes require admin verification.</p>
                <button className="px-10 py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  Update Profile
                </button>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white border border-slate-200 rounded-[3rem] shadow-xl shadow-slate-200/20 overflow-hidden">
              <div className="p-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                    🔑
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Security</h3>
                    <p className="text-slate-400 text-sm font-medium">Update your account password</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                    />
                  </div>
                </div>
              </div>
              <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 text-right">
                <button className="px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all">
                  Change Password
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;