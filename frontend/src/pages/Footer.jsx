import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="bg-gray-50 w-full mt-10"
      style={{ backgroundColor: "#d9e8d0" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10  rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start text-center md:text-left gap-8 md:gap-0">
          {/* Brand / Info */}
          <div className="md:w-1/3 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Faujimart</h2>
            <p className="text-gray-700 text-sm">
              Your trusted army canteen and supply management platform. Serving
              soldiers with ease and transparency.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-green-600 transition">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-green-600 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:w-1/3 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Follow Us
            </h3>
            <div className="flex gap-4 justify-center text-gray-700">
              <a href="#" className="hover:text-green-600 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-green-600 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-green-600 transition">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-green-600 transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 border-t border-gray-300 pt-4 text-center">
          <p className="text-sm text-gray-700">
            &copy; {new Date().getFullYear()} Faujimart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
