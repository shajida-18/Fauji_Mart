const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const SECRET = process.env.SECRET || "faujimart_secret";

// ----- Army login -----
router.post("/army-login", async (req, res) => {
  const { card_number, pin } = req.body;
  if (!card_number || !pin)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const [rows] = await pool.query(
      "SELECT id, card_number, pin, name, email, location,category FROM users WHERE card_number = ? AND pin = ?",
      [card_number, pin]
    );

    if (!rows.length)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];

    // Send login email if email exists
    if (user.email) {
      sendEmail(
        user.email,
        "Army Login Notification",
        `Hello ${user.name},\n\nYou have successfully logged in to FaujiMart.`
      );
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----- Army registration -----
router.post("/army-register", async (req, res) => {
  const { card_number, pin, name, location, email, category } = req.body;
  if (!card_number || !pin || !name || !location || !category)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE card_number = ?",
      [card_number]
    );
    if (rows.length)
      return res.status(400).json({ message: "Army user already exists" });

    await pool.query(
      "INSERT INTO users (card_number, pin, name, location, email, category) VALUES (?, ?, ?, ?, ?, ?)",
      [card_number, pin, name, location, email || null, category]
    );

    if (email) {
      sendEmail(
        email,
        "Welcome to FaujiMart",
        `Hello ${name},\n\nYour army account has been successfully created.\nCategory: ${category}`
      );
    }

    res.json({ message: "Army account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----- Canteen login -----
router.post("/canteen-login", async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const [rows] = await pool.query("SELECT * FROM canteens WHERE id = ?", [
      id.trim(),
    ]);
    if (!rows.length)
      return res.status(401).json({ message: "Invalid credentials" });

    const canteen = rows[0];
    if (password.trim() !== canteen.password)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ canteenId: canteen.id }, SECRET, {
      expiresIn: "1d",
    });

    // Send login email if email exists
    if (canteen.email) {
      sendEmail(
        canteen.email,
        "Canteen Login Notification",
        `Hello ${canteen.id},\n\nYou have successfully logged in to FaujiMart.`
      );
    }

    res.json({ token, canteen });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----- Canteen registration -----
router.post("/canteen-register", async (req, res) => {
  const { id, password, location, email } = req.body;
  if (!id || !password || !location)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const [rows] = await pool.query("SELECT * FROM canteens WHERE id = ?", [
      id,
    ]);
    if (rows.length)
      return res.status(400).json({ message: "Canteen already exists" });

    await pool.query(
      "INSERT INTO canteens (id, password, location, email) VALUES (?, ?, ?, ?)",
      [id, password, location, email || null]
    );

    // Send registration email only
    if (email) {
      sendEmail(
        email,
        "Welcome to FaujiMart",
        `Hello ${id},\n\nYour canteen account has been successfully created.`
      );
    }

    res.json({ message: "Canteen account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----- Get all locations -----
router.get("/locations", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT DISTINCT location FROM canteens WHERE location IS NOT NULL"
    );
    const locations = rows.map((r) => r.location);
    res.json({ locations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----- Get all canteens -----
router.get("/canteens", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, location, email,
        (SELECT COUNT(*) FROM items i WHERE i.canteen_id = c.id) AS items_count
       FROM canteens c`
    );
    res.json({ canteens: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----- Get items for a specific location -----
router.get("/army-inventory/:location", async (req, res) => {
  const { location } = req.params;
  try {
    const [items] = await pool.query(
      `SELECT i.*, c.id AS canteen_id
       FROM items i
       JOIN canteens c ON i.canteen_id = c.id
       WHERE c.location = ?`,
      [location]
    );
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// =======================
// SEND OTP for Forgot PIN (MySQL)
// =======================
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!rows.length)
      return res.status(404).json({ message: "No user found with this email" });

    const user = rows[0];

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // store OTP and expiry (5 minutes)
    const otpExpires = Date.now() + 5 * 60 * 1000;

    await pool.query(
      "UPDATE users SET otp = ?, otp_expires = ? WHERE email = ?",
      [otp, otpExpires, email]
    );

    // send OTP email
    await sendEmail(
      email,
      "FaujiMart | PIN Reset OTP",
      `Hello ${
        user.name || "User"
      },\n\nYour OTP is ${otp}. It will expire in 5 minutes.\n\nIf you did not request a PIN reset, please ignore this email.\n\nRegards,\nFaujiMart Team`
    );

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP error:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

// =======================
// RESET PIN with OTP (MySQL)
// =======================
router.post("/reset-pin", async (req, res) => {
  try {
    const { email, otp, newPin } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND otp = ?",
      [email, otp]
    );

    if (!rows.length)
      return res.status(400).json({ message: "Invalid OTP or email" });

    const user = rows[0];

    if (Date.now() > user.otp_expires)
      return res.status(400).json({ message: "OTP expired" });

    // update PIN and clear OTP fields
    await pool.query(
      "UPDATE users SET pin = ?, otp = NULL, otp_expires = NULL WHERE email = ?",
      [newPin, email]
    );

    res.json({ message: "PIN reset successful!" });
  } catch (err) {
    console.error("Reset PIN error:", err);
    res.status(500).json({ message: "Error resetting PIN" });
  }
});

module.exports = router;
