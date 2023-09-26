import { FC, useReducer } from "react";

import { cartReducer, defaultCartState } from "./cart-reducer";
import CartContext from "./cart-store";

const CartProvider: FC<{
  children: JSX.Element | JSX.Element[] | undefined | null;
}> = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: any) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id: number) => {
    const itemToRemove = cartState.items.find((item) => item.id === id);
    if (itemToRemove) {
      dispatchCartAction({ type: "REMOVE", item: itemToRemove });
    }
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
