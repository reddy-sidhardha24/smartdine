import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  // ADD ITEM
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // REMOVE ITEM
  const removeFromCart = (index) => {

    const updatedCart = [...cartItems];

    updatedCart.splice(index, 1);

    setCartItems(updatedCart);
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;