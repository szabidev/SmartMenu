import { FC, ReactNode, useReducer } from "react";

import { cartReducer, defaultCartState } from "./cart-reducer";
import CartContext from "./cart-store";

const CartProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: any) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id: string) => {
    const itemToRemove = cartState.items.find((item) => item.id === id);
    if (itemToRemove) {
      dispatchCartAction({ type: "REMOVE", item: itemToRemove });
    }
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
