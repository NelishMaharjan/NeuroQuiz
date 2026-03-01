import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUserApi } from "../services/api";
import InputField from "../components/InputField";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: "", username: "", email: "" });
  const [newPassword, setNewPassword] = useState("");
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

  const handleUpdateProfile = async () => {
    if (!user.username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    
    setLoading(true);
    try {
      const res = await updateUserApi(user.id, { username: user.username });
      const updatedUser = { ...user, username: res.data.user.username };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile updated! 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await updateUserApi(user.id, { password: newPassword });
      setNewPassword("");
      toast.success("Password changed successfully! 🔑");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] pt-28 pb-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-sm font-bold text-slate-400 hover:text-slate-900 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shadow-sm group-hover:bg-slate-50">
              ←
            </div>
            Back to Home
          </button>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">User Account Settings</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: The Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 text-center shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-slate-900 to-slate-700" />
              
              <div className="relative pt-6">
                <div className="w-28 h-28 bg-white p-2 rounded-[2.5rem] inline-block shadow-2xl relative z-10">
                  <div className="w-full h-full bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
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

          {/* Right Column: The Settings Forms */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Personal Details Form */}
            <div className="bg-white border border-slate-200 rounded-[3.5rem] shadow-xl shadow-slate-200/20 overflow-hidden">
              <div className="p-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                    👤
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Personal Details</h3>
                    <p className="text-slate-400 text-sm font-medium">Update your display identity</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField 
                    label="Display Name"
                    name="username"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                  />
                  <InputField 
                    label="Email Address"
                    name="email"
                    value={user.email}
                    onChange={() => {}}
                    error={null}
                    disabled={true} // Email is usually protected
                  />
                </div>
              </div>
              
              <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <p className="text-[10px] text-slate-400 font-bold max-w-[200px]">Username changes are instant.</p>
                <button 
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Security Form */}
            <div className="bg-white border border-slate-200 rounded-[3.5rem] shadow-xl shadow-slate-200/20 overflow-hidden">
              <div className="p-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                    🔑
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Security</h3>
                    <p className="text-slate-400 text-sm font-medium">Reset your access password</p>
                  </div>
                </div>

                <div className="max-w-sm">
                  <InputField 
                    label="New Secure Password"
                    type="password"
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 text-right">
                <button 
                  onClick={handleUpdatePassword}
                  disabled={loading}
                  className="px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Update Password"}
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
