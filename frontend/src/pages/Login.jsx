import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react"; // Install lucide-react
import toast from "react-hot-toast";
import { loginUserApi } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await loginUserApi(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid email or password";
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      
      <div className="relative w-full max-w-[440px]">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
          
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
              <Lock className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              NeuroQuiz
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Secure access to your dashboard
            </p>
          </div>

          {serverError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 animate-shake">
              <p className="text-red-600 text-sm text-center font-semibold">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border bg-white/50
                    ${errors.email ? "border-red-400 ring-2 ring-red-50" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
                    outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-400`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-semibold ml-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border bg-white/50
                    ${errors.password ? "border-red-400 ring-2 ring-red-50" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
                    outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-400`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-semibold ml-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl text-white font-extrabold
                       bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200
                       active:scale-[0.98] transition-all duration-300
                       flex justify-center items-center disabled:opacity-70 disabled:hover:shadow-none"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In to NeuroQuiz"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500 text-center font-medium">
              New to the platform?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;