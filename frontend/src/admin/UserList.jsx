import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllUsersApi, deleteUserApi, changeUserRoleApi } from "../services/api";
import Navbar from "../components/Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersApi();
      setUsers(res.data || []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await changeUserRoleApi(id, newRole);
      toast.success(`User promoted to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will permanently delete the user account.")) return;
    try {
      await deleteUserApi(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-6"></div>
        <div className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase">Initializing Registry</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 pb-24 px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Management</p>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase italic">User Registry</h1>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-2xl shadow-slate-200/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identified Unit</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Address</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Level</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs uppercase">
                          {user.username?.charAt(0)}
                        </div>
                        <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{user.username}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-slate-400 lowercase">{user.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-slate-900 transition-all cursor-pointer"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="developer">Developer</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Delete User"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
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

export default UserList;
