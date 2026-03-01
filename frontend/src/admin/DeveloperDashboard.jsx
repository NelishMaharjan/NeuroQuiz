import { useState, useEffect } from "react";
import { getActiveUsersApi, deleteUserApi } from "../services/api";
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
      // toast.error("Failed to fetch live monitoring data");
    } finally {
      setLoading(false);
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
    // Poll every 10 seconds for "live" monitoring
    const interval = setInterval(fetchActiveUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 pb-24 px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-indigo-500">System Monitoring</span>
            </div>
            
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Developer <br />
              <span className="text-slate-300">Live Console</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white border border-slate-200/60 py-4 px-6 rounded-[2rem] shadow-sm">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                <p className="text-sm font-black text-slate-900 tracking-tight">System Operational</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Active Sessions</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900">{onlineCount}</span>
              <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest">Online Now</span>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase mt-4">Total Registered: {activeUsers.length}</p>
          </div>
          
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/10 text-white md:col-span-2 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Monitoring Intelligence</p>
            <h3 className="text-xl font-bold leading-relaxed max-w-md">
              Tracking real-time user engagement and system throughput.
            </h3>
          </div>
        </div>

        {/* Live User List */}
        <div className="bg-white border border-slate-200/60 rounded-[3rem] shadow-2xl shadow-slate-200/40 overflow-hidden">
          <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Active Users</h2>
            <button 
              onClick={fetchActiveUsers}
              className="px-4 py-2 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all"
            >
              Refresh Now
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Authority Role</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Movement</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 font-black text-xs uppercase">
                          {user.username.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{user.username}</p>
                          <p className="text-[11px] font-medium text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        user.role === 'developer' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                        user.role === 'admin' ? 'bg-slate-900 text-white border-slate-900' : 
                        'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-xs font-bold text-slate-600">
                        {new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </p>
                      <p className="text-[10px] font-medium text-slate-400 mt-1">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-4">
                        {user.isOnline ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            Online
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100">
                            Offline
                          </div>
                        )}
                        
                        {currentUser?.id !== user.id ? (
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-300 hover:bg-red-500 hover:text-white transition-all border border-transparent"
                            title="Delete User"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-400" title="You (Developer)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {activeUsers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-10 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No online users detected</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;