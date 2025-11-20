import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res, next) => {
  try {
    const { customerName, phone, address, items } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items' });

    // calculate total and create order items snapshot
    let total = 0;
    const orderItems = [];
    for (const it of items) {
      const prod = await Product.findById(it.product);
      if (!prod) return res.status(400).json({ error: 'Invalid product' });
      const price = prod.price;
      const qty = it.qty || 1;
      total += price * qty;
      orderItems.push({ product: prod._id, qty, price });

      // reduce stock (simple naive approach)
      if (prod.stock >= qty) {
        prod.stock -= qty;
        await prod.save();
      }
    }

    const order = new Order({ customerName, phone, address, items: orderItems, total });
    await order.save();
    res.status(201).json(order);
  } catch (err) { next(err); }
});

// GET /api/orders (admin/testing)
router.get('/', async (req,res,next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50).populate('items.product');
    res.json(orders);
  } catch (err) { next(err); }
});

export default router;
