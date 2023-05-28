import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [itemsAmount, setItemsAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amount = cart.reduce((a, c) => {
      return a + c.amount;
    }, 0);
    setItemsAmount(amount);
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce((a, c) => {
      return a + c.price * c.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  const addToCart = (item) => {
    const itemID = item._id.toString();
    const existingCartItem = cart.find((cartItem) => {
      console.log(cartItem._id , itemID)
      return cartItem._id === itemID;
    });
    console.log("id:", item._id)
    console.log("existingCartItem:", existingCartItem)
    if (existingCartItem) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem._id === itemID) {
          cartItem.amount++;
          return cartItem;
        }
        return cartItem;
      });
      setCart(updatedCart);
    } else {
      console.log("asdasd")
      setCart([...cart, { ...item, amount: 1 }]);
    }
    setIsOpen(true);
  };

  const handleSelect = (e, id) => {
    const value = parseInt(e.target.value);
    const cartItem = cart.find((item) => {
      return item._id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item._id === id) {
          setAmount(value);
          return { ...item, amount: value };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item._id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        addToCart,
        cart,
        removeFromCart,
        itemsAmount,
        handleSelect,
        total,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
