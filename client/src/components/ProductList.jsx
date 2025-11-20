import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, onAdd }){
  return (
    <section className="product-list">
      {products && products.length ? products.map(p => (
        <ProductCard key={p._id} product={p} onAdd={onAdd} />
      )) : <p>No products yet. Add some via the API.</p>}
    </section>
  );
}
