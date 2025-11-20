import React from 'react';

export default function ProductCard({ product, onAdd }){
  return (
    <div className="card">
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="row">
        <strong>KES {product.price}</strong>
        <button onClick={()=>onAdd(product)}>Add</button>
      </div>
    </div>
  );
}
