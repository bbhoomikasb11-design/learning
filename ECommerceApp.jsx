import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const CartContext = createContext();

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 99 },
  { id: 2, name: "Mechanical Keyboard", price: 120 },
  { id: 3, name: "Gaming Mouse", price: 50 },
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook
const useCart = () => useContext(CartContext);

// Components
function ProductList() {
  const { addToCart } = useCart();
  return (
    <div>
      <h3>Products</h3>
      {PRODUCTS.map((p) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
          <span>{p.name} - ${p.price}</span>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ marginTop: "1.5rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
      <h3>Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})</h3>
      {cart.map((item) => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <span>{item.name} x {item.qty} (${item.price * item.qty})</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h4>Total: ${total}</h4>
    </div>
  );
}

export default function ECommerceApp() {
  return (
    <CartProvider>
      <div style={{ maxWidth: "450px", margin: "2rem auto", fontFamily: "sans-serif" }}>
        <h2>Mini Store</h2>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}