import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import "./canteen.css";

export default function CanteenLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPin, setNewPin] = useState("");
  const [forgotStage, setForgotStage] = useState(0); // 0=login, 1=email, 2=otp
  const navigate = useNavigate();

  // ---------- LOGIN ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    const trimmedId = id.trim();
    const trimmedPassword = password.trim();

    if (!trimmedId || !trimmedPassword) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const { data } = await api.post("/auth/canteen-login", {
        id: trimmedId,
        password: trimmedPassword,
      });
      localStorage.setItem("faujimart_token", data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate(`/canteen-dashboard/${id}`), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid canteen credentials");
    }
  };

  // ---------- FORGOT PIN / OTP ----------
  const handleSendOtp = async () => {
    if (!email) {
      toast.warning("Please enter your registered email");
      return;
    }
    try {
      await api.post("/auth/send-otp", { email });
      toast.success("OTP sent to your email!");
      setForgotStage(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleResetPin = async () => {
    if (!otp || !newPin) {
      toast.warning("Enter all fields");
      return;
    }
    if (newPin.length !== 4) {
      toast.error("New PIN must be 4 digits");
      return;
    }
    try {
      await api.post("/auth/reset-pin", { email, otp, newPin });
      toast.success("PIN reset successful! You can now login.");
      setForgotStage(0);
      setEmail("");
      setOtp("");
      setNewPin("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid OTP or error resetting PIN"
      );
    }
  };

  return (
    <div className="canteen-login bg-white min-h-screen flex items-center justify-center px-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="glass-effect p-8 sm:p-10 rounded-3xl max-w-md w-full shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#4f7942] mb-2">
          🏪 Canteen Login
        </h2>

        {/* ---------- LOGIN STAGE ---------- */}
        {forgotStage === 0 && (
          <>
            <p className="text-gray-600 mb-6">
              Enter your credentials to login
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Canteen ID"
                className="login-input"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="login-input"
              />
              <button type="submit" className="login-btn">
                🔐 Login
              </button>
            </form>

            <button
              onClick={() => setForgotStage(1)}
              className="text-gray-500 underline hover:text-blue-800 mt-3 font-medium"
            >
              Forgot PIN?
            </button>
          </>
        )}

        {/* ---------- ENTER EMAIL STAGE ---------- */}
        {forgotStage === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#4f7942]">Forgot PIN</h3>
            <p className="text-gray-600">
              Enter your registered email to receive an OTP
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="login-input"
              type="email"
            />
            <button onClick={handleSendOtp} className="login-btn">
              📩 Send OTP
            </button>
            <button
              onClick={() => setForgotStage(0)}
              className="text-gray-500 underline hover:text-[#4f7942]"
            >
              ⬅ Back to Login
            </button>
          </div>
        )}

        {/* ---------- OTP + NEW PIN STAGE ---------- */}
        {forgotStage === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#4f7942]">Verify OTP</h3>
            <p className="text-gray-600">
              Enter the OTP sent to your email and set a new PIN
            </p>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="login-input"
            />
            <input
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="Enter new 4-digit PIN"
              type="password"
              className="login-input"
            />
            <button onClick={handleResetPin} className="login-btn">
              ✅ Reset PIN
            </button>
            <button
              onClick={() => setForgotStage(0)}
              className="text-gray-500 underline hover:text-[#4f7942]"
            >
              ⬅ Back to Login
            </button>
          </div>
        )}

        <div className="mt-6 space-y-2">
          <p className="text-gray-600">
            Don’t have an account?
            <button
              onClick={() => navigate("/register-canteen")}
              className="text-[#4f7942] underline hover:text-green-600 font-medium"
            >
              Create Account
            </button>
          </p>
          <br />
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 underline hover:text-[#4f7942]"
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
