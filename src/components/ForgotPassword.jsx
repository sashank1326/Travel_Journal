import React, { useState } from "react";
import { Link } from "react-router-dom";
import { verifyUser, resetPassword } from "../api/authService"; // Ensure API functions exist

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Verify, Step 2: Reset Password
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await verifyUser(formData.name, formData.email);
      if (response.success) {
        setStep(2); // Move to password reset step
      } else {
        setError("User not found!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await resetPassword(formData.email, formData.password);
      setSuccessMessage("Password reset successful! Please Sign In.");
      setTimeout(() => {
        window.location.href = "/signin"; // Redirect to Sign In page
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center backdrop-blur-lg"
      style={{ backgroundImage: "url('/images/bg2.jpg')" }}>
      
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-3xl font-extrabold flex gap-4 items-center">
          <img src="/images/logo.jpg" alt="Logo" className="w-18 h-18 object-contain rounded-md" />
          Travel Journal
        </Link>
      </div>

      {/* Form Container */}
      <div className="backdrop-blur-3xl p-8 rounded-lg shadow-black shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>

        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {step === 1 ? (
          // Step 1: User Verification Form
          <form onSubmit={handleVerifyUser} className="space-y-4">
            <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} required />

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" disabled={loading}>
              {loading ? "⏳ Verifying..." : "Next"}
            </button>
          </form>
        ) : (
          // Step 2: Password Reset Form
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="New Password" className="w-full p-2 border rounded"
                value={formData.password} onChange={handleChange} required />
              <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" disabled={loading}>
              {loading ? "⏳ Resetting..." : "Submit"}
            </button>
          </form>
        )}

        <p className="text-center mt-4 text-grey-400">
          <Link to="/signin" className="text-white-500 font-bold hover:underline">Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
