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
      setQuestions(res.data);
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
    if (!window.confirm("Delete this question?")) return;

    try {
      await deleteQuestionApi(id);
      toast.success("Question deleted");
      fetchQuestions();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🧠 Question Management</h1>

        <button
          onClick={() => navigate("/admin/questions/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Question
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No questions found
                </td>
              </tr>
            ) : (
              questions.map((q) => (
                <tr key={q.id} className="border-t">
                  <td className="p-3">{q.question}</td>
                  <td className="p-3">{q.category?.name || "N/A"}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/questions/edit/${q.id}`)
                      }
                      className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(q.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionList;
