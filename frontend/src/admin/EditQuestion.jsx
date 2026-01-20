import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getQuestionByIdApi,
  updateQuestionApi,
} from "../services/api";

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch existing question
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getQuestionByIdApi(id);
        setFormData(res.data.question);
      } catch (error) {
        toast.error("Failed to load question");
      }
    };

    fetchQuestion();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateQuestionApi(id, formData);
      toast.success("Question updated successfully ✅");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to update question ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[500px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Question ✏️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Question"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
            rows={3}
            required
          />

          <input
            type="text"
            name="optionA"
            value={formData.optionA}
            onChange={handleChange}
            placeholder="Option A"
            className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="optionB"
            value={formData.optionB}
            onChange={handleChange}
            placeholder="Option B"
            className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="optionC"
            value={formData.optionC}
            onChange={handleChange}
            placeholder="Option C"
            className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="optionD"
            value={formData.optionD}
            onChange={handleChange}
            placeholder="Option D"
            className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            required
          />

          <select
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Correct Answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition"
          >
            {loading ? "Updating..." : "Update Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
