import React from "react";
import HomeNav from "./HomeNav";
import "./Home.css"; // Make sure your CSS includes glass-effect, fade-in, gradients, etc.

export default function About() {
  const teamMembers = [
    {
      emoji: "👨‍💻",
      role: "Team Lead & Backend",
      description: "Node.js & SQL Specialist",
    },
    {
      emoji: "🎨",
      role: "Frontend Developer",
      description: "React & UI/UX Designer",
    },
    {
      emoji: "🗄️",
      role: "Database Architect",
      description: "SQL Database & Data Modeling",
    },
    {
      emoji: "🔒",
      role: "Security Specialist",
      description: "Authentication & Authorization",
    },
    {
      emoji: "🧪",
      role: "Quality Assurance",
      description: "Testing & Documentation",
    },
    {
      emoji: "🚀",
      role: "DevOps Engineer",
      description: "Deployment & Maintenance",
    },
  ];

  const techStack = [
    {
      emoji: "⚛️",
      title: "React.js",
      description: "Modern Frontend Framework",
      lightGradient: "from-gray-100 to-gray-200",
    },
    {
      emoji: "🟢",
      title: "Node.js",
      description: "Backend Runtime",
      lightGradient: "from-gray-100 to-gray-200",
    },
    {
      emoji: "🗄️",
      title: "SQL",
      description: "Relational Database Management System",
      lightGradient: "from-gray-100 to-gray-200",
    },
    {
      emoji: "🎨",
      title: "Tailwind CSS",
      description: "CSS Utility Framework",
      lightGradient: "from-gray-100 to-gray-200",
    },
  ];

  const keyFeatures = [
    {
      emoji: "🔐",
      title: "Secure Authentication System",
      description:
        "Simulated CSD smart card authentication for army personnel with role-based access control",
      color: "bg-gray-100",
    },
    {
      emoji: "📍",
      title: "Canteen Location Service",
      description:
        "Advanced search functionality to locate nearby army canteens with real-time availability",
      color: "bg-gray-100",
    },
    {
      emoji: "📱",
      title: "Responsive Design",
      description:
        "Mobile-first approach ensuring seamless experience across all devices",
      color: "bg-gray-100",
    },
    {
      emoji: "📦",
      title: "Inventory Management",
      description:
        "Comprehensive tools for canteen owners to manage stock, pricing, and product categories",
      color: "bg-gray-100",
    },
    {
      emoji: "🛒",
      title: "Product Categorization",
      description:
        "Organized product browsing with categories like toiletries, food, electronics, and more",
      color: "bg-gray-100",
    },
    {
      emoji: "⚡",
      title: "Real-time Updates",
      description:
        "Live inventory tracking and instant updates for stock availability",
      color: "bg-gray-100",
    },
  ];

  const statistics = [
    {
      value: "15+",
      description: "Registered Army Canteens",
      gradient: "from-green-100 to-green-200",
      textColor: "text-gray-900",
    },
    {
      value: "100+",
      description: "Categorized Inventory Items",
      gradient: "from-blue-100 to-blue-200",
      textColor: "text-gray-900",
    },
    {
      value: "100%",
      description: "Secure Login System",
      gradient: "from-purple-100 to-purple-200",
      textColor: "text-gray-900",
    },
  ];

  return (
    <div className="about-container bg-white">
      <HomeNav />

      <section
        id="about"
        className="section-content pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold  mb-3 sm:mb-4 text-[#4f7942]">
              About FaujiMart 📚
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700">
              A Student-Built Digital Solution for Army Canteen Management
            </p>
          </div>

          {/* Project Overview */}
          <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-3xl mb-8 sm:mb-12 fade-in bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  🎓 FaujiMart Overview
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  FaujiMart is a comprehensive web application. This application
                  demonstrates the complete software development lifecycle,
                  focusing on creating a digital platform for Indian Army
                  canteen management.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  This Web is designed and implemented a secure, user-friendly
                  platform for army personnel to locate nearby canteens and
                  browse inventory, while providing canteen owners with robust
                  tools for inventory management and operational efficiency.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 p-6 sm:p-8 rounded-2xl inline-block">
                  <div className="text-4xl sm:text-5xl mb-4">🏛️</div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    FaujiMart
                  </h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Serving Those who Serves The Nation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Development Team */}
          {/* <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-3xl mb-8 sm:mb-12 fade-in bg-gray-50">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              👥 Development Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-4 sm:p-6 rounded-xl text-center"
                >
                  <div className="text-2xl sm:text-3xl mb-3">
                    {member.emoji}
                  </div>
                  <h4 className="text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                    {member.role}
                  </h4>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 sm:mt-8">
              <p className="text-gray-700 text-sm sm:text-base">
                <strong>6 Dedicated E3 CSE Students</strong> working
                collaboratively to deliver this comprehensive solution
              </p>
            </div>
          </div> */}

          {/* Technology Stack */}
          {/* <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-3xl mb-8 sm:mb-12 fade-in bg-gray-50">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              ⚡ Technology Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${tech.lightGradient} p-4 sm:p-6 rounded-xl text-center hover:scale-105 transition-transform`}
                >
                  <div className="text-3xl sm:text-4xl mb-3">{tech.emoji}</div>
                  <h4 className="text-gray-900 font-bold mb-2 text-sm sm:text-base">
                    {tech.title}
                  </h4>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Key Features */}
          <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-3xl mb-8 sm:mb-12 fade-in bg-gray-50">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              🚀 Key Features Implemented
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {keyFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div
                    className={`${feature.color} text-gray-900 p-2 rounded-lg flex-shrink-0 flex items-center justify-center`}
                  >
                    <div className="text-lg sm:text-xl">{feature.emoji}</div>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                      {feature.title}
                    </h4>
                    <p className="text-gray-700 text-xs sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Statistics */}
          <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-3xl fade-in bg-gray-50">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              📊 Project Impact & Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {statistics.map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${stat.gradient} p-4 sm:p-6 rounded-xl text-center`}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <p className={`${stat.textColor} text-sm sm:text-base`}>
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 text-center leading-relaxed text-sm sm:text-base">
              FaujiMart demonstrates our team's capability to deliver
              enterprise-grade solutions with robust security, scalable
              architecture, and user-centric design, bridging the gap between
              army personnel and canteen services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
