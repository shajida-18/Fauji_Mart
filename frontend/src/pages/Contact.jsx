import React, { useState } from "react";
import HomeNav from "./HomeNav";
import "./Contact.css"; // Styles for glass-effect, fade-in, gradients
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;

    if (!name || !email || !subject || !message) {
      toast.error("Please fill all fields"); // toast instead of alert
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Message sent successfully!"); // toast success
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message"); // toast error
    }
  };

  const contactItems = [
    {
      icon: "📧",
      title: "Project Email",
      primary: "faujimart.team@college.edu.in",
      secondary: "For project inquiries and feedback",
      iconBg: "bg-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: "🏛️",
      title: "Institution",
      primary: "Department of Computer Science & Engineering",
      secondary: "Engineering College Name",
      iconBg: "bg-green-500",
      bg: "bg-green-50",
    },
    {
      icon: "🎓",
      title: "Academic Details",
      primary: "E3 CSE - Academic Year 2025",
      secondary: "Software Engineering Laboratory Project",
      iconBg: "bg-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: "👥",
      title: "Development Team",
      primary: "6 E3 CSE Students",
      secondary: "Collaborative academic project team",
      iconBg: "bg-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="contact-container bg-white">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Navbar */}
      <HomeNav />

      {/* Contact Section */}
      <section
        id="contact"
        className="section-content 
        pt-10 sm:pt-24 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4f7942] mb-3 sm:mb-4">
              Contact Us 📞
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700">
              Get in Touch with the FaujiMart Development Team
            </p>
          </div>

          {/* Contact Information + Feedback Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Details */}
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl fade-in">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                📧 Contact Information
              </h3>
              <div className="space-y-6">
                {contactItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-xl ${item.bg}`}
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${item.iconBg} text-white text-2xl`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold mb-1 text-base sm:text-lg">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 text-sm sm:text-base">
                        {item.primary}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        {item.secondary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Form */}
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl fade-in bg-green-50">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                💬 Send Us Your Feedback
              </h3>
              <form
                onSubmit={handleContactForm}
                className="space-y-4 sm:space-y-6"
              >
                <div>
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    id="contactName"
                    placeholder="Enter your full name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    id="contactEmail"
                    placeholder="Enter your email address"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    id="contactSubject"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-green-400 text-sm sm:text-base"
                  >
                    <option value="">Select a subject</option>
                    <option value="feedback">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Suggestion</option>
                    <option value="academic">Academic Inquiry</option>
                    <option value="collaboration">
                      Collaboration Opportunity
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    id="contactMessage"
                    rows="5"
                    placeholder="Share your thoughts, suggestions, or questions about FaujiMart..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 text-sm sm:text-base resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base"
                >
                  📤 Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl mt-8 sm:mt-12 fade-in bg-gray-50">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                🤝 We Value Your Input
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base max-w-4xl mx-auto">
                As students working on this academic project, we greatly
                appreciate feedback from users, faculty, and industry
                professionals. Your insights help us improve our technical
                skills, understand real-world requirements, and enhance the
                overall quality of our work.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base max-w-4xl mx-auto">
                Whether you have suggestions for new features, found a bug, or
                simply want to share your experience with FaujiMart, we
                encourage you to reach out. Your feedback contributes to our
                learning journey and helps us build better software solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
              <div className="bg-gray-100 p-4 sm:p-6 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl mb-3">🎯</div>
                <h4 className="text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                  Academic Excellence
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm">
                  Committed to delivering high-quality academic work
                </p>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl mb-3">🚀</div>
                <h4 className="text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                  Continuous Learning
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm">
                  Always eager to learn and improve our skills
                </p>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl mb-3">💡</div>
                <h4 className="text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                  Innovation Focus
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm">
                  Exploring creative solutions to real problems
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
