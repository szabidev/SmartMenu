import { FC, FormEvent, useRef, useState } from "react";
import "./Checkout.css";

interface CheckoutProps {
  onConfirm: (data: any) => void;
  onCancel: () => void;
}

interface ValidForm {
  name: boolean;
  street: boolean;
  city: boolean;
  postalCode: boolean;
}

const isEmpty = (value: string) => value.trim() === "";
const isNotFiveChars = (value: string) => value.trim().length !== 5;

const Checkout: FC<CheckoutProps> = ({ onConfirm, onCancel }) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const streetInputRef = useRef<HTMLInputElement | null>(null);
  const postalCodeInputRef = useRef<HTMLInputElement | null>(null);
  const cityInputRef = useRef<HTMLInputElement | null>(null);
  const [formInputsValid, setFormInputsValid] = useState<ValidForm>({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredName = nameInputRef.current!.value;
    const enteredStreet = streetInputRef.current!.value;
    const enteredPostalCode = postalCodeInputRef.current!.value;
    const enteredCity = cityInputRef.current!.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);

    setFormInputsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form className="checkout-form" onSubmit={confirmHandler}>
      <div className={`control ${formInputsValid.name ? "" : "invalid"}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`control ${formInputsValid.street ? "" : "invalid"}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`control ${formInputsValid.postalCode ? "" : "invalid"}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValid.postalCode && (
          <p>Postal code must be 5 characters long!</p>
        )}
      </div>
      <div className={`control ${formInputsValid.city ? "" : "invalid"}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className="checkout-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
