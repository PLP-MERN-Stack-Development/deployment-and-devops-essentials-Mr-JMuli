import mongoose from 'mongoose';

const OrderItem = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  qty: Number,
  price: Number
});

const OrderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  items: [OrderItem],
  total: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
