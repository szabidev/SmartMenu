import React from "react";

export interface CartItemData {
  amount: number;
  id: number;
  price: number;
  title: string;
}

const CartContext = React.createContext({
  items: [] as CartItemData[],
  totalAmount: 0,
  addItem: (item: CartItemData) => {},
  removeItem: (id: number) => {},
});

export default CartContext;
