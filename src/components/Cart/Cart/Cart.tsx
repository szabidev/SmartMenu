import { FC } from "react";
import Modal from "../../UI/Modal/Modal";
import Card from "../../UI/Card/Card";
import CartItem from "../CartItem/CartItem";
import { IMealData } from "../../../App";
import "./Cart.css";

const Cart: FC<{ onClose: () => void; cartItems: IMealData[] }> = ({
  onClose,
  cartItems,
}) => {
  return (
    <>
      <Modal onClose={onClose}>
        <Card>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                name={item.title}
                price={item.price}
                amount={item.price}
                onRemove={() => console.log("removed")}
                onAdd={() => console.log("added")}
              />
            ))}
          </ul>
          <div className="total">
            <span>Total Amount</span>
            <span>10</span>
          </div>
          <div className="actions">
            <button className="button--alt" onClick={onClose}>
              Close
            </button>
            {<button className="button">Order</button>}
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default Cart;
