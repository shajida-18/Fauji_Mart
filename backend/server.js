require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const canteenRoutes = require("./routes/canteens");
const itemsRoutes = require("./routes/items");
const contactRouter = require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Army & general auth
app.use("/api/canteens", canteenRoutes); // Canteen routes
app.use("/api/canteens", itemsRoutes); // Items routes per canteen
app.use("/api/contact", contactRouter); // Contact form

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
