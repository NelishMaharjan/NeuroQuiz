import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getSystemStatsApi } from "../services/api";
import Navbar from "../components/Navbar";

const GlobalAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getSystemStatsApi();
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (error) {
        toast.error("Failed to load global analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-6"></div>
        <div className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase">Aggregating Data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 pb-24 px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Management</p>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Global Analytics</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Users", value: stats?.totalUsers, icon: "👥", color: "text-blue-600" },
            { label: "Active Units", value: stats?.activeUsers, icon: "●", color: "text-emerald-500" },
            { label: "Sessions Done", value: stats?.totalResults, icon: "📊", color: "text-purple-600" },
            { label: "Global Accuracy", value: `${stats?.globalPrecision}%`, icon: "🎯", color: "text-orange-500" }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-200/60 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/20 group hover:border-slate-900 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                <span className={`text-lg ${item.color}`}>{item.icon}</span>
              </div>
              <p className="text-4xl font-black text-slate-900 italic tracking-tighter">{item.value}</p>
            </div>
          ))}
        </div>

        {/* System Health Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8">System Health Analysis</h2>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Server Synchronization Load</p>
                      <p className="text-sm font-bold text-slate-900">Optimal Response Time</p>
                    </div>
                    <span className="text-sm font-black text-slate-900">{stats?.load}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 transition-all duration-1000" style={{ width: `${stats?.load}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Population</p>
                      <p className="text-sm font-bold text-slate-900">Total Approved Challenges</p>
                    </div>
                    <span className="text-sm font-black text-slate-900">{stats?.totalQuestions}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(stats?.totalQuestions / 100) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 text-white rounded-[3rem] p-10 shadow-xl shadow-slate-900/20 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Neural Insights</p>
              <h3 className="text-2xl font-black italic italic leading-tight uppercase tracking-tighter">
                Global user engagement is currently <span className="text-emerald-400">increasing</span> by 12% week-over-week.
              </h3>
            </div>
            <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-white/10">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAnalytics;
