import { FC } from "react";

import "./CartItem.css";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  amount: number;
  onRemove: () => void;
  onAdd: () => void;
}

const CartItem: FC<CartItemProps> = ({
  name,
  price,
  amount,
  onRemove,
  onAdd,
}) => {
  return (
    <li className="cart-item">
      <div>
        <h2>{name}</h2>
        <div className="cart-item__summary">
          <span className="cart-item__price">${price.toFixed(2)}</span>
          <span className="cart-item__amount">x {amount}</span>
        </div>
      </div>
      <div className="cart-item__actions">
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
