import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().limit(50).lean();
    res.json(products);
  } catch (err) { next(err); }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch (err) { next(err); }
});

// POST /api/products  (for admin/testing)
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const p = new Product(data);
    await p.save();
    res.status(201).json(p);
  } catch (err) { next(err); }
});

export default router;
