import { useState, useEffect } from "react";
import { getUserResultsApi } from "../services/api";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  useEffect(() => {
    const fetchResults = async () => {
      if (user?.id) {
        try {
          const res = await getUserResultsApi(user.id);
          setResults(res.data.results || []);
        } catch (error) {
          console.error("Failed to fetch results", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchResults();
  }, [user?.id]);

  const averageScore = results.length > 0 
    ? Math.round((results.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions), 0) / results.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-900 selection:text-white relative overflow-hidden">
      {/* Subtle Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-[100px] opacity-50" />
      
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 pb-24 px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-fadeIn">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-900/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Personal Analytics</span>
            </div>
            
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Learning <br />
              <span className="text-slate-300">Progression</span>
            </h1>
          </div>

          <div className="bg-white border border-slate-200/60 py-4 px-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                <p className="text-sm font-black text-slate-900 tracking-tight uppercase">{user?.username}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 group hover:border-slate-900 transition-all duration-500">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Neural Efficiency</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900">{averageScore}%</span>
              <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">Average</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 group hover:border-slate-900 transition-all duration-500">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Modules Completed</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900">{results.length}</span>
              <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">Sessions</span>
            </div>
          </div>
          
          <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-slate-900/10 text-white relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Neural Growth</p>
            <h3 className="text-xl font-bold leading-tight">
              Continuous learning strengthens synaptic connections.
            </h3>
          </div>
        </div>

        {/* History List */}
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-2xl shadow-slate-200/30 overflow-hidden">
          <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Recent Sessions</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Latest Activity Log</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Module Category</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Precision Score</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Completion Date</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.map((res) => {
                  const perc = Math.round((res.score / res.totalQuestions) * 100);
                  return (
                    <tr key={res.id} className="group hover:bg-slate-50/30 transition-colors">
                      <td className="px-10 py-6">
                        <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{res.category}</span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-slate-900">{res.score}/{res.totalQuestions}</span>
                          <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-slate-900" style={{ width: `${perc}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{new Date(res.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                          perc >= 80 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          perc >= 50 ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {perc >= 80 ? 'Exceptional' : perc >= 50 ? 'Proficient' : 'Developing'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {results.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-10 py-20 text-center">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">No Neural Data Detected</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out both;
        }
      `}} />
    </div>
  );
};

export default UserDashboard;
