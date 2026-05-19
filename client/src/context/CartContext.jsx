import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // LOAD CART FROM LOCAL STORAGE

  const [cartItems, setCartItems] = useState(() => {

    const storedCart =
      localStorage.getItem("cart");

    return storedCart
      ? JSON.parse(storedCart)
      : [];

  });

  // SAVE TO LOCAL STORAGE

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  // ADD TO CART

  const addToCart = (item) => {

    const existingItem =
      cartItems.find(
        (cartItem) =>
          cartItem.id === item.id
      );

    if (existingItem) {

      setCartItems(

        cartItems.map((cartItem) =>

          cartItem.id === item.id

            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1,
              }

            : cartItem
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...item,
          quantity: 1,
        },
      ]);

    }

  };

  // REMOVE FROM CART

  const removeFromCart = (id) => {

    setCartItems(

      cartItems.filter(
        (item) => item.id !== id
      )

    );

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