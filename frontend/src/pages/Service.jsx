import React from "react";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";
import HomeNav from "./HomeNav";
import "./Home.css";

export default function Services() {
  const services = [
    {
      icon: <FaBoxOpen />,
      title: "Stock Management",
      description:
        "Canteen owners can efficiently manage inventory, update stock, and categorize products for easy access.",
      bgColor: "bg-green-100", // soft background for white
      iconColor: "text-green-700",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location-Based Stock View",
      description:
        "Army personnel can view stock availability in nearby CSD canteens based on their location.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description:
        "All data is stored securely with role-based access control, ensuring privacy and safety.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-700",
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Interface",
      description:
        "Access stock information and manage inventory seamlessly on both desktop and mobile devices.",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-700",
    },
  ];

  const benefits = [
    {
      title: "Real-Time Stock Updates",
      description:
        "Instant visibility of stock availability for army personnel and canteen owners.",
      icon: "📈",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Simplified Canteen Management",
      description:
        "Organize products, categories, and quantities in a user-friendly interface.",
      icon: "🗂️",
      bgColor: "bg-pink-100",
    },
    {
      title: "Location Awareness",
      description:
        "Army users can check stock only in canteens nearby, improving relevance and usability.",
      icon: "📍",
      bgColor: "bg-blue-100",
    },
    {
      title: "Secure Access Control",
      description:
        "Role-based permissions ensure only authorized users can manage or view inventory.",
      icon: "🔒",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="services-container bg-white text-gray-900">
      {/* Navbar */}
      <HomeNav />

      {/* Services Section */}
      <section
        id="services"
        className="section-content pt-14 sm:pt-24 lg:pt-30 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center fade-in">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold  mb-3 sm:mb-4 text-[#4f7942]">
              Our Services 🛠️
            </h2>
            <p className="text-gray-700 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              FaujiMart helps canteens manage stock efficiently and enables army
              personnel to check stock availability based on location.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-6 sm:p-8 rounded-3xl hover-lift fade-in ${service.bgColor} flex flex-col items-center`}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 text-3xl sm:text-4xl ${service.iconColor}`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="mt-16 fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">
              Key Benefits ✨
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`p-6 sm:p-8 rounded-3xl hover-lift ${benefit.bgColor} flex flex-col items-center text-center`}
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
