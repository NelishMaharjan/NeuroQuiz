import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserApi } from "../services/api";

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
      const msg =
        error.response?.data?.message || "Registration failed. Try again.";
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
  <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[400px] animate-fadeIn">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
      Create Account ✨
    </h2>
    <p className="text-center text-gray-500 mb-4">
      Register to start your NeuroQuiz journey
    </p>

    {/* Inline server error */}
    {serverError && (
      <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Username */}
      <div>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className={`w-full px-4 py-2 rounded-lg border text-gray-800 
            ${errors.username ? "border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`w-full px-4 py-2 rounded-lg border text-gray-800 
            ${errors.email ? "border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className={`w-full px-4 py-2 rounded-lg border text-gray-800 
            ${errors.password ? "border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className={`w-full px-4 py-2 rounded-lg border text-gray-800 
            ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? "Hide" : "Show"}
        </span>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg text-white font-semibold
                   bg-gradient-to-r from-blue-600 to-indigo-600
                   hover:scale-[1.02] active:scale-[0.98]
                   transition-transform duration-200 flex justify-center items-center"
      >
        {loading ? (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
        ) : null}
        {loading ? "Registering..." : "Register"}
      </button>
    </form>

    <p className="text-center text-sm text-gray-500 mt-6">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-blue-600 font-medium cursor-pointer hover:underline"
      >
        Login
      </span>
    </p>
  </div>
</div>
  );
};

export default Register;
