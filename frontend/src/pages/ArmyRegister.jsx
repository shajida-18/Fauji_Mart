import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ArmyRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    card_number: "",
    pin: "",
    name: "",
    location: "",
    email: "",
    category: "", // new field
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { card_number, pin, name, location, category } = form;

    if (!card_number || !pin || !name || !location || !category) {
      toast.error("Please fill all required fields");
      return;
    }
    if (card_number.length !== 16) {
      toast.error("CSD Card number must be 16 digits");
      return;
    }
    if (pin.length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }

    try {
      const { data } = await api.post("/auth/army-register", form);
      toast.success(data.message);
      setTimeout(() => navigate("/login-army"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="army-login-container bg-white min-h-screen flex items-center justify-center px-4">
      <div className="glass-effect p-8 sm:p-10 rounded-3xl max-w-md w-full shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#4f7942] mb-2">
          🎖️ Army Personnel Registration
        </h2>
        <p className="text-gray-600 mb-6">Create your FaujiMart army account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="login-input"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="login-input"
          />
          {/* New Category Field */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="login-input"
            required
          >
            <option value="">Select Rank/Category</option>
            <option value="Major">Major</option>
            <option value="Captain">Captain</option>
            <option value="Lieutenant">Lieutenant</option>
            <option value="Colonel">Colonel</option>
            <option value="Other">Other</option>
          </select>
          <input
            name="card_number"
            value={form.card_number}
            onChange={handleChange}
            placeholder="16-digit CSD Card Number"
            className="login-input"
            required
          />
          <input
            name="pin"
            type="password"
            value={form.pin}
            onChange={handleChange}
            placeholder="4-digit PIN"
            className="login-input"
            required
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location / Base"
            className="login-input"
            required
          />

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login-army" className="text-[#4f7942] underline">
            Login here
          </Link>
        </p>
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
