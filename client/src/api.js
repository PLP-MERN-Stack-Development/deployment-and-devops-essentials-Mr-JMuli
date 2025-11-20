const API = process.env.REACT_APP_API_URL || 'http://localhost:4000';
export async function fetchProducts() {
  const res = await fetch(`${API}/api/products`);
  return res.json();
}
export async function fetchProduct(id) {
  const res = await fetch(`${API}/api/products/${id}`);
  return res.json();
}
export async function createOrder(order) {
  const res = await fetch(`${API}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  return res.json();
}
