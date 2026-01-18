import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8 text-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username || "Admin"} 👋
        </h1>
        <p className="text-blue-100 mt-1">
          NeuroQuiz Admin Dashboard
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
        {/* Manage Questions */}
        <div
          onClick={() => navigate("/admin/questions")}
          className="bg-white/10 p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition"
        >
          <h2 className="text-xl font-semibold mb-2">🧠 Manage Questions</h2>
          <p className="text-blue-100 text-sm">
            Add, edit, and delete quiz questions
          </p>
        </div>

        {/* Manage Categories (future) */}
        <div
          className="bg-white/10 p-6 rounded-2xl opacity-70 cursor-not-allowed"
        >
          <h2 className="text-xl font-semibold mb-2">📚 Manage Categories</h2>
          <p className="text-blue-100 text-sm">
            Coming soon
          </p>
        </div>

        {/* View Progress (future) */}
        <div
          className="bg-white/10 p-6 rounded-2xl opacity-70 cursor-not-allowed"
        >
          <h2 className="text-xl font-semibold mb-2">📊 View Progress</h2>
          <p className="text-blue-100 text-sm">
            User quiz statistics
          </p>
        </div>

        {/* Logout */}
        <div
          onClick={logout}
          className="bg-red-500/90 p-6 rounded-2xl cursor-pointer hover:bg-red-600 transition"
        >
          <h2 className="text-xl font-semibold mb-2">🚪 Logout</h2>
          <p className="text-red-100 text-sm">
            End admin session
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
