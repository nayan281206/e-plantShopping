import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon!');
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Plants</Link>
          <Link to="/cart" className="cart-icon">Cart</Link>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>

        {cartItems.length === 0 && <p>Your cart is empty.</p>}

        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Unit Price: ${item.price}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => handleDecrease(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item)}>+</button>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item)}>
              Delete
            </button>
          </div>
        ))}

        <div className="cart-actions">
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
          <Link to="/products">
            <button className="continue-btn">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
