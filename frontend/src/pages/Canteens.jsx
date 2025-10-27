import React from "react";

const Canteens = () => {
  const canteens = [
    {
      id: "canteen001",
      emoji: "🏛️",
      name: "Central Army Canteen Delhi",
      command: "CENTRAL COMMAND",
      commandColor: "bg-red-500",
      location: "Delhi Cantonment, New Delhi - 110010",
      inventory: "200+ Items across 6 categories",
      specialties: "Premium toiletries, Electronics, Watches",
      btnGradient: "from-blue-500 to-purple-600",
    },
    {
      id: "canteen002",
      emoji: "🌊",
      name: "Eastern Command Canteen Kolkata",
      command: "EASTERN COMMAND",
      commandColor: "bg-orange-500",
      location: "Fort William, Kolkata - 700021",
      inventory: "150+ Items across 6 categories",
      specialties: "Bengali sweets, Traditional items",
      btnGradient: "from-orange-500 to-red-600",
    },
    {
      id: "canteen003",
      emoji: "🏔️",
      name: "Southern Command Canteen Pune",
      command: "SOUTHERN COMMAND",
      commandColor: "bg-green-500",
      location: "Pune Cantonment, Maharashtra - 411001",
      inventory: "120+ Items across 6 categories",
      specialties: "Maharashtrian products, Spices",
      btnGradient: "from-green-500 to-emerald-600",
    },
    {
      id: "canteen004",
      emoji: "🌅",
      name: "Western Command Canteen Chandigarh",
      command: "WESTERN COMMAND",
      commandColor: "bg-yellow-500",
      location: "Chandimandir Cantonment, Haryana - 134107",
      inventory: "100+ Items across 6 categories",
      specialties: "Punjabi products, Dairy items",
      btnGradient: "from-yellow-500 to-orange-600",
    },
    {
      id: "canteen005",
      emoji: "🏔️",
      name: "Northern Command Canteen Jammu",
      command: "NORTHERN COMMAND",
      commandColor: "bg-indigo-500",
      location: "Udhampur Cantonment, J&K - 182101",
      inventory: "90+ Items across 6 categories",
      specialties: "Kashmiri products, Winter essentials",
      btnGradient: "from-indigo-500 to-purple-600",
    },
    {
      id: "canteen006",
      emoji: "🕌",
      name: "Central Command Canteen Lucknow",
      command: "CENTRAL COMMAND",
      commandColor: "bg-pink-500",
      location: "Lucknow Cantonment, UP - 226002",
      inventory: "85+ Items across 6 categories",
      specialties: "Awadhi products, Traditional sweets",
      btnGradient: "from-pink-500 to-red-600",
    },
  ];

  return (
    <section className="pt-24 pb-16 px-6 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4f7942] mb-3">
            Our Registered Canteens 🏪
          </h2>
          <p className="text-gray-600 text-lg">
            Authorized CSD Canteens Across Military Stations
          </p>
        </div>

        {/* Statistics */}
        <div className="bg-[#d9e8d0] p-8 rounded-3xl mb-12 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl text-center shadow">
              <div className="text-3xl font-bold text-[#4f7942] mb-2">6+</div>
              <p className="text-gray-600">Active Canteens</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow">
              <div className="text-3xl font-bold text-[#4f7942] mb-2">5+</div>
              <p className="text-gray-600">Military Commands</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow">
              <div className="text-3xl font-bold text-[#4f7942] mb-2">
                1000+
              </div>
              <p className="text-gray-600">Products Available</p>
            </div>
          </div>
          <p className="text-center text-gray-700">
            Our network spans across major military commands, providing
            authentic CSD products at subsidized rates to defense personnel and
            their families.
          </p>
        </div>

        {/* Canteen Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {canteens.map((canteen) => (
            <div
              key={canteen.id}
              className="bg-[#f8faf8] border border-[#d9e8d0] rounded-3xl p-8 hover:shadow-lg transition"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{canteen.emoji}</div>
                <h3 className="text-xl font-bold text-[#4f7942] mb-2">
                  {canteen.name}
                </h3>
                <div
                  className={`${canteen.commandColor} text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block`}
                >
                  {canteen.command}
                </div>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <div>
                  <h4 className="font-semibold">📍 Location</h4>
                  <p>{canteen.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold">📦 Inventory</h4>
                  <p>{canteen.inventory}</p>
                </div>
                <div>
                  <h4 className="font-semibold">⭐ Specialties</h4>
                  <p>{canteen.specialties}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-[#d9e8d0] mt-16 p-10 rounded-3xl text-center shadow-sm">
          <h3 className="text-2xl font-bold text-[#4f7942] mb-4">
            🎖️ Serving Our Heroes
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            Each canteen in our network is committed to providing authentic CSD
            products at subsidized rates exclusively for defense personnel and
            their families.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "🔐",
                title: "Secure Access",
                desc: "CSD card authentication required",
              },
              {
                emoji: "💰",
                title: "Subsidized Rates",
                desc: "Special pricing for defense personnel",
              },
              {
                emoji: "✅",
                title: "Quality Assured",
                desc: "Authentic products guaranteed",
              },
              {
                emoji: "📱",
                title: "Digital Access",
                desc: "Browse inventory online anytime",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow text-center"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h4 className="font-semibold text-[#4f7942] mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Canteens;
