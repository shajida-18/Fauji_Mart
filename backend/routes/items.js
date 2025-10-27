const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

// GET /api/canteens/:id/items?category=...
router.get('/:id/items', async (req, res) => {
  const { category } = req.query;
  let sql = 'SELECT id, category, name, price, stock, image FROM items WHERE canteen_id = ?';
  const params = [req.params.id];
  if (category) { sql += ' AND category = ?'; params.push(category); }
  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/canteens/:id/items  (protected — must pass Bearer token)
router.post('/:id/items', async (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    if (payload.canteenId !== req.params.id) return res.status(403).json({ message: 'Forbidden' });

    const { category, name, price, stock, image } = req.body;
    if (!category || !name || price == null || stock == null) return res.status(400).json({ message: 'Missing fields' });

    const [result] = await pool.query(
      'INSERT INTO items (canteen_id, category, name, price, stock, image) VALUES (?,?,?,?,?,?)',
      [req.params.id, category, name, price, stock, image || null]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
