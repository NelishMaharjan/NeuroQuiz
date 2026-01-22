import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllQuestionsApi, deleteQuestionApi } from "../services/api";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Fetching your questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button to Dashboard */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="group mb-6 flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Question Bank
            </h1>
            <p className="text-gray-500 mt-1">Manage and organize your quiz content.</p>
          </div>

          <button
            onClick={() => navigate("/admin/questions/add")}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            <span className="mr-2 text-lg">+</span> Add New Question
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Question Details</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-40">Category</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right w-48">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-20">
                      <p className="text-gray-400 font-medium">No questions found in the database.</p>
                    </td>
                  </tr>
                ) : (
                  questions.map((q) => (
                    <tr key={q.id || q._id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="p-4">
                        <p className="text-gray-800 font-medium line-clamp-2 max-w-lg">
                          {q.questionText || q.question || "Untitled Question"}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {typeof q.category === 'object' ? q.category?.name : q.category || "General"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/questions/edit/${q.id || q._id}`)}
                            className="px-4 py-1.5 text-sm font-semibold text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 border border-amber-200 transition-colors"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(q.id || q._id)}
                            className="px-4 py-1.5 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 border border-red-200 transition-colors"
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
          
          {/* Summary Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
              Total Questions Count: {questions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;