import React from "react";

export interface CartItemData {
  amount: number;
  id: string;
  price: number;
  name: string;
}

const CartContext = React.createContext({
  items: [] as CartItemData[],
  totalAmount: 0,
  addItem: (item: CartItemData) => {},
  removeItem: (id: string) => {},
  clearCart: () => {},
});

export default CartContext;
