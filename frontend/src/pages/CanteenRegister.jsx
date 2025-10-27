import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./canteen.css";

export default function CanteenRegister() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim inputs
    const trimmedId = id.trim();
    const trimmedPassword = password.trim();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedLocation = location.trim();

    // Validate required fields
    if (
      !trimmedId ||
      !trimmedPassword ||
      !trimmedEmail ||
      !trimmedName ||
      !trimmedAddress ||
      !trimmedLocation
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Validate password length
    if (trimmedPassword.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const { data } = await api.post("/auth/canteen-register", {
        id: trimmedId,
        password: trimmedPassword,
        email: trimmedEmail,
        name: trimmedName,
        address: trimmedAddress,
        location: trimmedLocation,
      });

      toast.success(data.message);
      setTimeout(() => navigate("/login-canteen"), 1500); // navigate after toast
    } catch (err) {
      toast.error(err.response?.data?.message || "Error registering canteen");
      console.error(err);
    }
  };

  return (
    <div className="canteen-login bg-white min-h-screen flex items-center justify-center px-4">
      <div className="glass-effect p-8 sm:p-10 rounded-3xl max-w-md w-full shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#4f7942] mb-2">
          🏪 Canteen Registration
        </h2>
        <p className="text-gray-600 mb-6">
          Fill in your details to create an account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Canteen Name"
            className="login-input"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="login-input"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="login-input"
          />

          <button type="submit" className="login-btn">
            📨 Register Canteen
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-2 text-center">
          <button
            onClick={() => navigate("/login-canteen")}
            className="text-gray-900 underline hover:text-green-600"
          >
            ⬅ Back to Login
          </button>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
