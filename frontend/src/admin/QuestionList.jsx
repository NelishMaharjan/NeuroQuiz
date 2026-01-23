import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllQuestionsApi, deleteQuestionApi } from "../services/api";

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

  // Sorting and Filtering Logic
  const processedQuestions = useMemo(() => {
    let filtered = questions.filter((q) => {
      const qText = (q.questionText || q.question || "").toLowerCase();
      const cat = (typeof q.category === 'object' ? q.category?.name : q.category || "").toLowerCase();
      return qText.includes(searchTerm.toLowerCase()) || cat.includes(searchTerm.toLowerCase());
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key] || "";
        let bVal = b[sortConfig.key] || "";
        if (sortConfig.key === "category" && typeof aVal === "object") aVal = aVal.name || "";
        if (sortConfig.key === "category" && typeof bVal === "object") bVal = bVal.name || "";

        if (aVal.toString().toLowerCase() < bVal.toString().toLowerCase()) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal.toString().toLowerCase() > bVal.toString().toLowerCase()) return sortConfig.direction === "asc" ? 1 : -1;
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
    } catch (error) {
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
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="group mb-6 flex items-center text-sm font-semibold text-gray-500 hover:text-slate-900 transition-colors"
        >
          <svg className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Question Bank</h1>
            <p className="text-slate-500 mt-1">Manage and organize your quiz content.</p>
          </div>
          <button
            onClick={() => navigate("/admin/questions/add")}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            + Add New Question
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search by question or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-5 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-900 transition-all text-sm"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th 
                    onClick={() => requestSort("questionText")}
                    className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-900"
                  >
                    Question Details {sortConfig.key === "questionText" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th 
                    onClick={() => requestSort("category")}
                    className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-900 w-40"
                  >
                    Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-48">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {processedQuestions.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-20">
                      <p className="text-slate-400 font-medium">No questions matching your search.</p>
                    </td>
                  </tr>
                ) : (
                  processedQuestions.map((q) => (
                    <tr key={q.id || q._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="text-slate-800 font-medium line-clamp-2 max-w-lg">
                          {q.questionText || q.question || "Untitled Question"}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          {typeof q.category === 'object' ? q.category?.name : q.category || "General"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/questions/edit/${q.id || q._id}`)}
                            className="px-4 py-1.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(q.id || q._id)}
                            className="px-4 py-1.5 text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Total Questions: {processedQuestions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;