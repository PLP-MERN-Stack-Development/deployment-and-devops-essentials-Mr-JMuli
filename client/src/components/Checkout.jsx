import React, { useState } from 'react';
import { createOrder } from '../api';

export default function Checkout({ items, onDone }){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const order = {
      customerName: name,
      phone,
      address,
      items: items.map(i=>({ product: i.product._id, qty: i.qty }))
    };
    try {
      const res = await createOrder(order);
      setResult(res);
      onDone();
    } catch (err) {
      setResult({ error: err.message });
    } finally { setLoading(false); }
  };

  return (
    <div className="checkout">
      <h3>Checkout</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required />
        <textarea placeholder="Delivery address" value={address} onChange={e=>setAddress(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Placing order...' : 'Place Order'}</button>
      </form>
      {result && (result._id ? <p>Order placed — id: {result._id}</p> : <p>Error: {result.error || JSON.stringify(result)}</p>)}
    </div>
  );
}
