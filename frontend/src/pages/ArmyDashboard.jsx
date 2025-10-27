import React, { useEffect, useState } from "react";
import api from "../api";
import MapComponent from "./MapComponent";
import { useNavigate } from "react-router-dom";

export default function ArmyDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("faujimart_user") || "{}");

  const [allCanteens, setAllCanteens] = useState([]);
  const [filteredCanteens, setFilteredCanteens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [canteenItems, setCanteenItems] = useState([]);
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [categoryIcons, setCategoryIcons] = useState({});

  // Normalize category names
  const normalizeCategory = (category = "") => {
    if (!category) return "general";
    const lower = category.toLowerCase().trim();

    if (["watch", "watches", "electronics", "gadgets"].includes(lower))
      return "electronic devices";
    if (
      [
        "food",
        "foods",
        "food items",
        "beverages",
        "snacks",
        "food & beverages",
        "food & bevarages",
      ].includes(lower)
    )
      return "food & beverages";
    if (["toiletry", "toiletries"].includes(lower)) return "toiletries";
    if (["stationery", "stationary"].includes(lower)) return "stationery";
    if (["household", "home", "domestic"].includes(lower)) return "household";
    if (["general", "misc", "others"].includes(lower)) return "general";
    if (
      ["fruits", "vegetables", "fruits & vegetables", "veggies"].includes(lower)
    )
      return "fruits & vegetables";

    return lower;
  };

  // Fetch all canteens
  useEffect(() => {
    async function fetchCanteens() {
      try {
        const { data } = await api.get("/auth/canteens");
        setAllCanteens(data.canteens);
      } catch (err) {
        console.error("Error fetching canteens:", err);
      }
    }
    fetchCanteens();
  }, []);

  // Load saved categories from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem("canteen_categories");
    if (savedCategories) {
      const parsed = JSON.parse(savedCategories);
      const iconsMap = {};
      parsed.forEach((c) => {
        iconsMap[c.key] = c.icon;
      });
      setCategoryIcons(iconsMap);
    }
  }, []);

  // Handle click on a canteen
  const handleCanteenClick = async (canteen) => {
    setSelectedCanteen(canteen);
    setSelectedLocation(canteen.location);
    try {
      const { data } = await api.get(
        `/auth/army-inventory/${canteen.location}`
      );
      setCanteenItems(data.items || []);

      // Merge icons from items with saved categories
      const iconsMap = { ...categoryIcons };
      (data.items || []).forEach((item) => {
        const cat = normalizeCategory(item.category);
        if (!iconsMap[cat]) {
          let icon = "📦"; // fallback
          if (cat.includes("food")) icon = "🍽️";
          if (cat.includes("fruits") || cat.includes("vegetables"))
            icon = "🥦🍎";
          if (cat.includes("toiletries")) icon = "🧴";
          if (cat.includes("household")) icon = "🏠";
          if (cat.includes("stationery")) icon = "📝";
          if (cat.includes("electronic")) icon = "⌚";
          iconsMap[cat] = icon;
        }
      });
      setCategoryIcons(iconsMap);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // Search canteens by location
  const searchCanteens = () => {
    if (!searchTerm.trim()) {
      alert("Please enter a location or base name");
      return;
    }
    setHasSearched(true);
    const filtered = allCanteens.filter((c) =>
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCanteens(filtered);
    if (filtered.length > 0) setSelectedLocation(filtered[0].location);
    else {
      setSelectedLocation("");
      setSelectedCanteen(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("faujimart_user");
    localStorage.removeItem("faujimart_token");
    navigate("/");
  };

  const filteredItems = canteenItems.filter((item) =>
    item.name.toLowerCase().includes(itemSearchTerm.toLowerCase())
  );

  return (
    <section className="bg-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full bg-[#4f7942] text-white py-4 shadow-md flex justify-between items-center px-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          Welcome,{" "}
          {user.category && user.category.toLowerCase() !== "other"
            ? `${user.category} ${user.name}`
            : user.name || "Soldier"}{" "}
          🎖️
        </h1>
        <button
          onClick={handleLogout}
          className="bg-white text-[#4f7942] px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Logout
        </button>
      </nav>

      <div className="flex-1 pt-8 pb-12 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-8 text-center fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2f4f2f] pt-20">
            Hello,{" "}
            {user.category && user.category.toLowerCase() !== "other"
              ? `${user.category} ${user.name}`
              : user.name || "Soldier"}
            !
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mt-2 pb-10">
            Ready to find canteens and explore available items today?
          </p>
        </div>

        {/* Search Section */}
        <div className="glass-effect p-6 sm:p-8 rounded-3xl mb-8 fade-in shadow-lg bg-gray-50">
          <h3 className="text-2xl font-bold mb-6 text-center text-[#2f4f2f]">
            🔍 Find Nearby Canteens
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter your location or base name"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-green-500 text-base"
            />
            <button
              onClick={searchCanteens}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all text-base"
            >
              🔍 Search
            </button>
          </div>
        </div>

        {hasSearched && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="order-2 lg:order-1 w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-md border border-gray-200 sticky top-24">
              {selectedLocation ? (
                <MapComponent location={selectedLocation} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  🗺️ No map available
                </div>
              )}
            </div>

            {/* Canteen Items */}
            <div
              id="canteensList"
              className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {!selectedCanteen ? (
                filteredCanteens.length === 0 ? (
                  <p className="text-center text-gray-600 col-span-full">
                    No canteens found for “{searchTerm}”.
                  </p>
                ) : (
                  filteredCanteens.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleCanteenClick(c)}
                      className="cursor-pointer p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#2f4f2f]">
                          {c.name || "Unnamed Canteen"}
                        </h3>
                        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                          {c.location || "N/A"}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        📍 Click to view available items
                      </p>
                    </div>
                  ))
                )
              ) : (
                <div className="col-span-full">
                  <h3 className="text-2xl font-bold text-[#2f4f2f] mb-4">
                    🏪 {selectedCanteen.name}
                  </h3>
                  <button
                    onClick={() => setSelectedCanteen(null)}
                    className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    ← Back to Canteens
                  </button>

                  <div className="mb-6 flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Search items in this canteen..."
                      value={itemSearchTerm}
                      onChange={(e) => setItemSearchTerm(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-green-500 text-base"
                    />
                    <button
                      onClick={() => setItemSearchTerm("")}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition"
                    >
                      Clear
                    </button>
                  </div>

                  {filteredItems.length === 0 ? (
                    <p className="text-gray-600 text-center">
                      ❌ No products found in this canteen.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredItems.map((item) => {
                        const category = normalizeCategory(item.category);
                        return (
                          <div
                            key={item.id}
                            className="p-4 border rounded-xl shadow hover:shadow-md transition flex flex-col items-center text-center"
                          >
                            <div className="text-3xl mb-1">
                              {categoryIcons[category] || "📦"}
                            </div>
                            <h4 className="font-semibold text-[#2f4f2f]">
                              {item.name}
                            </h4>
                            <p className="text-gray-600 mt-1">
                              ₹{item.price} • Stock: {item.stock}{" "}
                              {item.unit || "pcs"}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </p>
                            {item.description && (
                              <p className="text-gray-500 mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
