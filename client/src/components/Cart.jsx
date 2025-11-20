import React, { useState } from 'react';
import Checkout from './Checkout';

export default function Cart({ items, onClear }){
  const [showCheckout, setShowCheckout] = useState(false);
  const total = items.reduce((s,i)=>s + (i.product.price * i.qty), 0);

  return (
    <aside className="cart">
      <h2>Cart</h2>
      {items.length===0 ? <p>Cart is empty</p> : (
        <ul>
          {items.map(i => (
            <li key={i.product._id}>{i.product.name} x {i.qty}</li>
          ))}
        </ul>
      )}
      <p>Total: KES {total}</p>
      <div className="cart-actions">
        <button onClick={()=>setShowCheckout(true)} disabled={items.length===0}>Checkout</button>
        <button onClick={onClear}>Clear</button>
      </div>

      {showCheckout && <Checkout items={items} onDone={() => { setShowCheckout(false); onClear(); }} />}
    </aside>
  );
}
