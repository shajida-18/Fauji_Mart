import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-green-400">
        FaujiMart
      </Link>
      <div className="flex gap-4">
        <Link to="/login-army" className="hover:text-green-300">
          Army Login
        </Link>
        <Link to="/login-canteen" className="hover:text-green-300">
          Canteen Login
        </Link>
      </div>
    </nav>
  );
}
