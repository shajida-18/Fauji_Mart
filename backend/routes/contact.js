// backend/routes/contact.js
const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail"); // your nodemailer file

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await sendEmail(
      process.env.EMAIL_USER, // send to your dev email
      `[Contact Form] ${subject}`,
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Send mail error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

module.exports = router;
