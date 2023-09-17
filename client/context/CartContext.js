import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducers/cartReducer.js";
import { toast } from "react-toastify";
import { addItem, deleteFromCart, emptyCart } from "../action/cart.js";

const CartContext = createContext();

const getLocalCartData = () => {
  if (typeof window !== "undefined") {
    let CartData = localStorage.getItem("CartItem");

    if (CartData === null || CartData === undefined || CartData === []) {
      return [];
    } else {
      return JSON.parse(CartData);
    }
  }
};

const initialState = {
  //cart: [],
  cart: getLocalCartData(),
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = async (id, amount, event, logo, tagline) => {
    try {
      
      await addItem(id, amount, event, logo, tagline, dispatch);
      // dispatch({ type: "ADD_TO_CART", payload: { id, amount, event } });

      
    } catch (e) {}
  };

  const clearCart = async () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const removeItem = async (id) => {
    try {
      await deleteFromCart(id, dispatch);
      
    } catch (error) {}
    // dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  useEffect(() => {
    
    localStorage.setItem("CartItem", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
