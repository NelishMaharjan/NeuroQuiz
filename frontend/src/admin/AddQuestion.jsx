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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      category,
    } = formData;

    if (
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctAnswer
    ) {
      toast.error("Fill all required fields");
      return;
    }

    const payload = {
      questionText: question,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer:
        correctAnswer === "A"
          ? optionA
          : correctAnswer === "B"
          ? optionB
          : correctAnswer === "C"
          ? optionC
          : optionD,
      category,
    };

    setLoading(true);
    try {
      await createQuestionApi(payload);
      toast.success("Question added successfully 🎉");
      navigate("/admin/questions");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Question
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Add a new challenge to the quiz. Ensure all options are clear.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-6 space-y-5">
              
              {/* Question Textarea */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question Content
                </label>
                <textarea
                  name="question"
                  placeholder="What is the main purpose of...?"
                  value={formData.question}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[120px] outline-none"
                />
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["A", "B", "C", "D"].map((opt) => (
                  <div key={opt}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
                      Option {opt}
                    </label>
                    <input
                      type="text"
                      name={`option${opt}`}
                      placeholder={`Enter option ${opt}`}
                      value={formData[`option${opt}`]}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                    />
                  </div>
                ))}
              </div>

              {/* Bottom Row: Correct Answer & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correct Answer
                  </label>
                  <select
                    name="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">Select choice</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. React"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Form Footer / Actions */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/admin/questions")}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-200"
              >
                Discard
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition duration-200"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Publish Question"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;