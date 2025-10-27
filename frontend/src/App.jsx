import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomeNav from "./pages/HomeNav";
import Footer from "./pages/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Canteens from "./pages/Canteens";
import ArmyLogin from "./pages/ArmyLogin";
import CanteenLogin from "./pages/CanteenLogin";
import ArmyDashboard from "./pages/ArmyDashboard";
import CanteenDashboard from "./pages/CanteenDashboard";
import CanteenItems from "./pages/CanteenItems";
import ArmyRegister from "./pages/ArmyRegister";
import CanteenRegister from "./pages/CanteenRegister";

export default function App() {
  const location = useLocation();

  // Pages where we DON'T want the main HomeNav
  const hideNavPaths = [
    "/army-dashboard",
    "/canteen-dashboard",
    "/canteen/", // dynamic items pages start with this
  ];

  // Check if current path starts with any of the hidden paths
  const shouldShowNav = !hideNavPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div>
      {shouldShowNav && <HomeNav />}
      <div className={shouldShowNav ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/canteens" element={<Canteens />} />
          <Route path="/login-army" element={<ArmyLogin />} />
          <Route path="/login-canteen" element={<CanteenLogin />} />
          <Route path="/army-dashboard" element={<ArmyDashboard />} />
          <Route path="/canteen-dashboard/:id" element={<CanteenDashboard />} />
          <Route path="/canteen/:id/items" element={<CanteenItems />} />
          <Route path="/register-army" element={<ArmyRegister />} />
          <Route path="/register-canteen" element={<CanteenRegister />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
