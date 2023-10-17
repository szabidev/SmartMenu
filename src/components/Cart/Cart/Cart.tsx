import { FC, useContext, useState } from "react";

import Modal from "../../UI/Modal/Modal";
import Card from "../../UI/Card/Card";
import CartItem from "../CartItem/CartItem";
import Checkout from "../../Checkout/Checkout";

import CartContext, { CartItemData } from "../../../store/cart-store";
import "./Cart.css";

interface UserData {
  name: string;
  street: string;
  postalCode: string;
  city: string;
}

const Cart: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);
  const cartCtx = useContext(CartContext);
  const totalAmountNumber = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: CartItemData) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
    return null;
  };

  const submitOrderHandler = async (userData: UserData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-7cab8-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartModalConent = (
    <>
      <Card>
        <ul className="cart-items">
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id + Math.random()}
              id={item.id}
              name={item.name}
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

        {isCheckout && (
          <Checkout onConfirm={submitOrderHandler} onCancel={onClose} />
        )}

        {!isCheckout && (
          <div className="actions">
            <button className="button--alt" onClick={onClose}>
              Close
            </button>
            {hasItems && (
              <button className="button" onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        )}
      </Card>
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Order successfully sent!</p>
      <div className="actions">
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <>
      <Modal onClose={onClose}>
        {!isSubmitting && !didSubmit && cartModalConent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
    </>
  );
};

export default Cart;
