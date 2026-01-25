import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllQuestionsApi, deleteQuestionApi } from "../services/api";
// import Navbar from "../components/Navbar";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "questionText", direction: "asc" });
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const res = await getAllQuestionsApi();
      setQuestions(res.data || []);
    } catch (error) {
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const processedQuestions = useMemo(() => {
    let filtered = questions.filter((q) => {
      const qText = (q.questionText || q.question || "").toLowerCase();
      const cat = (typeof q.category === "object" ? q.category?.name : q.category || "").toLowerCase();
      return qText.includes(searchTerm.toLowerCase()) || cat.includes(searchTerm.toLowerCase());
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key] || "";
        let bVal = b[sortConfig.key] || "";

        if (sortConfig.key === "category" && typeof aVal === "object") aVal = aVal.name || "";
        if (sortConfig.key === "category" && typeof bVal === "object") bVal = bVal.name || "";

        if (aVal.toString().toLowerCase() < bVal.toString().toLowerCase())
          return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal.toString().toLowerCase() > bVal.toString().toLowerCase())
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [questions, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await deleteQuestionApi(id);
      toast.success("Question deleted successfully");
      fetchQuestions();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4"></div>
        <p className="text-gray-500 font-medium">Fetching your questions...</p>
      </div>
    );
  }

  return (
    <>
      {/* 🔥 NAVBAR GOES HERE */}
      {/* <Navbar /> */}

      <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans">
        <div className="max-w-6xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="group mb-6 flex items-center text-sm font-semibold text-gray-500 hover:text-slate-900 transition-colors"
          >
            ← Back to Dashboard
          </button>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Question Bank
              </h1>
              <p className="text-slate-500 mt-1">
                Manage and organize your quiz content.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/questions/add")}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              + Add New Question
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by question or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6 w-full max-w-md px-5 py-3 bg-white border border-slate-200 rounded-xl"
          />

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    onClick={() => requestSort("questionText")}
                    className="p-4 text-xs font-bold uppercase cursor-pointer"
                  >
                    Question
                  </th>
                  <th
                    onClick={() => requestSort("category")}
                    className="p-4 text-xs font-bold uppercase cursor-pointer"
                  >
                    Category
                  </th>
                  <th className="p-4 text-xs font-bold uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {processedQuestions.map((q) => (
                  <tr key={q.id || q._id} className="border-t">
                    <td className="p-4">{q.questionText || q.question}</td>
                    <td className="p-4">{typeof q.category === "object" ? q.category?.name : q.category}</td>
                    <td className="p-4 text-right space-x-3">
                      <button
                        onClick={() => navigate(`/admin/questions/edit/${q.id || q._id}`)}
                        className="font-bold text-slate-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(q.id || q._id)}
                        className="font-bold text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 text-center text-xs font-bold text-slate-400">
              Total Questions: {processedQuestions.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionList;
