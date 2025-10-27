const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/auth");

// -------------------- CANTEENS --------------------

// ✅ Fetch all canteens (optional search)
router.get("/", async (req, res) => {
  const location = req.query.location || "";
  const like = `%${location}%`;
  try {
    const [rows] = await pool.query(
      `SELECT id, name, address, location, email FROM canteens
       WHERE location LIKE ? OR name LIKE ? OR email LIKE ?`,
      [like, like, like]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch single canteen
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, location, email FROM canteens WHERE id = ?",
      [req.params.id]
    );
    if (!rows.length)
      return res.status(404).json({ message: "Canteen not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- ITEMS CRUD --------------------

// ✅ Get all items for a canteen
router.get("/:id/items", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM items WHERE canteen_id = ? ORDER BY created_at DESC",
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching items" });
  }
});

// ✅ Add new item
router.post("/:id/items", verifyToken, async (req, res) => {
  const { category, name, description, price, stock, image } = req.body;
  const canteenId = req.params.id;

  try {
    const [canteenRows] = await pool.query(
      "SELECT location FROM canteens WHERE id = ?",
      [canteenId]
    );
    if (!canteenRows.length)
      return res.status(404).json({ message: "Canteen not found" });

    const location = canteenRows[0].location;

    await pool.query(
      `INSERT INTO items (canteen_id, name, description, price, stock, category, image, location)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        canteenId,
        name,
        description || "",
        price,
        stock,
        category || "general",
        image || "",
        location,
      ]
    );

    res.json({ message: "Item added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding item" });
  }
});

// ✅ Update an item
router.put("/:id/items/:itemId", verifyToken, async (req, res) => {
  const { category, name, description, price, stock, image } = req.body;
  try {
    await pool.query(
      `UPDATE items SET name=?, description=?, price=?, stock=?, category=?, image=? 
       WHERE id=? AND canteen_id=?`,
      [
        name,
        description || "",
        price,
        stock,
        category || "general",
        image || "",
        req.params.itemId,
        req.params.id,
      ]
    );
    res.json({ message: "Item updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating item" });
  }
});

// ✅ Delete an item
router.delete("/:id/items/:itemId", verifyToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM items WHERE id=? AND canteen_id=?", [
      req.params.itemId,
      req.params.id,
    ]);
    res.json({ message: "Item deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
