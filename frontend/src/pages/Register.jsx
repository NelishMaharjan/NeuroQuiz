import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserApi } from "../services/api";
import InputField from "../components/InputField";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await createUserApi(formData);
      toast.success(res.data.message || "Registration successful 🎉");
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed. Try again.";
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 font-sans pt-16">
      <div className="w-full max-w-[440px] animate-fadeIn">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-200/50">
          <div className="mb-10 text-center">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-900/20">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="3">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              Create account
            </h2>
            <p className="text-slate-400 mt-3 text-sm font-medium">
              Join NeuroQuiz to start your journey
            </p>
          </div>

          {serverError && (
            <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100/50">
              <p className="text-red-600 text-[11px] text-center font-bold uppercase tracking-wider">
                {serverError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              error={errors.username}
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              error={errors.email}
            />

            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.confirmPassword}
              showPasswordToggle
              onTogglePassword={() => setShowConfirm(!showConfirm)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 rounded-2xl text-white font-bold
                         bg-slate-900 hover:bg-slate-800
                         shadow-xl shadow-slate-900/10 active:scale-[0.98]
                         transition-all duration-200 flex justify-center items-center disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-xs uppercase tracking-widest">Creating...</span>
                </div>
              ) : (
                <span className="text-xs uppercase tracking-widest">Sign Up</span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-slate-900 hover:underline transition-all underline-offset-4"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;