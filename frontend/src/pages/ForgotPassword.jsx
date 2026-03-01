import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPasswordApi, resetPasswordApi } from "../services/api";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: Reset
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    setLoading(true);
    try {
      const res = await forgotPasswordApi({ email });
      toast.success(res.data.message || "Recovery code sent!");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to initiate reset");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await resetPasswordApi({
        email,
        token: formData.token,
        newPassword: formData.newPassword,
      });
      toast.success("Password updated successfully 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />

      <div className="flex items-center justify-center pt-32 pb-24 px-4">
        <div className="w-full max-w-[440px] animate-fadeIn">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-200/50">
            
            <div className="mb-10 text-center">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-900/20 text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                {step === 1 ? "Reset Password" : "Secure Account"}
              </h2>
              <p className="text-slate-400 mt-3 text-sm font-medium">
                {step === 1 
                  ? "Enter your email to receive a recovery code" 
                  : "Enter the code and your new password"}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <InputField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-white font-bold bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Request Reset Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-5">
                <InputField
                  label="Reset Code"
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  placeholder="6-digit code"
                />
                <InputField
                  label="New Password"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="••••••••"
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-2 rounded-2xl text-white font-bold bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;