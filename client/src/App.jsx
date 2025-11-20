import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => { (async ()=>{ setProducts(await fetchProducts()); })(); }, []);

  const add = (p) => {
    setCart(prev => {
      const ex = prev.find(x=>x.product._id===p._id);
      if (ex) return prev.map(x => x.product._id===p._id ? { ...x, qty: x.qty+1 } : x);
      return [...prev, { product: p, qty: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <div className="container">
      <header>
        <h1>SkyPharma (MVP)</h1>
      </header>
      <main>
        <ProductList products={products} onAdd={add} />
        <Cart items={cart} onClear={clearCart} />
      </main>
    </div>
  );
}
