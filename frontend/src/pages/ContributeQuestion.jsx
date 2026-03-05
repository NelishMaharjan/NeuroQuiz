import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { submitQuestionApi } from "../services/api";

const ContributeQuestion = () => {
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    category: "",
    difficulty: "easy",
  });

  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { questionText, correctAnswer, category, options, difficulty } = formData;

    if (!questionText.trim() || !correctAnswer.trim() || !category.trim()) {
      toast.error("Please fill in the Question, Category, and Correct Answer.");
      return;
    }

    if (options.some(opt => !opt.trim())) {
      toast.error("All 4 options must be filled out.");
      return;
    }

    // Ensure correct answer is one of the options (case-sensitive check)
    const trimmedOptions = options.map(opt => opt.trim());
    if (!trimmedOptions.includes(correctAnswer.trim())) {
      toast.error("The Correct Answer must match one of the choices exactly.");
      return;
    }

    setLoading(true);
    try {
      await submitQuestionApi({
        questionText: questionText.trim(),
        category: category.trim(),
        correctAnswer: correctAnswer.trim(),
        options: trimmedOptions,
        difficulty,
        submittedBy: user?.id
      });
      toast.success("Proposal transmitted! +500 XP pending review. ✨");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to transmit proposal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 mb-8"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </button>

        <div className="bg-white border border-slate-200/60 p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/30">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center font-black text-3xl shadow-xl shadow-slate-900/20">
              +
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Contribute <span className="text-slate-300">Knowledge</span></h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Expand the neural network</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Question Text</label>
              <textarea 
                value={formData.questionText}
                onChange={(e) => setFormData({...formData, questionText: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-5 px-8 focus:outline-none focus:border-slate-900 transition-all font-bold text-slate-900 text-lg"
                placeholder="What is the question?"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Category</label>
                <input 
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-slate-900 transition-all font-bold text-slate-900"
                  placeholder="e.g. Science"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Difficulty</label>
                <select 
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-slate-900 transition-all font-bold text-slate-900 appearance-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Options</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.options.map((opt, i) => (
                  <input 
                    key={i}
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-slate-900 transition-all font-bold text-slate-900"
                    placeholder={`Option ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 text-emerald-600">Correct Answer</label>
              <div className="relative">
                <select 
                  value={formData.correctAnswer}
                  onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})}
                  className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-emerald-500 transition-all font-bold text-emerald-900 appearance-none cursor-pointer"
                >
                  <option value="">Select the correct option</option>
                  {formData.options.map((opt, i) => (
                    opt.trim() && <option key={i} value={opt.trim()}>{opt.trim()}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"></path></svg>
                </div>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px]">Questions are verified by admins before going live.</p>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="px-12 py-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Transmitting..." : "Submit Proposal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributeQuestion;
