import { useState, useEffect } from "react";
import { getActiveUsersApi, deleteUserApi, changeUserRoleApi } from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const DeveloperDashboard = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveUsers = async () => {
    try {
      const res = await getActiveUsersApi();
      setActiveUsers(res.data.users || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await changeUserRoleApi(id, newRole, currentUser?.id);
      toast.success(`User promoted to ${newRole}`);
      fetchActiveUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("TERMINATE USER? This cannot be undone.")) return;
    try {
      await deleteUserApi(id);
      toast.success("Neural link severed (User Deleted)");
      fetchActiveUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const onlineCount = activeUsers.filter(u => u.isOnline).length;
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-6"></div>
        <div className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase">Booting Console</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 pb-24 px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fadeIn">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Registry Control Console</span>
            </div>
            
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight italic">
              User <br />
              <span className="text-slate-300">Registry Hub</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white border border-slate-200/60 py-4 px-6 rounded-[2rem] shadow-sm">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                <p className="text-sm font-black text-slate-900 tracking-tight italic">Registry Synchronized</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Monitoring</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900">{onlineCount}</span>
              <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest italic animate-pulse">Units Online</span>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase mt-4 tracking-widest">Total Registry: {activeUsers.length}</p>
          </div>
          
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 text-white md:col-span-2 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Authority Protocol</p>
            <h3 className="text-2xl font-black leading-relaxed max-w-md italic tracking-tight">
              Manage system permissions, promote operators, or terminate unverified units.
            </h3>
          </div>
        </div>

        {/* User List */}
        <div className="bg-white border border-slate-200/60 rounded-[3rem] shadow-2xl shadow-slate-200/40 overflow-hidden relative">
          <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase italic">Identification Table</h2>
            <button 
              onClick={fetchActiveUsers}
              className="px-4 py-2 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
            >
              Sync Registry
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identified Unit</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Protocol</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Activity</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 font-black text-xs uppercase border border-slate-200 shadow-sm">
                          {user.username.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{user.username}</p>
                          <p className="text-[10px] font-bold text-slate-400 lowercase italic">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      {currentUser?.role === 'developer' ? (
                        <select 
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-slate-900 transition-all cursor-pointer shadow-sm"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="developer">Developer</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          user.role === 'developer' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                          user.role === 'admin' ? 'bg-slate-900 text-white border-slate-900' : 
                          'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
                        {new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-4">
                        {user.isOnline ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                            Online
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100">
                            Offline
                          </div>
                        )}
                        
                        {currentUser?.id !== user.id && currentUser?.role === 'developer' && (
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-300 hover:bg-red-500 hover:text-white transition-all border border-transparent shadow-sm"
                            title="Terminate Unit"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;