import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUserApi } from "../services/api";
import InputField from "../components/InputField";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [user, setUser] = useState({ 
    id: "", 
    username: "", 
    email: "", 
    profileImage: null, 
    xp: 0, 
    level: 1 
  });
  
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.profileImage) {
        setPreviewImage(`http://localhost:3000/${parsedUser.profileImage}`);
      }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      handleUpdateProfileImage(file);
    }
  };

  const handleUpdateProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    
    setLoading(true);
    try {
      const res = await updateUserApi(user.id, formData);
      const updatedUser = { ...user, profileImage: res.data.user.profileImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile picture updated! ✨");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
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
      toast.success("Identity updated! 👤");
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
      toast.success("Security reinforced! 🔐");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const xpToNextLevel = user.level * 1000;
  const xpProgress = (user.xp / xpToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 pt-28 pb-24 px-6 relative overflow-hidden">
      {/* Subtle Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-[100px] opacity-50" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Refined Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fadeIn">
          <div>
            <button
              onClick={() => navigate("/")}
              className="group flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors mb-4"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
              Back to Hub
            </button>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
              Account <span className="text-slate-300">Settings</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white border border-slate-200/60 p-4 rounded-3xl shadow-sm">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
              <p className="text-xl font-black text-slate-900">#4,201</p>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Member Since</p>
              <p className="text-sm font-black text-slate-900">MAR '26</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: THE PROFILE CARD */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 text-center shadow-xl shadow-slate-200/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-slate-900" />
              
              {/* Avatar Section */}
              <div className="relative pt-12 flex justify-center">
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-32 h-32 relative cursor-pointer group/avatar z-20"
                >
                  <div className="w-full h-full bg-white rounded-full p-1.5 shadow-xl border border-slate-100">
                    <div className="w-full h-full bg-slate-50 rounded-full overflow-hidden relative">
                      {previewImage ? (
                        <img src={previewImage} alt="Profile" className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-black text-slate-200 uppercase">
                          {user.username?.charAt(0)}
                        </div>
                      )}
                      
                      {/* Upload Overlay */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                      </div>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="mt-8 pb-2">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{user.username}</h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">{user.email}</p>
              </div>

              {/* Level System */}
              <div className="mt-8 bg-slate-50/50 p-6 rounded-3xl border border-slate-100 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level Progression</span>
                  <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">LVL {user.level}</span>
                </div>
                
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-slate-900 rounded-full transition-all duration-1000"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                
                <div className="flex justify-between mt-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{user.xp} XP Gained</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Next: {xpToNextLevel}</span>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-8 py-4 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all text-[10px] font-black uppercase tracking-widest rounded-2xl active:scale-95"
              >
                Terminate Session
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: THE FORMS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Neural Identity Form */}
            <div className="bg-white border border-slate-200/60 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/30 relative overflow-hidden">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-slate-900/10">
                  ID
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Identity Profile</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Manage your public signature</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Display Username</label>
                  <input 
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2 opacity-60">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Neural Address (Protected)</label>
                  <input 
                    type="text"
                    value={user.email}
                    disabled
                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 cursor-not-allowed font-bold text-slate-400"
                  />
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] text-slate-400 font-bold max-w-xs uppercase tracking-widest leading-relaxed">System updates propagate instantly across all sectors.</p>
                <button 
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Syncing..." : "Save Identity"}
                </button>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white border border-slate-200/60 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/30 relative overflow-hidden">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl">
                  SE
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Security Access</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Update core authorization protocol</p>
                </div>
              </div>

              <div className="max-w-md">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">New Security Key</label>
                  <input 
                    type="password"
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-bold text-slate-900"
                  />
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-slate-50 text-right">
                <button 
                  onClick={handleUpdatePassword}
                  disabled={loading}
                  className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {loading ? "UPDATING..." : "Apply Security Key"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom Styles for this page */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out both;
        }
      `}} />
    </div>
  );
};

export default Profile;
