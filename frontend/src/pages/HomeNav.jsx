import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className="glass-effect fixed w-full top-0 z-50 fade-in"
      style={{ backgroundColor: "#4f7942" }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="#0d4f3c"
                stroke="#ff6b35"
                strokeWidth="3"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#ff6b35"
                strokeWidth="2"
              />
              <path
                d="M35 30 L50 20 L65 30 L60 40 L50 35 L40 40 Z"
                fill="#ff6b35"
              />
              <rect x="47" y="35" width="6" height="20" fill="#ff6b35" />
              <path d="M30 60 L70 60 L65 70 L35 70 Z" fill="#ff6b35" />
              <text
                x="50"
                y="82"
                textAnchor="middle"
                fill="#ff6b35"
                fontSize="7"
                fontWeight="bold"
              >
                CSD
              </text>
            </svg>
            <div className="text-white text-lg sm:text-2xl font-bold">
              FaujiMart
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4 lg:space-x-8">
              <Link
                to="/"
                className="text-white hover:text-green-200 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-green-200 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-green-200 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-green-200 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/canteens"
                className="text-white hover:text-green-200 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Canteens
              </Link>

              {/* <Link
                to="/login-army"
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 lg:px-6 py-2 rounded-full text-sm font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
              >
                🔐 Army Login
              </Link>
              <Link
                to="/login-canteen"
                className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 lg:px-6 py-2 rounded-full text-sm font-semibold hover:from-orange-500 hover:to-red-600 transition-all"
              >
                🏪 Canteen Login
              </Link> */}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-[#3f6435] rounded-lg mt-2 shadow-md">
            <Link
              to="/"
              onClick={toggleMobileMenu}
              className="block text-white hover:text-green-200 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={toggleMobileMenu}
              className="block text-white hover:text-green-200 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={toggleMobileMenu}
              className="block text-white hover:text-green-200 px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              onClick={toggleMobileMenu}
              className="block text-white hover:text-green-200 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            <Link
              to="/canteens"
              onClick={toggleMobileMenu}
              className="block text-white hover:text-green-200 px-3 py-2 rounded-md text-base font-medium"
            >
              Canteens
            </Link>
            {/* <Link
              to="/login-army"
              onClick={toggleMobileMenu}
              className="block bg-gradient-to-r from-green-700 to-teal-500 text-white px-4 py-2 rounded-full font-semibold hover:from-green-800 hover:to-teal-600 transition-all"
            >
              🔐 Army Login
            </Link>
            <Link
              to="/login-canteen"
              onClick={toggleMobileMenu}
              className="block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              🏪 Canteen Login
            </Link> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default HomeNav;
