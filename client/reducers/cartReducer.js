const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, amount, event, logo, tagline } = action.payload;

    let cartProduct;

    cartProduct = {
      id: id,
      name: event.name,
      amount,
      logo,
      tagline,
    };

    return {
      ...state,
      cart: [...state.cart, cartProduct],
    };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};

export default cartReducer;
