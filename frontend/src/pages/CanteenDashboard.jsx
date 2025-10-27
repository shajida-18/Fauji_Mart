import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

export default function CanteenDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("faujimart_user") || "{}");
  const token = localStorage.getItem("faujimart_token");

  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    unit: "pcs",
    category: "general",
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const defaultCategories = [
    { key: "toiletries", label: "Toiletries", icon: "🧴" },
    { key: "household", label: "Household", icon: "🏠" },
    { key: "general", label: "General Items", icon: "📦" },
    { key: "electronic devices", label: "Electronic Devices", icon: "⌚" },
    { key: "stationery", label: "Stationery", icon: "📝" },
    { key: "food & beverages", label: "Food & Beverages", icon: "🍽️" },
    { key: "fruits & vegetables", label: "Fruits & Vegetables", icon: "🥦🍎" },
  ];

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("canteen_categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });

  const categoryIcons = categories.reduce((acc, cur) => {
    acc[cur.key] = cur.icon;
    return acc;
  }, {});

  const getDefaultUnit = (category) => {
    switch (category) {
      case "fruits & vegetables":
        return "kg";
      case "food & beverages":
        return "pcs";
      default:
        return "pcs";
    }
  };

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
    if (
      ["fruits", "vegetables", "fruits & vegetables", "veggies"].includes(lower)
    )
      return "fruits & vegetables";
    if (["general", "misc", "others"].includes(lower)) return "general";
    const found = categories.find((c) => c.key === lower);
    if (found) return found.key;
    return lower;
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadItems = async () => {
    try {
      const res = await api.get(`/canteens/${id}/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load items!");
    }
  };

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter(
          (item) => normalizeCategory(item.category) === activeCategory
        );

  const openModalForEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description || "",
      price: item.price,
      stock: item.stock,
      unit: item.unit || getDefaultUnit(normalizeCategory(item.category)),
      category: normalizeCategory(item.category),
    });
    setEditingItemId(item.id);
    setShowModal(true);
  };

  const openModalForAdd = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      unit: "pcs",
      category: "general",
    });
    setEditingItemId(null);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, category: normalizeCategory(form.category) };
      if (editingItemId) {
        await api.put(`/canteens/${id}/items/${editingItemId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Item updated successfully!");
      } else {
        await api.post(`/canteens/${id}/items`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Item added successfully!");
      }
      setShowModal(false);
      setEditingItemId(null);
      loadItems();
    } catch (err) {
      console.error(err);
      toast.error("Error saving item!");
    }
  };

  const handleDeleteItem = (itemId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this item?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.delete(`/canteens/${id}/items/${itemId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  toast.success("Item deleted successfully!");
                  loadItems();
                } catch (err) {
                  console.error(err);
                  toast.error("Error deleting item!");
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const handleDeleteCategory = (catKey, catLabel) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete "{catLabel}" category?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                const updated = categories.filter((c) => c.key !== catKey);
                setCategories(updated);
                localStorage.setItem(
                  "canteen_categories",
                  JSON.stringify(updated)
                );
                if (activeCategory === catKey) setActiveCategory("all");
                toast.success("Category deleted successfully!");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.icon) {
      toast.error("Please provide both name and icon!");
      return;
    }
    const key = newCategory.name.toLowerCase().trim().replace(/\s+/g, "-");
    if (categories.some((c) => c.key === key)) {
      toast.error("Category already exists!");
      return;
    }
    const updated = [
      ...categories,
      { key, label: newCategory.name, icon: newCategory.icon },
    ];
    setCategories(updated);
    localStorage.setItem("canteen_categories", JSON.stringify(updated));
    setNewCategory({ name: "", icon: "" });
    toast.success("Category added successfully!");
  };

  const handleCategoryChange = (value) => {
    const normalized = normalizeCategory(value);
    setForm({
      ...form,
      category: normalized,
      unit: getDefaultUnit(normalized),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("faujimart_user");
    localStorage.removeItem("faujimart_token");
    navigate("/");
  };

  return (
    <section className="bg-white min-h-screen flex flex-col">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Navbar */}
      <nav className="w-full bg-[#4f7942] text-white py-4 shadow-md flex justify-between items-center px-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          Welcome! {user.name || ""}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-white text-[#4f7942] px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2f4f2f] mb-2 pt-10">
            🏪 Canteen Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            Add, edit, or browse items by category
          </p>
        </div>

        {/* Add New Item Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={openModalForAdd}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            ➕ Add New Item
          </button>
        </div>

        {/* Add New Category */}
        <div className="bg-gray-100 p-6 rounded-2xl mb-6 shadow-md">
          <h3 className="text-xl font-semibold text-[#2f4f2f] mb-4">
            ➕ Add New Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="p-3 rounded border border-gray-300 focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              placeholder="Icon (emoji)"
              value={newCategory.icon}
              onChange={(e) =>
                setNewCategory({ ...newCategory, icon: e.target.value })
              }
              className="p-3 rounded border border-gray-300 focus:outline-none focus:border-green-500"
            />
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Add Category
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`category-card p-4 sm:p-6 rounded-xl font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-green-400 hover:text-white"
            }`}
          >
            <div className="text-2xl sm:text-3xl mb-2">📦</div>
            <div className="text-xs sm:text-sm">All Items</div>
          </button>

          {categories.map((cat) => (
            <div key={cat.key} className="relative group">
              <button
                onClick={() => setActiveCategory(cat.key)}
                className={`category-card p-4 sm:p-6 rounded-xl font-semibold transition-all w-full ${
                  activeCategory === cat.key
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-green-400 hover:text-white"
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{cat.icon}</div>
                <div className="text-xs sm:text-sm">{cat.label}</div>
              </button>
              <div className="mt-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDeleteCategory(cat.key, cat.label)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">
              No items found for this category.
            </p>
          ) : (
            filteredItems.map((item) => {
              const normalized = normalizeCategory(item.category);
              return (
                <div
                  key={item.id}
                  className="p-4 bg-gray-100 rounded-xl shadow hover:shadow-md flex flex-col items-center text-center"
                >
                  <div className="text-3xl mb-2">
                    {categoryIcons[normalized] || "📦"}
                  </div>
                  <h4 className="font-semibold text-lg text-[#2f4f2f]">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    ₹{item.price} • Stock: {item.stock} {item.unit || "pcs"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
                  </p>
                  <p className="text-gray-500 mt-1">{item.description}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => openModalForEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-11/12 sm:w-1/2">
            <h3 className="text-xl font-semibold text-[#2f4f2f] mb-4">
              {editingItemId ? "Edit Item" : "Add New Item"}
            </h3>
            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Item Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
                className="p-3 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <select
                value={form.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="p-3 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              >
                {categories.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
              <select
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="p-3 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              >
                <option value="pcs">pcs</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="bunch">bunch</option>
                <option value="ltr">ltr</option>
              </select>

              {/* continuation: description + actions */}
              <input
                type="text"
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="p-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 sm:col-span-2"
              />
              <div className="flex gap-2 sm:col-span-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex-1"
                >
                  {editingItemId ? "Update Item" : "Add Item"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItemId(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
