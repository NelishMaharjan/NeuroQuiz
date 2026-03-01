import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getQuestionByIdApi, updateQuestionApi } from "../services/api";
import Navbar from "../components/Navbar";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-6"></div>
        <div className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase">
          Retrieving Data
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-32 pb-24 px-6">
        
        {/* Header / Back */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate("/admin/questions")}
            className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Revision Suite</p>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Modify Challenge</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900/5" />
            
            <div className="p-10 space-y-8">
              
              {/* Question Textarea */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Challenge Content
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="w-full p-6 bg-slate-50/50 border border-slate-200 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900 min-h-[160px] resize-none"
                  required
                />
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["A", "B", "C", "D"].map((opt) => (
                  <div key={opt} className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                      Option {opt}
                    </label>
                    <input
                      type="text"
                      name={`option${opt}`}
                      value={formData[`option${opt}`]}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Selection Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Definitive Answer
                  </label>
                  <div className="relative">
                    <select
                      name="correctAnswer"
                      value={formData.correctAnswer}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select Target</option>
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Thematic Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-bold text-slate-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-slate-50/50 px-10 py-8 flex items-center justify-end gap-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate("/admin/questions")}
                className="px-6 py-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  "Update Challenge"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;