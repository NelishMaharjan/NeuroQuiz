import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createQuestionApi } from "../services/api";

const AddQuestion = () => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.question ||
      !formData.optionA ||
      !formData.optionB ||
      !formData.optionC ||
      !formData.optionD ||
      !formData.correctAnswer
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await createQuestionApi(formData);
      toast.success("Question added successfully 🎉");
      navigate("/admin/questions");
    } catch (error) {
      toast.error("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">
          ➕ Add New Question
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Question */}
          <textarea
            name="question"
            placeholder="Enter question"
            value={formData.question}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            rows="3"
          />

          {/* Options */}
          <input
            type="text"
            name="optionA"
            placeholder="Option A"
            value={formData.optionA}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="optionB"
            placeholder="Option B"
            value={formData.optionB}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="optionC"
            placeholder="Option C"
            value={formData.optionC}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="optionD"
            placeholder="Option D"
            value={formData.optionD}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* Correct Answer */}
          <select
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Correct Answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

          {/* Category (temporary text input) */}
          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Java, Math)"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/questions")}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
