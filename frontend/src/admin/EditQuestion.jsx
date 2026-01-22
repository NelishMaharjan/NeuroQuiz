import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getQuestionByIdApi, updateQuestionApi } from "../services/api";

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
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getQuestionByIdApi(id);
        const q = res.data.question || res.data;

        setFormData({
          question: q.questionText || q.question || "",
          optionA: q.options?.[0] || q.optionA || "",
          optionB: q.options?.[1] || q.optionB || "",
          optionC: q.options?.[2] || q.optionC || "",
          optionD: q.options?.[3] || q.optionD || "",
          correctAnswer: q.correctAnswer === (q.options?.[0] || q.optionA) ? "A" :
                         q.correctAnswer === (q.options?.[1] || q.optionB) ? "B" :
                         q.correctAnswer === (q.options?.[2] || q.optionC) ? "C" : "D",
          category: typeof q.category === 'object' ? q.category?.name : q.category || "",
        });
      } catch (error) {
        toast.error("Failed to load question data");
      } finally {
        setFetching(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      questionText: formData.question,
      options: [formData.optionA, formData.optionB, formData.optionC, formData.optionD],
      correctAnswer: 
        formData.correctAnswer === "A" ? formData.optionA :
        formData.correctAnswer === "B" ? formData.optionB :
        formData.correctAnswer === "C" ? formData.optionC : formData.optionD,
      category: formData.category,
    };

    try {
      await updateQuestionApi(id, payload);
      toast.success("Question updated successfully 🎉");
      navigate("/admin/questions"); 
    } catch (error) {
      toast.error("Failed to update question ❌");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/questions")}
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
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Edit Question</h1>
          <p className="text-gray-500 mt-2">Modify the details of this quiz question below.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Question Content</label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["A", "B", "C", "D"].map((opt) => (
                <div key={opt}>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Option {opt}</label>
                  <input
                    type="text"
                    name={`option${opt}`}
                    value={formData[`option${opt}`]}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Correct Answer</label>
                <select
                  name="correctAnswer"
                  value={formData.correctAnswer}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                  required
                >
                  <option value="">Select choice</option>
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/questions")}
              className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95 disabled:opacity-50 transition"
            >
              {loading ? "Saving Changes..." : "Update Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;