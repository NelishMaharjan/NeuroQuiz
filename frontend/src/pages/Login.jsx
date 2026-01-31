import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
setErrors({ ...errors, [e.target.name]: "" });
setServerError("");
};

const validate = () => {
const newErrors = {};
if (!formData.email) newErrors.email = "Email is required";
else if (!/\S+@\S+\.\S+/.test(formData.email))
newErrors.email = "Enter a valid email";

if (!formData.password) newErrors.password = "Password is required";
else if (formData.password.length < 6)
newErrors.password = "Password must be at least 6 characters";

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
toast.success(res.data.message || "Login successful 🎉");
navigate("/");
} catch (error) {
const msg =
error.response?.data?.message || "Login failed. Check your credentials";
setServerError(msg);
toast.error(msg);
} finally {
setLoading(false);
}
};

return (
<div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
{/* Main Card */}
<div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 w-full max-w-[400px] border border-slate-100 transition-all">
<div className="mb-8 text-center">
<h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
Welcome Back
</h2>
<p className="text-slate-500 mt-2 font-medium">
Enter your details to access NeuroQuiz
</p>
</div>

{serverError && (
<div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100">
<p className="text-red-600 text-xs text-center font-medium">{serverError}</p>
</div>
)}

<form onSubmit={handleSubmit} className="space-y-5">
{/* Email Field */}
<div>
<label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
Email Address
</label>
<input
type="email"
name="email"
value={formData.email}
onChange={handleChange}
placeholder="name@company.com"
className={`w-full px-4 py-3 rounded-xl border text-slate-800 bg-slate-50/50
${errors.email ? "border-red-400 ring-1 ring-red-400" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
outline-none transition-all duration-200`}
/>
{errors.email && (
<p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>
)}
</div>

{/* Password Field */}
<div>
<label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
Password
</label>
<div className="relative">
<input
type={showPassword ? "text" : "password"}
name="password"
value={formData.password}
onChange={handleChange}
placeholder="••••••••"
className={`w-full px-4 py-3 rounded-xl border text-slate-800 bg-slate-50/50
${errors.password ? "border-red-400 ring-1 ring-red-400" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
outline-none transition-all duration-200`}
/>
<button
type="button"
className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? "Hide" : "Show"}
</button>
</div>
{errors.password && (
<p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>
)}
</div>

{/* Submit Button */}
<button
type="submit"
disabled={loading}
className="w-full py-3.5 mt-2 rounded-xl text-white font-bold
bg-blue-600 hover:bg-blue-700
shadow-lg shadow-blue-200 active:scale-[0.98]
transition-all duration-200 flex justify-center items-center disabled:opacity-70"
>
{loading ? (
<>
<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
Logging in...
</>
) : (
"Sign In"
)}
</button>
</form>

<div className="mt-8 pt-6 border-t border-slate-100 text-center">
<p className="text-sm text-slate-500">
Don't have an account?{" "}
<button
onClick={() => navigate("/register")}
className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
>
Sign up free
</button>
</p>
</div>
</div>
</div>
);
};
 
export default Login;
