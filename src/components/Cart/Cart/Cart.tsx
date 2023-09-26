import { FC, useContext } from "react";
import CartContext, { CartItemData } from "../../../store/cart-store";
import Modal from "../../UI/Modal/Modal";
import Card from "../../UI/Card/Card";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart: FC<{ onClose: () => void }> = ({ onClose }) => {
  const cartCtx = useContext(CartContext);
  const totalAmountNumber = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: number) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: CartItemData) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  return (
    <>
      <Modal onClose={onClose}>
        <Card>
          <ul className="cart-items">
            {cartCtx.items.map((item) => (
              <CartItem
                key={item.id + Math.random()}
                id={item.id}
                title={item.title}
                price={item.price}
                amount={item.amount}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
              />
            ))}
          </ul>
          <div className="total">
            <span>Total Amount</span>
            <span>${totalAmountNumber}</span>
          </div>
          <div className="actions">
            <button className="button--alt" onClick={onClose}>
              Close
            </button>
            {hasItems && <button className="button">Order</button>}
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default Cart;
